#!/usr/bin/env bash
# 把一份講義 PDF 轉成逐頁圖檔，放到 lecture-pages/LNN/pNN.jpg
# 用法：bash tools/render-pages.sh 02 source/CDA_Lecture02_f2026.pdf
# 需要 poppler（Mac：brew install poppler；Windows：建議用 WSL 或 Git Bash + poppler）
set -euo pipefail
NN="$1"; PDF="$2"
OUT="lecture-pages/L${NN}"
mkdir -p "$OUT"
pdftoppm -r 110 -jpeg -jpegopt quality=82 "$PDF" "$OUT/p"
for f in "$OUT"/p-*.jpg; do mv "$f" "$OUT/p${f##*/p-}"; done
echo "完成：$(ls "$OUT" | wc -l) 頁 → $OUT"
