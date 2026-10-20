# 🌌 VibeHub
> **Local-First Agent Observability · Collaborative Coding · Open Adapters**
> Cel MVP: Ty i znajomy programista pracujecie na osobnych komputerach, używacie różnych agentów AI (Google Antigravity, Claude Code, custom) i widzicie wspólny, zaktualizowany w czasie rzeczywistym obraz projektów bez ujawniania sekretów.

---

## ⚡ Kluczowe Komponenty

- **`apps/web`**: Dashboard Next.js 15+ z widokami Agent Monitor, Code Activity, Live Preview i Privacy Control Matrix.
- **`apps/bridge`**: Bezpieczny lokalny demon Node.js zbierający telemetrię z CLI, Git i systemów plików (brak zdalnego shella).
- **`packages/contracts`**: Współdzielone schematy Zod i typy TypeScript dla zapytań i odpowiedzi API.
- **`packages/event-protocol`**: Kanoniczny protokół zdarzeń agenta i zmian w kodzie.
- **`packages/adapter-sdk`**: Standardowy interfejs `AgentAdapter` dla twórców integracji z agentami AI.
- **`packages/ui`**: Wspólny system designu i tokeny wizualne (dark-tech aesthetic).
- **`firebase/`**: Reguły Firestore Security Rules oraz konfiguracja indeksów.

---

## 🚀 Szybki Start

1. Zainstaluj zależności:
   ```bash
   pnpm install
   ```
2. Skonfiguruj środowisko:
   ```bash
   cp .env.example .env.local
   ```
3. Uruchom aplikację webową:
   ```bash
   pnpm dev
   ```
4. Uruchom lokalny Bridge:
   ```bash
   pnpm dev:bridge
   ```

---

## 📚 Pełna Dokumentacja
- Architektura: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- Protokół Zdarzeń: [`docs/EVENT_PROTOCOL.md`](./docs/EVENT_PROTOCOL.md)
- Bezpieczeństwo i Prywatność: [`docs/SECURITY.md`](./docs/SECURITY.md)
- Standard Adapterów: [`docs/ADAPTERS.md`](./docs/ADAPTERS.md)
- Topografia Monorepo: [`docs/TOPOGRAPHY_TREE.md`](./docs/TOPOGRAPHY_TREE.md)
- Przewodnik Designera: [`docs/DESIGN_SYSTEM_GUIDE.md`](./docs/DESIGN_SYSTEM_GUIDE.md)
