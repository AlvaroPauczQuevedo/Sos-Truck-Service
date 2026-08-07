Add-Type -AssemblyName System.Drawing

$srcDir = "C:\Users\Usuario\Sos-Truck-Service\fotos\galeria"
$outDir = "C:\Users\Usuario\Sos-Truck-Service\assets\img\galeria"
$targetWidth = 900

$map = @{
  "_MG_3657-2.jpg" = "galeria-fachada-oficina.jpg"
  "_MG_3661-2.jpg" = "galeria-espaco-espera.jpg"
  "_MG_3654-2.jpg" = "galeria-bancada-pecas.jpg"
  "_MG_3650-2.jpg" = "galeria-retifica-motor.jpg"
  "_MG_3653-2.jpg" = "galeria-ajuste-valvulas.jpg"
  "_MG_3684-2.jpg" = "galeria-equipe-motor-scania.jpg"
  "_MG_3658-2.jpg" = "galeria-revisao-patio.jpg"
  "_MG_3700-2.jpg" = "galeria-van-movel.jpg"
  "_MG_3697-2.jpg" = "galeria-frota-atendimento.jpg"
  "_MG_3702-2.jpg" = "galeria-atendimento-despacho.jpg"
}

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]78)

foreach ($key in $map.Keys) {
  $srcPath = Join-Path $srcDir $key
  $outPath = Join-Path $outDir $map[$key]
  $img = [System.Drawing.Image]::FromFile($srcPath)
  $ratio = $targetWidth / $img.Width
  $newW = $targetWidth
  $newH = [int]($img.Height * $ratio)
  $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
  $bmp.SetResolution($img.HorizontalResolution, $img.VerticalResolution)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($img, 0, 0, $newW, $newH)
  $bmp.Save($outPath, $encoder, $encParams)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  Write-Output "$key -> $($map[$key]) (${newW}x${newH})"
}
