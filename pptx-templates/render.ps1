# Renderer en .pptx til PNG-er via lokal PowerPoint (LibreOffice finnes ikke pa denne maskinen).
# Bruk: powershell -File render.ps1 -Pptx deck.pptx -Out render
param(
  [Parameter(Mandatory = $true)][string]$Pptx,
  [string]$Out = "render"
)

$ErrorActionPreference = "Stop"
$pptxPath = (Resolve-Path $Pptx).Path
$outDir = Join-Path (Get-Location) $Out

if (Test-Path $outDir) { Remove-Item $outDir -Recurse -Force }
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$ppt = $null
$pres = $null
try {
  $ppt = New-Object -ComObject PowerPoint.Application
  $pres = $ppt.Presentations.Open($pptxPath, $true, $false, $false)
  # 1920x1080 gir lesbare detaljer i visuell QA
  $pres.SaveCopyAs("$outDir\slides.png", 18)
  Write-Output "RENDER OK: $($pres.Slides.Count) slides"
}
finally {
  if ($pres) { $pres.Close() }
  if ($ppt) { $ppt.Quit(); [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) }
}

# PowerPoint lager en undermappe "slides" med Lysbilde1.PNG / Slide1.PNG
$sub = Join-Path $outDir "slides"
if (Test-Path $sub) {
  Get-ChildItem $sub -Filter *.PNG | ForEach-Object { Move-Item $_.FullName (Join-Path $outDir $_.Name) -Force }
  Remove-Item $sub -Recurse -Force
}
Get-ChildItem $outDir -Filter *.PNG | Sort-Object { [int]($_.BaseName -replace '\D', '') } | ForEach-Object { $_.FullName }
