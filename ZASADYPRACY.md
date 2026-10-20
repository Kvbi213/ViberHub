# ⚙️ PROTOKÓŁ ANTIGRAVITY // ZASADY PRACY VIBEHUB
> Dokument nadrzędny sesji deweloperskich i operacyjnych projektu VibeHub.
> Status: AKTYWNY | Wersja: v0.1.0 | Data: 2026-10-20 | Środowisko: Local-First Observability & Multi-Agent Bridge

---

## 1. REGULACJE OPERACYJNE (PRIORYTET ZERO)
1. **TRWAŁOŚĆ KODU I DOKUMENTACJI:** Zakaz usuwania kodu produkcyjnego, konfiguracji, schematów ani dokumentacji bez procedury "Chirurgiczna Redukcja". Zmiany są przyrostowe i weryfikowalne.
2. **BEZWZGLĘDNA SPÓJNOŚĆ OBSIDIAN SYNC (Reguła 26):** Każdy dokument techniczny, architektoniczny, diagram topografii i rejestr zmian MUSI być symetrycznie utrzymywany w `C:\Users\Jakub Lis\Documents\OBSIDIAN\PROJEKTY\VibeHub\` oraz zlinkowany w `INDEX_PROJEKTY.md`.
3. **DEBUG-FIRST & ZERO GUESSWORK:** Wszelkie błędy są izolowane na poziomie logów/testów (`ERROR_DIFF`). Zakaz zgadywania stanu agentów – system raportuje wyłącznie dane potwierdzone przez adaptery i Bridge. Brak danych = stan `unknown`/`unavailable`, nigdy fantomowy.
4. **GHOST OPERATOR & SECURE-BY-DESIGN:** 
   - Anonimizacja: `$USER`, `$PROJECT_ROOT`, `$API_KEY`, `$DEVICE_TOKEN`.
   - Ścisła redakcja: pliki `.env`, tokeny autoryzacyjne, klucze prywatne, hasła i wrażliwe ścieżki są domyślnie filtrowane w Bridge przed transmisją do backendu.
5. **MINIMALIZM TOKENOWY & CLEAN CODE:** Kod TypeScript/Node/React zgodny ze standardami SRP, funkcje modularne, jawne typowanie (TypeScript Strict, Zod schemas), brak zmiennych jednoliterowych.
6. **MELDUNEK STARTOWY:** Każda sesja Antigravity rozpoczyna się od meldunku:
   `[*] INFO :: Protokół Antigravity załadowany. Sesja aktywna.`

---

## 2. GRANICE SYSTEMU I ZASADY INTEGRACJI
- **Podział ról:**
  - **Operator / Designer:** Przygotowuje architekturę wizualną, system designu, komponenty UI, layouty stron i makiety w `apps/web`.
  - **Architekt / Deweloper Bridge:** Implementuje kontrakty (`packages/contracts`), protokół zdarzeń (`packages/event-protocol`), SDK adapterów (`packages/adapter-sdk`), lokalny demon `apps/bridge` oraz reguły bezpieczeństwa Firebase.
- **Granica bezpieczeństwa:** Web nie ma bezpośredniego dostępu do systemu plików ani terminala zdalnego hosta. Lokalny Bridge przesyła wyłącznie dozwolone zdarzenia do autoryzowanych kolekcji Firestore przez reguły Security Rules.
- **Weryfikacja zmian:** Przed jakimkolwiek mergem lub wdrożeniem: linter, testy jednostkowe (`vitest`), sprawdzenie integralności schematów Zod.
