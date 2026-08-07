Add-Type -AssemblyName System.Drawing

$srcDir = "C:\Users\Usuario\Sos-Truck-Service\fotos\equipe"
$outDir = "C:\Users\Usuario\Sos-Truck-Service\assets\img\equipe"
$targetWidth = 480

$map = @{
  "_MG_3668-2.jpg" = "equipe-assistente-mecanica.jpg"
  "_MG_3670-2.jpg" = "equipe-tecnologo-eletricista.jpg"
  "_MG_3671-2.jpg" = "equipe-mecanico-diesel-55anos.jpg"
  "_MG_3672-2.jpg" = "equipe-mecanico-diesel-40anos.jpg"
  "_MG_3673-2.jpg" = "equipe-mecanico-diesel-20anos.jpg"
  "_MG_3674-2.jpg" = "equipe-mecanico-diesel-25anos.jpg"
  "_MG_3677-2.jpg" = "equipe-analista-rh.jpg"
  "_MG_3679-2.jpg" = "equipe-ceo-mecanico-chefe.jpg"
  "_MG_3682-2.jpg" = "equipe-gerente-rh.jpg"
}

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]82)

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
