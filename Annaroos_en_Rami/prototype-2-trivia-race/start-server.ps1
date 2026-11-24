# start-server.ps1: serveert deze map op http://localhost:8080
# Waarom een eigen scriptje? Zo hoef je niets te installeren: PowerShell zit al in Windows.
# Stoppen: druk op Ctrl+C in het venster.

$port = 8080
$map = $PSScriptRoot

# Welk bestandstype hoort bij welke extensie? De browser heeft dit nodig om bestanden goed te tonen.
$types = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".svg"  = "image/svg+xml"
}

$server = New-Object System.Net.HttpListener
$server.Prefixes.Add("http://localhost:$port/")
$server.Start()
Write-Host "Mossy Gezondheidsquiz draait op http://localhost:$port  (Ctrl+C om te stoppen)"

try {
  while ($server.IsListening) {
    $context = $server.GetContext()
    $pad = $context.Request.Url.LocalPath
    if ($pad -eq "/") { $pad = "/index.html" }

    # Alleen bestanden binnen deze map worden getoond (geen ".." naar andere mappen).
    $bestand = [System.IO.Path]::GetFullPath((Join-Path $map $pad.TrimStart("/")))
    if ($bestand.StartsWith($map) -and (Test-Path $bestand -PathType Leaf)) {
      $extensie = [System.IO.Path]::GetExtension($bestand).ToLower()
      $context.Response.ContentType = if ($types.ContainsKey($extensie)) { $types[$extensie] } else { "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($bestand)
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $context.Response.StatusCode = 404
    }
    $context.Response.Close()
  }
} finally {
  $server.Stop()
}
