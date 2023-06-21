#!/bin/bash

# Check if ImageMagick is installed
if ! command -v identify &> /dev/null; then
  # Install ImageMagick
  sudo apt-get update
  sudo apt-get install -y imagemagick
fi

# Find all images in nested folders that don't have a small.png extension
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) ! -iname "*-small*" | while read filename; do
  # Get the width of the image
  width=$(identify -format '%w' "$filename")
   # Get the extension of the file
  extension="${filename##*.}"
  echo "Processing $filename with width $width"
  # Check if the image is larger than 390px
  if [ $width -gt 390 ]; then
    # Resize the image to 390px width
    ffmpeg -y -i "$filename" -vf scale=390:-1 "${filename%.*}.tmp.$extension"
    mv "${filename%.*}.tmp.$extension" "$filename"
    rm "${filename%.*}.tmp.$extension"
    echo "Resized $filename"
  fi

done