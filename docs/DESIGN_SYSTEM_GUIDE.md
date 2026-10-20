# 🎨 VIBEHUB // SYSTEM DESIGNU I WYTYCZNE WIZUALNE (DESIGN_SYSTEM_GUIDE.md)
> Wytyczne estetyki, tokenów kolorystycznych, stanów interaktywnych oraz zasad kompozycji UI.
> Styl: Dark-Tech / Monospace Accents / High-Information Density / Precision Observability

---

## 1. PALETA BARW (COLOR SYSTEM TOKENS)

System barw oparty na ciemnym tle (`slate-950` / `zinc-950`) z nasyconymi akcentami funkcyjnymi o wysokim kontraście (WCAG AAA/AA).

### 1.1. Tła i Powłoki (Backgrounds & Surfaces)
- **Tło Główne (Canvas):** `#090d16` (Głęboki granat/czerń)
- **Powłoka Kart (Card Surface):** `#0f172a` z przezroczystością `rgba(15, 23, 42, 0.75)`
- **Obramowania (Borders):** `rgba(255, 255, 255, 0.08)` lub `rgba(56, 189, 248, 0.2)` dla elementów aktywnych
- **Podświetlenia (Glow / Highlight):** `rgba(0, 240, 255, 0.15)` dla hovera kart i aktywnych obramowań

### 1.2. Kolory Semantyczne i Akcenty (Semantic Status Colors)
| Rola | Kolor Hex | Klasa Tailwind | Zastosowanie |
| :--- | :--- | :--- | :--- |
| **Primary Accent (Cyan)** | `#00f0ff` | `text-cyan-400`, `bg-cyan-500` | Główne przyciski, logo, aktywne statusy agenta (`working`) |
| **Secondary Accent (Indigo)** | `#6366f1` | `text-indigo-400`, `bg-indigo-500` | Narzędzia deweloperskie, odnośniki, tagi wersji |
| **Success / Online (Emerald)** | `#10b981` | `text-emerald-400`, `bg-emerald-500` | Bridge Online, zakończone zadania, czyste repozytorium |
| **Warning / Waiting (Amber)** | `#f59e0b` | `text-amber-400`, `bg-amber-500` | Agent oczekuje na decyzję (`waiting`), branch out-of-sync |
| **Danger / Error (Rose)** | `#f43f5e` | `text-rose-400`, `bg-rose-500` | Błąd agenta, rozłączone urządzenie, cofnięcie uprawnień |
| **Neutral / Muted (Slate)** | `#94a3b8` | `text-slate-400`, `border-slate-800` | Etykiety pomocnicze, stan bezczynności (`idle`) |

---

## 2. TYPOGRAFIA (TYPOGRAPHY TOKENS)

1. **Font Podstawowy (Interfejs):**
   - Rodzina: `Inter`, `system-ui`, `-apple-system`, `sans-serif`.
   - Czytelny w małych rozmiarach (`0.75rem` / `0.875rem`), zoptymalizowany pod kątem gęstych tabel i dashboardów.
2. **Font Danych i Kodów (Monospace HUD):**
   - Rodzina: `JetBrains Mono`, `Fira Code`, `ui-monospace`, `monospace`.
   - Zastosowanie: skróty commitów Git, identyfikatory zdarzeń, znaczniki czasu ISO, ścieżki plików, statusy narzędzi.
3. **Hierarchia Nagłówków:**
   - `H1 (Page Title)`: `text-2xl font-black tracking-tight text-white`
   - `H2 (Section Header)`: `text-lg font-bold tracking-tight text-slate-100 flex items-center gap-2`
   - `H3 (Card Title)`: `text-sm font-semibold text-slate-200 uppercase tracking-wider`
   - `Body`: `text-sm text-slate-300 leading-relaxed`
   - `Muted / Caption`: `text-xs text-slate-500 font-mono`

---

## 3. STANY INTERAKTYWNE KOMPONENTÓW (COMPONENT STATES)

