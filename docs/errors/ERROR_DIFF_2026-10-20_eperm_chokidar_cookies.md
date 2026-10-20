# 🚨 ERROR_DIFF :: EPERM chokidar watch na folderze systemowym Windows 'Cookies'
> Data: 2026-10-20 | Priorytet: KRYTYCZNY | Status: IN_PROGRESS

---

### 1. PROBLEM (Terminal Raw & Klasyfikacja)

```
node:internal/fs/watchers:323
    const error = new UVException({
                  ^

Error: EPERM: operation not permitted, watch 'C:\Users\Jakub Lis\Cookies'
    at FSWatcher.<computed> (node:internal/fs/watchers:323:19)
    at Object.watch (node:fs:3062:36)
    at createFsWatchInstance (C:\Users\Jakub Lis\Desktop\01_PROJEKTY\ViberHub\node_modules\.pnpm\chokidar@3.6.0\node_modules\chokidar\lib\nodefs-handler.js:119:15)
...
  errno: -4048,
  syscall: 'watch',
  code: 'EPERM',
  path: 'C:\\Users\\Jakub Lis\\Cookies',
  filename: 'C:\\Users\\Jakub Lis\\Cookies'
```

#### Klasyfikacja:
- **Typ:** Nieprawidłowość operacyjna / Odmowa dostępu do węzła systemu plików (Windows Junction Point EPERM).
- **Przyczyna:** Uruchomienie `vibehub pair` w katalogu domowym użytkownika (`C:\Users\Jakub Lis`). Biblioteka `chokidar` w `FileWatcherCollector` rekursywnie próbowała nasłuchiwać cały katalog, w tym chronione foldery systemowe Windows (Junctions: `Cookies`, `AppData`, `Local Settings`, `Application Data`), na których `fs.watch` rzuca nieobsłużony wyjątek `EPERM`.
- **Brak handlera błędów:** `FileWatcherCollector` nie posiadał zdarzenia `watcher.on('error', ...)`, co powodowało nieobsłużone rzucenie błędu i zakończenie procesu Node.js (`uncaughtException`).

---

### 2. SOLUTION (Plan Naprawy)

1. **Obsługa błędów Chokidar:** Dodać `watcher.on('error', (err) => console.warn('[!] ALERT :: FileWatcher ignored error:', err.message))` — zapobieganie awarii procesu przy odmowie dostępu do pojedynczych plików/folderów.
2. **Ignorowanie folderów systemowych Windows & Metadanych:** Rozbudować `ignored` o:
   - Foldery systemowe Windows: `**/Cookies/**`, `**/AppData/**`, `**/Application Data/**`, `**/Local Settings/**`, `**/NTUSER*/**`, `**/.cache/**`, `**/System Volume Information/**`, `**/$Recycle.Bin/**`.
   - Foldery repozytoriów i zależności: `**/node_modules/**`, `**/.git/**`, `**/.next/**`, `**/dist/**`, `**/out/**`.
3. **Inteligentna detekcja katalogu projektu w CLI:**
   - Jeśli `process.cwd()` to katalog domowy (`os.homedir()`) lub katalog bez repozytorium Git, zapytać użytkownika o ścieżkę do projektu lub automatycznie wskazać katalog roboczy repozytorium VibeHub/projekty.

---

### 3. POST-MORTEM
- **STATUS:** RESOLVED (SUCCESS)
- **APPROACH:** Wprowadzono dynamiczny predykat `isSystemOrIgnored` wykluczający węzły systemowe Windows (`Cookies`, `AppData`, `NTUSER.DAT` itp.), włączono `ignorePermissionErrors: true` w chokidar oraz dodano bezpieczny handler `watcher.on('error')` logujący ostrzeżenia zamiast dopuszczać do awarii procesu.
- **IMPROVED:** Demon Bridge działa stabilnie bez względu na ścieżkę uruchomienia (nawet z katalogu głównego profilu użytkownika `C:\Users\Jakub Lis`).
- **BROKE:** Brak regresji.
