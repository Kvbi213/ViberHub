# 🔌 VIBEHUB // SPECYFIKACJA ADAPTERÓW AGENTÓW AI (ADAPTERS.md)
> Standard implementacji adapterów obserwowalności środowisk AI.
> Wersja interfejsu: 1.0.0 | Język: TypeScript

---

## 1. WSPÓLNY KONTRAKT INTEGRACYJNY (`AgentAdapter`)

Każdy adapter agenta w katalogu `packages/adapter-sdk` oraz `apps/bridge/src/adapters/` implementuje jednolity interfejs. Zapewnia to hermetyzację logiki specyficznej dla danego narzędzia.

```typescript
export interface AdapterCapabilities {
  supportedLevels: ('L1' | 'L2' | 'L3' | 'L4')[];
  canDetectTools: boolean;
  canInspectTasks: boolean;
  canCaptureLiveOutput: boolean;
  requiresLocalDaemon: boolean;
  supportedEventTypes: string[];
}

export interface AdapterContext {
  projectId: string;
  projectRoot: string;
  deviceId: string;
  config: Record<string, unknown>;
}

export interface AdapterSession {
  sessionId: string;
  startedAt: string;
  stop: () => Promise<void>;
}

export interface AgentAdapter {
  readonly id: string;           // Unikalny identyfikator, np. 'antigravity', 'claude-code'
  readonly name: string;         // Czytelna nazwa, np. 'Google Antigravity CLI'
  readonly version: string;      // Wersja adaptera
  
  detect(): Promise<boolean>;
  getCapabilities(): Promise<AdapterCapabilities>;
  start(
    context: AdapterContext,
    emit: (event: CanonicalEvent) => Promise<void>
  ): Promise<AdapterSession>;
  stop(): Promise<void>;
}
```

---

## 2. ADAPTER A: GOOGLE ANTIGRAVITY (STATUSLINE BRIDGE)

### 2.1. Mechanizm Odczytu
Google Antigravity CLI udostępnia polecenie `statusline`, które przy każdej zmianie stanu agenta uruchamia skonfigurowany skrypt/polecenie binarne, przekazując na wejście standardowe (`stdin`) sformatowany obiekt JSON.

### 2.2. Przykładowy Payload Statusline ze Strumienia Antigravity:
```json
{
  "conversation_id": "29414764-c710-49e0-b40f-f0e0bf37ebf0",
  "workspace": "C:\\Users\\Jakub Lis\\Desktop\\01_PROJEKTY\\ViberHub",
  "model": "Gemini 3.8 Flash (High)",
  "agent_state": "PLANNING",
  "last_tool": "write_to_file",
  "transcript_path": "C:\\Users\\Jakub Lis\\.gemini\\antigravity\\brain\\...\\transcript.jsonl"
}
```

### 2.3. Odwzorowanie na Kanoniczne Zdarzenia VibeHub:
| Pole Antigravity | Mapowanie VibeHub | Zdarzenie Kanoniczne |
| :--- | :--- | :--- |
| `agent_state: PLANNING` | `status: "working"`, `activity: "Planowanie rozwiązania"` | `agent.status_changed` |
| `agent_state: EXECUTING` | `status: "working"`, `activity: "Wykonywanie narzędzia: {last_tool}"` | `agent.status_changed` |
| `agent_state: WAITING_INPUT` | `status: "waiting"`, `activity: "Oczekiwanie na decyzję programisty"` | `agent.status_changed` |
| `agent_state: IDLE` | `status: "idle"` | `agent.status_changed` |
| `last_tool: "..."` | `toolName: "{last_tool}"` | `tool.started` |

> [!IMPORTANT]
> Zgodnie z zasadą prywatności: ścieżka `transcript_path` **NIE JEST** automatycznie transmitowana ani odczytywana w chmurze. Wyjścia narzędzi są anonimizowane na poziomie lokalnego Bridge.

---

## 3. ADAPTER B: CLAUDE CODE (HOOKS & IPC INTEGRATION)

### 3.1. Mechanizm Odczytu
Claude Code udostępnia system haków (`hooks`), które mogą wywoływać skrypty powłoki w odpowiedzi na zdarzenia cyklu życia agenta (rozpoczęcie sesji, wykonanie narzędzia, błąd, zakończenie sesji).

### 3.2. Konfiguracja Hooka w Claude Code:
W konfiguracji Claude Code instalowany jest skrypt pośredniczący:
```json
{
  "hooks": {
    "onToolCall": "node ~/.vibehub/hooks/claude-hook.js --event=tool_call",
    "onStateChange": "node ~/.vibehub/hooks/claude-hook.js --event=state_change"
  }
}
```
Skrypt `claude-hook.js` przekazuje zdarzenie przez lokalny socket IPC (Domain Socket na Unix / Named Pipe na Windows) do działającego procesu `apps/bridge`.

### 3.3. Odwzorowanie na Kanoniczne Zdarzenia VibeHub:
- `tool_call` -> `tool.started` / `tool.completed`
- `session_start` -> `agent.status_changed` (`status: "working"`)
- `session_end` -> `agent.status_changed` (`status: "idle"`)

---

## 4. PROCEDURA ROZSZERZANIA O NOWEGO AGENTA (CUSTOM ADAPTER)

Aby dodać wsparcie dla nowego narzędzia (np. Cursor, Aider, Windsurf):
1. Utwórz plik `packages/adapter-sdk/src/adapters/<nazwa-agenta>.ts`.
2. Zaimplementuj interfejs `AgentAdapter`.
3. Zadeklaruj obsługiwane poziomy `AdapterCapabilities`.
4. Zaimplementuj mapowanie surowego sygnału na typy `CanonicalEvent`.
5. Zarejestruj adapter w fabryce `AdapterRegistry` wewnątrz `apps/bridge/src/adapters/index.ts`.