Zgodnie z zasadą `PROTOKOŁU ANTIGRAVITY (Reguła 21: ADAPTIVE-CLEAN UI)` każdy komponent posiada jawnie zdefiniowane stany:

1. **Przyciski (`Button`):**
   - **Default:** Ciemne tło z akcentowym obramowaniem lub pełny gradient cyan.
   - **Hover:** Płynne podświetlenie `box-shadow: 0 0 15px rgba(0, 240, 255, 0.3)`, lekkie rozjaśnienie tła.
   - **Active:** Zmniejszenie skali `transform: scale(0.98)`.
   - **Disabled:** Półprzezroczystość `opacity-40`, kursor `cursor-not-allowed`, wyłączone zdarzenia kliknięcia.
2. **Karty Agenta (`AgentCard`):**
   - **State: Working:** Subtelny pulsujący ring w kolorze cyan (`animate-pulse`), wskaźnik aktywności "Wykonuje: replace_file_content".
   - **State: Waiting:** Żółta pulsacja z wyraźnym powiadomieniem "Oczekuje na zatwierdzenie operatora".
   - **State: Idle:** Spokojna, stonowana szara ramka bez pulsacji.
   - **State: Error:** Czerwona ramka z kodem błędu i przyciskiem "Zbadaj błąd".
3. **Przełączniki Prywatności (`LevelToggleSwitch`):**
   - Kliknięcie natychmiast zmienia stan w UI z optymistyczną aktualizacją i wskaźnikiem synchronizacji z Firestore.

---

## 4. LAYOUT I SIATKA POKOJU WSPÓŁPRACY (ROOM GRID SYSTEM)

Układ pulpitu pokoju dwuosobowego zoptymalizowany pod ekrany `1920x1080` oraz `1440x900` z responsywnym zwijaniem na ekranach mniejszych:

```text
+-----------------------------------------------------------------------------------------------+
| TOPNAV: Logo VibeHub | Pokój: #alpha-core | Partner: @mateusz (Online 🟢) | Moje Urządzenie: (🟢) |
+-----------------------------------------------------------------------------------------------+
|                                                                                               |
|  [KOLUMNA LEWA: 50% - MOJE ŚRODOWISKO]            [KOLUMNA PRAWA: 50% - ŚRODOWISKO PARTNERA]    |
|  +--------------------------------------------+   +--------------------------------------------+
|  | 🤖 AGENT: Antigravity (WORKING ⚡)          |   | 🤖 AGENT: Claude Code (IDLE 💤)            |
|  | Zadanie: Refaktoryzacja protokołu zdarzeń  |   | Ostatnio: Ukończono testy jednostkowe       |
|  | Aktywne narzędzie: write_to_file           |   | Zaufanie odczytu: 100% (Oficjalny Hook)    |
|  +--------------------------------------------+   +--------------------------------------------+
|  | 📁 KOD: ViberHub (branch: feat/bridge)     |   | 📁 KOD: Backend-API (branch: main)         |
|  | • Modyfikacja: packages/contracts/types.ts |   | • Brak zmian w locie (Working Tree Clean)  |
|  | • Commit 4m temu: "fix: schema validation" |   | • Commit 12m temu: "feat: firestore rules" |
|  +--------------------------------------------+   +--------------------------------------------+
|  | 🌐 LIVE PREVIEW: http://localhost:3000     |   | 🌐 LIVE PREVIEW: https://tunel-mateusz.dev |
|  | [ Okno Iframe z podglądem mojej aplikacji] |   | [ Okno Iframe z podglądem aplikacji kolegi]|
|  +--------------------------------------------+   +--------------------------------------------+
|  | 🛡️ MOJE ZGODY DLA PARTNERA:               |   | 🛡️ ZGODY PARTNERA DLA MNIE:              |
|  | [x] L1: Git  [x] L2: Agent  [ ] L3  [x] L4 |   | [x] L1: Git  [x] L2: Agent  [ ] L3  [ ] L4 |
|  +--------------------------------------------+   +--------------------------------------------+
+-----------------------------------------------------------------------------------------------+
```
