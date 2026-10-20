================================================================
  VIBEHUB BRIDGE CLI — AUTONOMICZNA PACZKA TERMINALOWA
================================================================

Zawartość paczki:
- vibehub-cli-bundle.cjs : Skompilowany, zminifikowany silnik CLI Bridge Node.js (240KB)
- vibehub.cmd            : Launcher dla wiersza poleceń Windows CMD
- vibehub.ps1            : Launcher dla PowerShell
- install.bat            : 1-klikowy automatyczny instalator dla Windows
- install.ps1            : Skrypt instalacyjny dla PowerShell
- install.sh             : Skrypt instalacyjny dla Linux / macOS

INSTALACJA (WINDOWS):
1. Uruchom dwuklikiem 'install.bat' LUB
2. W PowerShell wpisz:
   powershell -c "irm https://viberhub-8842f.web.app/install.ps1 | iex"

INSTALACJA (LINUX / MAC):
1. curl -fsSL https://viberhub-8842f.web.app/install.sh | bash

DOSTĘPNE POLECENIA PO ZAINSTALOWANIU:
- vibehub pair [KOD]   : Parowanie stacji roboczej kodem z panelu (np. VH-9428-XK)
- vibehub start        : Uruchomienie demona telemetrycznego w tle
- vibehub setup-mcp    : Rejestracja serwera MCP w konfiguracji Antigravity
- vibehub status       : Sprawdzenie łączności z klastrem VibeHub
================================================================
