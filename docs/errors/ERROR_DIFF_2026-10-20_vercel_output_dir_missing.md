# 🚨 ERROR_DIFF :: Vercel Build Failure [NEXT_OUTPUT_DIR_MISSING & ROUTES_MANIFEST_MISSING]
> Data: 2026-10-20 | Priorytet: KRYTYCZNY | Komponent: Vercel Microserver Build Pipeline

---

## 1. PROBLEM (TERMINAL RAW & KLASYFIKACJA)

### Raw Error Output:
```text
The file "/vercel/path0/apps/web/public/routes-manifest.json" couldn't be found. This is usually caused by one of the following:
1. The "Output Directory" setting in your project is misconfigured. Ensure it matches your Next.js "distDir" configuration (defaults to ".next").
2. If using Turborepo, ensure your task outputs include the Next.js build directory. Add ".next/**" (or your custom distDir) to the "outputs" array in turbo.json for the build task.
3. The build command did not complete successfully. Check the build logs above for errors.
```

### Klasyfikacja defektu:
- **Typ:** Niezgodność konfiguratora buildera Vercel z trybem eksportu statycznego (`output: 'export'`).
- **Przyczyna źródłowa:**
  1. Projekt w Vercel budowany jest w kontekście `apps/web` jako aplikacja Next.js.
  2. Wcześniejsza konfiguracja `output: 'export'` w `apps/web/next.config.mjs` wymuszała eksport statyczny do katalogu `out/`, uniemożliwiając generowanie pliku `.next/routes-manifest.json` oraz serwerowych funkcji Route Handlers.
  3. Dodatkowo wcześniejsze wskazanie `outputDirectory: "public"` powodowało, że builder Next.js szukał pliku manifestu w `public/routes-manifest.json`.

---

## 2. SOLUTION (KOD I UZASADNIENIE)

### Krok 1: Warunkowy eksport statyczny w `apps/web/next.config.mjs`
```javascript
const isExport = process.env.BUILD_TARGET === 'export' || process.env.EXPORT_STATIC === 'true';

const nextConfig = {
  ...(isExport ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
};
```
- Na Vercelu: `next build` kompiluje standardowy bundle serwerowy z `.next/routes-manifest.json` oraz serwerowymi endpointami API (`/api/v1/*`).
- Na potrzeby Firebase: `BUILD_TARGET=export pnpm --filter web build` eksportuje statyczny frontend do `apps/web/out`.

### Krok 2: Przywrócenie i zabezpieczenie Route Handlers w `apps/web/app/api/v1/`
Zaimplementowano Route Handlers z pełną obsługą CORS (`Access-Control-Allow-Origin: *`, preflight `OPTIONS 200 OK`):
- `/api/v1/system/status`
- `/api/v1/events/batch` (zapis do Cloud Firestore `viberhub-8842f`)
- `/api/v1/bridge/pair`
- `/api/v1/bridge/heartbeat`

### Krok 3: Oczyszczenie `vercel.json`
Usunięto mylącą właściwość `outputDirectory: "public"`, pozwalając builderowi Next.js automatycznie rozpoznać `.next`.

---

## 3. POST-MORTEM
- **STATUS:** RESOLVED_AND_VERIFIED_LOCALLY
- **APPROACH:** Unifikacja środowiskowa — Next.js w Vercel kompiluje natywne Serverless Route Handlers w `.next`, podczas gdy Firebase Hosting serwuje wyeksportowany wcześniej statyczny katalog `apps/web/out`.
- **IMPROVED:** Pełna zgodność z builderem Vercel, brak kolizji manifestów routingu, zachowanie natywnych funkcji mikroserwera API na Vercel.
- **BROKE:** Brak regresji.
