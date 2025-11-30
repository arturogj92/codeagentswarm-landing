#!/bin/bash

# Image Optimization Script for CodeAgentSwarm Landing Page
# Converts PNG to WebP and creates proper favicon sizes
# Requires: cwebp, imagemagick (install via: brew install webp imagemagick)

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== CodeAgentSwarm Image Optimization ===${NC}\n"

# Check dependencies
if ! command -v cwebp &> /dev/null; then
    echo -e "${RED}Error: cwebp is not installed${NC}"
    echo -e "${YELLOW}Install with: brew install webp${NC}"
    exit 1
fi

if ! command -v convert &> /dev/null; then
    echo -e "${RED}Error: imagemagick is not installed${NC}"
    echo -e "${YELLOW}Install with: brew install imagemagick${NC}"
    exit 1
fi

# Navigate to public directory
cd "$(dirname "$0")/../public" || exit 1

echo -e "${YELLOW}Creating backup directory...${NC}"
mkdir -p image-originals
cp *.png image-originals/ 2>/dev/null || true

# Optimize logo to WebP
echo -e "\n${GREEN}Converting logo to WebP...${NC}"
original_size=$(du -h logo.png | cut -f1)
echo "Original logo.png: $original_size"

cwebp -q 90 logo.png -o logo.webp
webp_size=$(du -h logo.webp | cut -f1)
echo -e "${GREEN}✓ logo.webp created: ${webp_size}${NC}"

# Create favicon sizes
echo -e "\n${GREEN}Creating favicon sizes...${NC}"

convert logo.png -resize 16x16 favicon-16x16.png
convert logo.png -resize 32x32 favicon-32x32.png
convert logo.png -resize 48x48 favicon-48x48.png

echo -e "${GREEN}✓ favicon-16x16.png${NC}"
echo -e "${GREEN}✓ favicon-32x32.png${NC}"
echo -e "${GREEN}✓ favicon-48x48.png${NC}"

# Create Apple touch icon
echo -e "\n${GREEN}Creating Apple touch icon...${NC}"
convert logo.png -resize 180x180 apple-touch-icon.png
echo -e "${GREEN}✓ apple-touch-icon.png${NC}"

# Create Android chrome icons
echo -e "\n${GREEN}Creating Android chrome icons...${NC}"
convert logo.png -resize 192x192 android-chrome-192x192.png
convert logo.png -resize 512x512 android-chrome-512x512.png
echo -e "${GREEN}✓ android-chrome-192x192.png${NC}"
echo -e "${GREEN}✓ android-chrome-512x512.png${NC}"

# Optimize avatars to WebP
echo -e "\n${GREEN}Converting avatars to WebP...${NC}"
cd avatars || exit 1
for avatar in *.png; do
    if [[ -f "$avatar" ]]; then
        original=$(du -h "$avatar" | cut -f1)
        webp="${avatar%.png}.webp"
        cwebp -q 85 "$avatar" -o "$webp"
        new_size=$(du -h "$webp" | cut -f1)
        echo -e "${GREEN}✓ ${avatar} (${original}) → ${webp} (${new_size})${NC}"
    fi
done
cd ..

echo -e "\n${GREEN}=== Optimization Complete ===${NC}\n"
echo -e "${YELLOW}Summary:${NC}"
echo "- Original images backed up to: image-originals/"
echo "- WebP versions created (logo and avatars)"
echo "- Multiple favicon sizes generated"
echo "- Apple and Android icons created"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update app/layout.tsx to reference new favicon sizes"
echo "2. Update next.config.js to enable WebP format"
echo "3. Update Image components to use WebP with PNG fallback"
echo ""
echo -e "${GREEN}Expected savings: ~70-80% on logo, ~60% on avatars${NC}"
