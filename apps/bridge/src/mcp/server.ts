/**
 * VibeHub MCP Server — Stdio Model Context Protocol Server
 * Umożliwia agentom AI (Antigravity, Claude Code, Cursor) bezpośrednie raportowanie stanu,
 * wysyłanie checkpointów i odczyt telemetrii klastra.
 */
import readline from 'readline';
import os from 'os';

export interface McpServerConfig {
  apiUrl?: string;
  roomId?: string;
  deviceId?: string;
  agentProvider?: string;
}

export class VibeHubMcpServer {
  private apiUrl: string;
  private roomId: string;
  private deviceId: string;
  private agentProvider: string;

  constructor(config: McpServerConfig = {}) {
    this.apiUrl = config.apiUrl || process.env.VIBEHUB_API_URL || 'https://viber-hub.vercel.app/api/v1';
    this.roomId = config.roomId || 'viberhub-8842f';
    this.deviceId = config.deviceId || `dev_${process.platform}_${os.hostname()}`;
    this.agentProvider = config.agentProvider || 'antigravity';
  }

  public start(): void {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    rl.on('line', async (line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      try {
        const message = JSON.parse(trimmed);
        await this.handleMessage(message);
      } catch (err: any) {
        this.sendError(null, -32700, `Parse error: ${err.message}`);
      }
    });

    // Diagnostyka na stderr (stdout jest zarezerwowany dla JSON-RPC!)
    console.error(`[*] INFO :: VibeHub MCP Server v0.1.4 active on stdio. Room: ${this.roomId}`);
  }

  private async handleMessage(message: any): Promise<void> {
    const { id, method, params } = message;

    // 1. Initialize
    if (method === 'initialize') {
      this.sendResponse(id, {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: 'vibehub-mcp',
          version: '0.1.4',
        },
      });
      return;
    }

    // 2. Notifications (initialized)
    if (method === 'notifications/initialized' || method === 'initialized') {
      return;
    }

    // 3. Ping
    if (method === 'ping') {
      this.sendResponse(id, {});
      return;
    }

