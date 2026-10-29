#!/bin/zsh
set -e
cd "$(dirname "$0")"
rm -f cv.pdf cv.png
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=6000 --print-to-pdf="$PWD/cv.pdf" "file://$PWD/cv.html" >/dev/null 2>&1
python3 -c "from pypdf import PdfReader; print('pages', len(PdfReader('cv.pdf').pages))"
sips -s format png cv.pdf --out cv.png >/dev/null
