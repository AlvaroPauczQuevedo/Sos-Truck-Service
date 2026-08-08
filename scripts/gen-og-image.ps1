Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Usuario\Sos-Truck-Service\fotos\galeria\_MG_3657-2.jpg"
$outPath = "C:\Users\Usuario\Sos-Truck-Service\assets\og-image.jpg"
$targetW = 1200
$targetH = 630

$img = [System.Drawing.Image]::FromFile($srcPath)

# scale so width matches target (source is proportionally narrower/taller than target), then crop height
$scale = $targetW / $img.Width
$scaledW = $targetW
$scaledH = [int]($img.Height * $scale)

$scaled = New-Object System.Drawing.Bitmap($scaledW, $scaledH)
$g = [System.Drawing.Graphics]::FromImage($scaled)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.DrawImage($img, 0, 0, $scaledW, $scaledH)
$g.Dispose()
$img.Dispose()

# crop height down to target: keep a bit more of the top (sign) than the bottom (gravel lot)
$totalCrop = $scaledH - $targetH
$cropTop = [int]($totalCrop * 0.35)

$final = New-Object System.Drawing.Bitmap($targetW, $targetH)
$gf = [System.Drawing.Graphics]::FromImage($final)
$gf.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRect = New-Object System.Drawing.Rectangle(0, $cropTop, $targetW, $targetH)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
$gf.DrawImage($scaled, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$gf.Dispose()
$scaled.Dispose()

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]85)
$final.Save($outPath, $encoder, $encParams)
$final.Dispose()

Write-Output "saved $outPath (${targetW}x${targetH})"
