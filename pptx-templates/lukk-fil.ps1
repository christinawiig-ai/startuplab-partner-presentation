# Lukker EN navngitt presentasjon i den kjorende PowerPoint-instansen, slik at
# et bygg kan skrive over fila. Rorer ikke andre apne presentasjoner, og kaller
# ALDRI Quit(): Office har bare en COM-instans, sa Quit() ville lukket alt
# Christina har apent, med ulagret arbeid.
#
# Nekter a lukke en fil som har ulagrede endringer. Da er det trolig noe der
# som ikke ligger i koden, og det skal ikke forsvinne i et bygg.
param([Parameter(Mandatory = $true)][string]$Navn)

$ErrorActionPreference = "Stop"

if (-not (Get-Process POWERPNT -ErrorAction SilentlyContinue)) {
  Write-Output "PowerPoint kjorer ikke, ingenting a lukke"
  exit 0
}

$ppt = [Runtime.InteropServices.Marshal]::GetActiveObject("PowerPoint.Application")
$funnet = $false
foreach ($pres in $ppt.Presentations) {
  if ($pres.Name -ne $Navn) { continue }
  $funnet = $true
  if (-not $pres.Saved) {
    Write-Error "$Navn har ULAGREDE endringer. Lukker ikke. Lagre eller forkast selv forst."
  }
  $pres.Close()
  Write-Output "Lukket $Navn (var lagret)"
}
if (-not $funnet) { Write-Output "$Navn var ikke apen" }
