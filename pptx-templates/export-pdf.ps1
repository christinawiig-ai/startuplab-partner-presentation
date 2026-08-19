# Eksporterer .pptx til PDF via lokal PowerPoint.
# Nyttig naar decket skal deles med noen som ikke har Replica-fonten installert:
# da bytter PowerPoint font og teksten flytter seg, mens PDF ser likt ut overalt.
# Bruk: powershell -File export-pdf.ps1 -Pptx deck.pptx
param(
  [Parameter(Mandatory = $true)][string]$Pptx,
  [string]$Out
)

$ErrorActionPreference = "Stop"
$pptxPath = (Resolve-Path $Pptx).Path
if (-not $Out) { $Out = [IO.Path]::ChangeExtension($pptxPath, ".pdf") }
elseif (-not [IO.Path]::IsPathRooted($Out)) { $Out = Join-Path (Get-Location) $Out }

$ppt = $null
$pres = $null
try {
  $ppt = New-Object -ComObject PowerPoint.Application
  $pres = $ppt.Presentations.Open($pptxPath, $true, $false, $false)
  $pres.SaveAs($Out, 32)  # 32 = ppSaveAsPDF
  Write-Output "PDF: $Out"
}
finally {
  if ($pres) { $pres.Close() }
  if ($ppt) { $ppt.Quit(); [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) }
}
