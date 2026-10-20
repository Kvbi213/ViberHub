# VibeHub CLI Automated One-Line Installer
$ErrorActionPreference = "Stop"

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "[*] INFO :: VibeHub Bridge CLI Automated Installer" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

# 1. Sprawdź czy Node.js jest zainstalowany
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[!] ALERT :: Node.js nie został wykryty w PATH." -ForegroundColor Red
    Write-Host "[*] INFO :: Pobierz i zainstaluj Node.js LTS (https://nodejs.org) przed kontynuacją." -ForegroundColor Yellow
    exit 1
}

$installDir = "$HOME\.vibehub\bin"
if (!(Test-Path $installDir)) {
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
}

$baseUrl = "https://viberhub-8842f.web.app"
$bundlePath = "$installDir\vibehub-cli-bundle.cjs"
$cmdPath = "$installDir\vibehub.cmd"
$ps1Path = "$installDir\vibehub.ps1"

Write-Host "[>] Pobieranie pakietu VibeHub Bridge CLI..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "$baseUrl/vibehub-cli-bundle.cjs" -OutFile $bundlePath -UseBasicParsing

$cmdContent = "@echo off`r`nnode `"%~dp0vibehub-cli-bundle.cjs`" %*"
[System.IO.File]::WriteAllText($cmdPath, $cmdContent)

$ps1Content = "node `"`$PSScriptRoot\vibehub-cli-bundle.cjs`" `$args"
[System.IO.File]::WriteAllText($ps1Path, $ps1Content)

# Dodaj do PATH użytkownika jeśli jeszcze nie istnieje
$userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($userPath -notlike "*$installDir*") {
    $newPath = "$userPath;$installDir"
    [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
    $env:PATH = "$env:PATH;$installDir"
    Write-Host "[+] Dodano $installDir do zmiennej środowiskowej PATH." -ForegroundColor Green
}

Write-Host "================================================================" -ForegroundColor Green
Write-Host "[+] SUCCESS :: VibeHub Bridge CLI zainstalowany pomyślnie!" -ForegroundColor Green
Write-Host "[*] INFO :: Ścieżka: $installDir" -ForegroundColor Cyan
Write-Host "[*] INFO :: Dostępne polecenia: vibehub pair, vibehub start, vibehub setup-mcp" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Green

# Uruchom test weryfikacyjny
& node $bundlePath status
