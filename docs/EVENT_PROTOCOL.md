# 📡 VIBEHUB // KANONICZNY PROTOKÓŁ ZDARZEŃ (EVENT_PROTOCOL.md)
> Standard komunikacyjny telemetrii agentów i aktywności projektowej.
> Wersja schematu: 1.0.0 | Status: KANONICZNY | Format: JSON / Zod

---

## 1. KOPERTA ZDARZENIA (EVENT ENVELOPE)

Każde zdarzenie emitowane przez lokalny `Bridge` lub adaptery musi spełniać format kanonicznej koperty. Wszystkie identyfikatory są unikalne, a czasy sformatowane w standardzie ISO 8601 (UTC).

```typescript
export interface CanonicalEvent<T = Record<string, unknown>> {
  id: string;              // UUID v4 lub prefiksowane nanoid np. 'evt_01H...'
  schemaVersion: number;   // Wersja schematu (dla MVP: 1)
  deviceId: string;        // Unikalny identyfikator zarejestrowanego urządzenia
  projectId: string;       // Identyfikator projektu w pokoju
  occurredAt: string;      // Znacznik czasu ISO 8601 wygenerowania zdarzenia na hoście
  receivedAt?: string;     // Znacznik czasu odebrania przez serwer API
  source: 'antigravity' | 'claude-code' | 'system' | 'git' | 'custom';
  type: EventType;         // Typ zdarzenia ze słownika kanonicznego
  data: T;                 // Zwalidowany payload zdarzenia
}
```

---

## 2. KATALOG KANONICZNYCH TYPÓW ZDARZEŃ

### 2.1. Zdarzenia Stanu Agenta (`agent.*`)

#### `agent.status_changed`
Emitowane przy zmianie stanu operacyjnego agenta AI (np. z bezczynności na wykonywanie polecenia).
- **Poziom obserwowalności:** L2
- **Payload (`data`):**
```typescript
{
  status: 'working' | 'waiting' | 'idle' | 'error' | 'unknown';
  activity?: string;         // Zwięzły opis aktywności, np. "Kompilacja modułu auth"
  provider: 'antigravity' | 'claude-code' | 'custom';
  sessionId?: string;        // Identyfikator sesji roboczej agenta
  confidence: number;        // Poziom pewności odczytu (0.0 - 1.0, 1.0 = oficjalne API)
  expiresInMs: number;       // Czas ważności stanu (np. 30000 ms -> potem przechodzi w 'stale')
}
```

#### `agent.task_started`
Emitowane w momencie zainicjowania konkretnego podzadania przez agenta.
- **Payload (`data`):**
```typescript
{
  taskId: string;
  description: string;       // Zredagowany nagłówek zadania (bez promptu i tokenów)
  toolsPlanned?: string[];   // Lista przewidywanych narzędzi
}
```

#### `agent.task_completed`
Emitowane po ukończeniu zadania.
- **Payload (`data`):**
```typescript
{
  taskId: string;
  durationMs: number;
  success: boolean;
  errorSummary?: string;     // Generyczny opis błędu w razie niepowodzenia
}
```

---

### 2.2. Zdarzenia Użycia Narzędzi (`tool.*`)

#### `tool.started`
Emitowane w momencie wywołania narzędzia przez model.
- **Poziom obserwowalności:** L2 / L3
- **Payload (`data`):**
```typescript
{
  toolName: string;          // np. 'run_command', 'replace_file_content', 'web_search'
  callSummary?: string;      // Bezpieczny zarys, np. "Uruchomiono: vitest run"
}
```

#### `tool.completed`
Emitowane po zakończeniu działania narzędzia.
- **Payload (`data`):**
```typescript
{
  toolName: string;
  durationMs: number;
  success: boolean;
  exitCode?: number;
}
```

---

### 2.3. Zdarzenia Kodu i Systemu Plików (`file.*` & `git.*`)

#### `file.changed`
Emitowane przez lokalny file-watcher (np. Chokidar) dla monitorowanego repozytorium.
- **Poziom obserwowalności:** L1
- **Payload (`data`):**
```typescript
{
  filePath: string;          // Ścieżka względna do BASE_DIR, np. "apps/web/app/page.tsx"
  changeType: 'created' | 'modified' | 'deleted';
  extension: string;         // np. ".tsx"
  linesAdded?: number;
  linesDeleted?: number;
}
```

#### `git.commit_created`
Emitowane po wykryciu nowego commita w gałęzi.
- **Poziom obserwowalności:** L1
- **Payload (`data`):**
```typescript
{
  commitHash: string;        // Skrót sha-1 (np. 'a1b2c3d')
  branch: string;            // np. 'main' lub 'feature/bridge'
  authorName: string;        // Nazwa autora z konfiguracji git
  message: string;           // Wiadomość commita (zredagowana)
  filesCount: number;
}
```

---

### 2.4. Zdarzenia Podglądu (`preview.*`)

#### `preview.status_changed`
Rejestruje dostępność podglądu aplikacji deweloperskiej.
- **Poziom obserwowalności:** L4
- **Payload (`data`):**
```typescript
{
  isOnline: boolean;
  previewType: 'tunnel' | 'public_url' | 'screenshot';
  url?: string;              // Bezpieczny URL tunelu (np. ngrok, cloudflare) lub hostingu
  port?: number;             // Port lokalny, np. 3000
  screenshotUrl?: string;    // Adres migawki w Firebase Storage (jeśli aktywne)
}
```

---

### 2.5. Zdarzenia Urządzenia (`bridge.*`)

#### `bridge.heartbeat`
Służy do weryfikacji dostępności stacji roboczej (liveness check).
- **Payload (`data`):**
```typescript
{
  bridgeVersion: string;
  uptimeSeconds: number;
  activeProjectsCount: number;
  activeAdapters: string[];
}
```

---

## 3. KONTRAKT PAKIETU TRANSMISYJNEGO (BATCH INGESTION)

Bridge agreguje zdarzenia w interwałach buforowania (domyślnie co 2000 ms) i wysyła je pakietowo:

```http
POST /api/v1/events/batch
Authorization: Bearer <DEVICE_SESSION_TOKEN>
Content-Type: application/json

{
  "schemaVersion": 1,
  "deviceId": "dev_win_desktop_01",
  "projectId": "proj_vibehub_core",
  "events": [
    {
      "id": "evt_987a65c4",
      "schemaVersion": 1,
      "deviceId": "dev_win_desktop_01",
      "projectId": "proj_vibehub_core",
      "occurredAt": "2026-10-20T12:30:00.120Z",
      "source": "antigravity",
      "type": "agent.status_changed",
      "data": {
        "status": "working",
        "activity": "Modyfikacja widoku pokoju w Next.js",
        "provider": "antigravity",
        "confidence": 1.0,
        "expiresInMs": 30000
      }
    }
  ]
}
```

### Odpowiedź API:
```json
{
  "success": true,
  "acceptedCount": 1,
  "rejectedCount": 0,
  "errors": []
}
```
Identyfikatory zdarzeń są idempotentne – powtórzenie pakietu nie tworzy duplikatów w bazie Firestore.