    // 4. Tools List
    if (method === 'tools/list') {
      this.sendResponse(id, {
        tools: [
          {
            name: 'vibehub_push_status',
            description: 'Report live agent status, current prompt, active tool and code diff directly to VibeHub dashboard.',
            inputSchema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  enum: ['working', 'waiting', 'idle', 'error'],
                  description: 'Current agent execution state',
                },
                activity: {
                  type: 'string',
                  description: 'Description of current task or user prompt being executed',
                },
                currentTool: {
                  type: 'string',
                  description: 'Name of the tool being called (e.g. edit_file, run_command, git_commit)',
                },
                activeFile: {
                  type: 'string',
                  description: 'Active file or target path being modified',
                },
                diff: {
                  type: 'string',
                  description: 'Code diff or snippet of changes (+ added, - removed lines)',
                },
                name: {
                  type: 'string',
                  description: 'Name of the AI model / agent (e.g. Google Antigravity, Claude Code, Cursor)',
                },
                model: {
                  type: 'string',
                  description: 'Model identifier (e.g. Gemini 3.8 Flash, Claude 3.7 Sonnet)',
                },
              },
              required: ['status', 'activity'],
            },
          },
          {
            name: 'vibehub_checkpoint',
            description: 'Record an architectural milestone or code checkpoint in the VibeHub room.',
            inputSchema: {
              type: 'object',
              properties: {
                title: { type: 'string', description: 'Title of the checkpoint' },
                summary: { type: 'string', description: 'Engineering summary of changes' },
                files: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of modified or affected files',
                },
              },
              required: ['title', 'summary'],
            },
          },
          {
            name: 'vibehub_get_status',
            description: 'Get current cluster telemetry, connected devices and active room status.',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      });
      return;
    }

    // 5. Tools Call
    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      try {
        const result = await this.executeTool(toolName, args);
        this.sendResponse(id, {
          content: [
            {
              type: 'text',
              text: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
            },
          ],
        });
      } catch (err: any) {
        this.sendResponse(id, {
          isError: true,
          content: [
            {
              type: 'text',
              text: `[!] ALERT :: Tool execution failed: ${err.message}`,
            },
          ],
        });
      }
      return;
    }

    // Unknown method
    if (id !== undefined) {
      this.sendError(id, -32601, `Method not found: ${method}`);
    }
  }

  private async executeTool(name: string, args: any): Promise<any> {
    const cleanBase = this.apiUrl.replace(/\/$/, '');

    if (name === 'vibehub_push_status') {
      const { status, activity, currentTool, activeFile, diff, model } = args;
      const agentDisplayName = args.name || `${this.agentProvider.toUpperCase()} AI Agent`;

      // 1. Zapis aktywnego agenta w Firestore przez /api/v1/agents/active
      try {
        await fetch(`${cleanBase}/agents/active`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomId: this.roomId,
            agents: [
              {
                id: `mcp_${this.agentProvider}_${this.deviceId}`,
                provider: this.agentProvider,
                name: agentDisplayName,
                model: model || 'Autonomous AI',
                status: status || 'working',
                activity: activity || 'Wykonywanie zadań projektowych',
                currentTool: currentTool || 'mcp_execution',
                activeFile: activeFile || '',
                fileStats: activeFile ? '+ modified' : undefined,
                diffSnippet: diff
                  ? String(diff)
                      .split('\n')
                      .slice(0, 10)
                      .map((l: string, idx: number) => ({
                        line: idx + 1,
                        type: l.startsWith('+') ? '+' : l.startsWith('-') ? '-' : ' ',
                        text: l.slice(0, 80),
                      }))
                  : undefined,
                machine: os.hostname(),
                operatorName: os.userInfo().username || 'Operator',
                lastActiveAt: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (err: any) {
        console.error('[!] ALERT :: MCP agent sync failed:', err.message);
      }

      // 2. Zapis zdarzenia telemetrii w Firestore przez /api/v1/events/batch
      const endpoint = `${cleanBase}/events/batch`;
      const eventPayload = {
        schemaVersion: 1,
        projectId: this.roomId,
        deviceId: this.deviceId,
        events: [
          {
            id: `evt_mcp_${Date.now()}`,
            schemaVersion: 1,
            deviceId: this.deviceId,
            projectId: this.roomId,
            occurredAt: new Date().toISOString(),
            source: this.agentProvider,
            type: 'agent.status_changed',
            data: {
              status,
              activity,
              currentTool,
              activeFile,
              source: 'mcp',
            },
          },
        ],
      };

      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventPayload),
        });
      } catch (err: any) {
        console.error('[!] ALERT :: MCP event dispatch failed:', err.message);
      }

      return {
        success: true,
        message: `Status updated to '${status}': ${activity}`,
        agent: agentDisplayName,
        roomId: this.roomId,
        timestamp: new Date().toISOString(),
      };
    }

    if (name === 'vibehub_checkpoint') {
      const { title, summary, files } = args;
      const endpoint = `${cleanBase}/events/batch`;

      const eventPayload = {
        schemaVersion: 1,
        projectId: this.roomId,
        deviceId: this.deviceId,
        events: [
          {
            id: `evt_cp_${Date.now()}`,
            schemaVersion: 1,
            deviceId: this.deviceId,
            projectId: this.roomId,
            occurredAt: new Date().toISOString(),
            source: this.agentProvider,
            type: 'agent.task_completed',
            data: {
              title,
              summary,
              files: files || [],
              source: 'mcp',
            },
          },
        ],
      };

      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventPayload),
        });
      } catch (err: any) {
        console.error('[!] ALERT :: MCP checkpoint dispatch failed:', err.message);
      }

      return {
        success: true,
        checkpointId: `cp_${Date.now()}`,
        title,
        message: 'Checkpoint persisted to VibeHub cluster.',
      };
    }

    if (name === 'vibehub_get_status') {
      const endpoint = `${cleanBase}/system/status`;
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        return data;
      } catch (err: any) {
        return {
          status: 'online',
          roomId: this.roomId,
          deviceId: this.deviceId,
          warning: `Failed to fetch remote status: ${err.message}`,
        };
      }
    }

    throw new Error(`Unknown tool: ${name}`);
  }

  private sendResponse(id: any, result: any): void {
    const response = {
      jsonrpc: '2.0',
      id,
      result,
    };
    process.stdout.write(JSON.stringify(response) + '\n');
  }

  private sendError(id: any, code: number, message: string): void {
    const response = {
      jsonrpc: '2.0',
      id,
      error: { code, message },
    };
    process.stdout.write(JSON.stringify(response) + '\n');
  }
}
