Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\nandi\OneDrive\Desktop\SAKSHI\public\sakshi_logo.jpg"
$destPath = "c:\Users\nandi\OneDrive\Desktop\SAKSHI\public\sakshi_shield.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $src.Width
$h = $src.Height

# The shield is located approximately between:
# X: 16% to 42.5% of width
# Y: 21% to 55.5% of height
$cropX = [int]($w * 0.16)
$cropY = [int]($h * 0.21)
$cropW = [int]($w * 0.265)
$cropH = [int]($h * 0.345)

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cropped = $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Background color is light cream (around R:245-255, G:240-250, B:230-245)
# Let's make the cream background transparent
for ($x = 0; $x -lt $cropped.Width; $x++) {
    for ($y = 0; $y -lt $cropped.Height; $y++) {
        $pixel = $cropped.GetPixel($x, $y)
        # Check if color is close to cream/light background
        if ($pixel.R -gt 230 -and $pixel.G -gt 225 -and $pixel.B -gt 210) {
            $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        }
    }
}

$cropped.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
$src.Dispose()

Write-Host "Successfully cropped shield icon to $destPath"
