Add-Type -AssemblyName System.Drawing

function Compress-Image($path, $quality) {
    try {
        $img = [System.Drawing.Image]::FromFile($path)
        
        # Max dimension 1920 for performance
        $maxDimension = 1920
        $newWidth = $img.Width
        $newHeight = $img.Height
        
        if ($img.Width -gt $maxDimension -or $img.Height -gt $maxDimension) {
            if ($img.Width -gt $img.Height) {
                $newWidth = $maxDimension
                $newHeight = [int]($img.Height * ($maxDimension / $img.Width))
            } else {
                $newHeight = $maxDimension
                $newWidth = [int]($img.Width * ($maxDimension / $img.Height))
            }
            Write-Host "Resizing from $($img.Width)x$($img.Height) to $($newWidth)x$($newHeight)"
            $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $g = [System.Drawing.Graphics]::FromImage($newImg)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
            $img.Dispose()
            $img = $newImg
        }

        $encoder = [System.Drawing.Imaging.Encoder]::Quality
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]$quality)
        
        $codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
        $jpgCodec = $codecs | Where-Object { $_.MimeType -eq "image/jpeg" }
        
        if (-not $jpgCodec) {
            Write-Error "JPEG Codec not found"
            $img.Dispose()
            return
        }

        $tempPath = $path + ".small.jpg"
        $img.Save($tempPath, $jpgCodec, $encoderParams)
        $img.Dispose()
        
        if (Test-Path $tempPath) {
            $oldSize = (Get-Item $path).Length
            $newSize = (Get-Item $tempPath).Length
            Write-Host "Compressed $($path): $($oldSize) -> $($newSize) bytes"
            Move-Item -Path $tempPath -Destination $path -Force
        }
    } catch {
        Write-Error "Failed to compress $($path): $_"
    }
}

$imageDir = "app/public/images"
$images = Get-ChildItem -Path $imageDir -Include "*.jpg", "*.jpeg" -Recurse
foreach ($imgFile in $images) {
    Write-Host "Processing $($imgFile.FullName)..."
    Compress-Image $imgFile.FullName 75
}
