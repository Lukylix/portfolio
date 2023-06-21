#!/bin/bash

# Find all images in nested folders that don't have a small.png extension
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) ! -iname "*-small*" | while read filename; do
  # Get the extension of the file
  extension="${filename##*.}"

  # Create a small version of the image with the original extension
  ffmpeg -y -i "./$filename" -vf scale=20:-1 "./${filename%.*}-small.$extension"
  echo "Created ./${filename%.*}-small.$extension"
done