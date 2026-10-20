Write-Host "[*] INFO :: Preparing static frontend export for Firebase Hosting..."
if (Test-Path "apps\web\app\api") {
  Move-Item "apps\web\app\api" "apps\web\_api_shelter" -Force
}
try {
  $env:BUILD_TARGET = "export"
  pnpm --filter web build
  Write-Host "[+] SUCCESS :: Export generated at apps/web/out"
} finally {
  if (Test-Path "apps\web\_api_shelter") {
    Move-Item "apps\web\_api_shelter" "apps\web\app\api" -Force
    Write-Host "[*] INFO :: Restored API route handlers for Vercel backend."
  }
}
