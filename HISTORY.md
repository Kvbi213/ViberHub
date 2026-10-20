# 📜 VIBEHUB // REJESTR ZMIAN (HISTORY.md)
> Dziennik modyfikacji i wydań systemu VibeHub.
> Format: SemVer `MAJOR.MINOR.PATCH`. Zasada: append-only, brak edycji wstecznej.

---

## v 0.1.0 — 2026-10-20
- `[+]` Zainicjalizowano repozytorium monorepo pnpm workspaces dla projektu VibeHub.
- `[+]` Wprowadzono nadrzędne regulacje operacyjne `ZASADYPRACY.md` zgodnie z Protokołem Antigravity v3.2.
- `[+]` Zdefiniowano architekturę systemu i granice komponentów w `ARCHITECTURE.md`.
- `[+]` Opracowano kanoniczny protokół zdarzeń w `docs/EVENT_PROTOCOL.md` (poziomy L1-L4, schematy Zod).
- `[+]` Zdefiniowano model bezpieczeństwa, redakcji i poświadczeń w `docs/SECURITY.md`.
- `[+]` Sformułowano standard integracji adapterów agentów AI w `docs/ADAPTERS.md`.
- `[+]` Opracowano szczegółowy przewodnik projektowy i drzewo topografii UI w `docs/TOPOGRAPHY_TREE.md` oraz `docs/DESIGN_SYSTEM_GUIDE.md`.
- `[*]` Przygotowano szkielet monorepo (`apps/web`, `apps/bridge`, `packages/contracts`, `packages/event-protocol`, `packages/adapter-sdk`, `packages/ui`, `firebase/`).
- `[*]` Zsynchronizowano pełną dokumentację techniczną z Obsidian Vault w `C:\Users\Jakub Lis\Documents\OBSIDIAN\PROJEKTY\VibeHub\` oraz zarejestrowano w `INDEX_PROJEKTY.md`.

---

## v 0.1.1 — 2026-10-20
- `[+]` Zaimplementowano kompletny system designu **Milky Glass Observability & Apple Fluid Motion** w oparciu o specyfikację z `plikizzewnatrz`.
- `[+]` Wdrożono widok główny **Live Agent Pair Observability** (`/dashboard` i `/`) z podziałem na Dev 1 (Antigravity Agent) oraz Dev 2 (Claude Code Agent), barometrem metryk i strumieniem zdarzeń.
- `[+]` Wdrożono widok **Room Collab & Live Preview** (`/rooms/[roomId]`) z responsywnym podglądem aplikacji (Desktop 1440px / Tablet 768px / Mobile 375px), paskiem tunelu mTLS oraz panelem diffów Git i logów konsoli.
- `[+]` Wdrożono moduł **Zarządzania Stacjami i Parowania Bridge** (`/settings`) z jednorazowymi kodami (`VH-9428-XK`), odwoływalnymi tokenami i statusem liveness.
- `[+]` Wdrożono interaktywną **Matrycę Prywatności L1–L4** (`/privacy`) z audytem czarnej listy sekretów (Zero Trust).
- `[+]` Skonfigurowano integrację Firebase (Firestore, Auth, Storage) z bezpiecznym buforem offline i reaktywnym storem Zustand.
- `[+]` Wdrożono serwerowe endpointy API w Next.js: `/api/v1/bridge/pair`, `/api/v1/bridge/heartbeat`, `/api/v1/events/batch`.
- `[+]` Zbudowano i pomyślnie zweryfikowano produkcyjny bundle Next.js 15 (`next build` — 10/10 stron wygenerowanych bez błędów).
- `[*]` Zsynchronizowano dokumentację projektową w Obsidian (`06_Master_GUI_Design_Document.md`, zrzuty ekranu `screen_live_pair.png` i `screen_room_collab.png`).
## v 0.1.2 — 2026-10-20
- `[+]` Utworzono i powiązano autentyczny projekt Firebase `vibehub-mesh` (ID: 951110449404) przez CLI Firebase oraz zarejestrowano aplikację webową `vibehub-web`.
- `[+]` Skonfigurowano i wdrożono bazę Cloud Firestore Native w regionie `europe-central2` (Warszawa) oraz zaktualizowano i wdrożono reguły `firestore.rules`.
- `[+]` Całkowicie wyeliminowano placeholdery: wdrożono endpoint `/api/v1/system/status` pobierający twarde dane z Git (`git rev-parse`, `git log`, `git status`) oraz pamięci operacyjnej stacji.
- `[+]` Zaimplementowano modułowy demon Bridge w `apps/bridge/src/`: silnik redakcji `RedactionEngine`, `GitCollector`, `FileWatcherCollector` (`chokidar`), `AntigravityAdapter`, `ClaudeCodeAdapter` oraz `HttpTransport`.
- `[+]` Wprowadzono i zaliczono zestaw testów jednostkowych w `vitest` dla silnika redakcji sekretów i ścieżek (3/3 passed).
- `[+]` Wdrożono reaktywny nasłuch `onSnapshot` w Zustand store oraz akcję `simulateNextStep` emitującą rzeczywiste zdarzenia do bazy Firestore.
- `[+]` Pomyślnie zoptymalizowano i zweryfikowano produkcyjny build Next.js (`next build` 10/10 tras) oraz uruchomiono procesy w tle na porcie 3000.
- `[*]` Zsynchronizowano stan projektu z repozytorium Obsidian Vault w `C:\Users\Jakub Lis\Documents\OBSIDIAN\PROJEKTY\VibeHub\`.
