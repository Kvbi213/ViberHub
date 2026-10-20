# 🚨 ERROR_DIFF :: Vercel Build Failure [NEXT_OUTPUT_DIR_MISSING]
> Data: 2026-10-20 | Priorytet: KRYTYCZNY | Komponent: Vercel Microserver Build Pipeline

---

## 1. PROBLEM (TERMINAL RAW & KLASYFIKACJA)

### Raw Error Output:
```text
Error: [NEXT_OUTPUT_DIR_MISSING] The Next.js output directory "apps/web/.next" was not found at "/vercel/path0/apps/web/apps/web/.next". This is usually caused by one of the following:
1. The "Output Directory" setting in your project is misconfigured. Check your project settings and ensure the output directory matches your Next.js configuration.
2. If using Turborepo, ensure your task outputs include the Next.js build directory. Add "apps/web/.next/**" to the "outputs" array in your turbo.json for the build task.
3. The build command did not complete successfully. Check the build logs above for errors.
Learn More: https://err.sh/vercel/vercel/now-next-routes-manifest
```

### Klasyfikacja defektu:
- **Typ:** Nieprawidłowość konfiguracji środowiskowej (Vercel Project Settings vs Monorepo Architecture).
- **Przyczyna źródłowa:**
  1. W panelu Vercel (Project Settings -> General) pole **Root Directory** jest ustawione na `apps/web`.
  2. Pole **Output Directory** ma włączony przełącznik **Override** ze starą wartością `apps/web/.next`.
  3. Pole **Framework Preset** jest ustawione na `Next.js`.
  4. W konsekwencji Vercel uruchamia build w `/vercel/path0/apps/web` i oczekuje katalogu wyjściowego w `/vercel/path0/apps/web/apps/web/.next`, który jest podwojoną, nieistniejącą ścieżką.
  5. Dodatkowo Vercel próbuje wdrażać aplikację jako frontend Next.js, podczas gdy rolą Vercel w nowej architekturze jest wyłącznie mikroserwer backendowy (`api/index.ts`), a frontend stoi na Firebase Hosting (`apps/web/out`).

---

## 2. SOLUTION (KOD I UZASADNIENIE)

### Krok 1: Korekta ustawień w panelu Vercel (Project Settings)
W panelu projektu `viber-hub` w zakładce **Settings -> General**:
1. **Root Directory**: Zmienić z `apps/web` na `./` (katalog główny repozytorium).
2. **Framework Preset**: Zmienić z `Next.js` na `Other`.
3. **Build Command**: Wyłączyć przełącznik Override (Vercel pobierze polecenie z `vercel.json`: `pnpm --filter @vibehub/* build`).
4. **Output Directory**: Wyłączyć przełącznik Override (Disabled).

### Krok 2: Wzmocnienie repozytorium (`dual-root resilience`)
Dodanie `apps/web/vercel.json` z jawnym `framework: null`, aby wyeliminować wymuszenie Next.js nawet w przypadku uruchomienia w podkatalogu.

---

## 3. POST-MORTEM
- **STATUS:** PENDING_OPERATOR_CONFIG_APPLY
- **APPROACH:** Eliminacja konfliktu między ustawieniami panelu Vercel (zablokowanymi na Next.js) a nowym podziałem architektonicznym (Backend Node.js Serverless na Vercel, Frontend na Firebase Hosting).
- **IMPROVED:** Pełna przejrzystość ścieżek budowania i brak zależności od frameworka Next.js na serwerze API.
- **BROKE:** Brak.
