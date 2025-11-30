#!/bin/bash

# Video Optimization Script for CodeAgentSwarm Landing Page
# This script compresses videos to ~50% of original size while maintaining quality
# Requires: ffmpeg (install via: brew install ffmpeg)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== CodeAgentSwarm Video Optimization ===${NC}\n"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: ffmpeg is not installed${NC}"
    echo -e "${YELLOW}Install with: brew install ffmpeg${NC}"
    exit 1
fi

# Navigate to public directory
cd "$(dirname "$0")/../public" || exit 1

# Backup original videos
echo -e "${YELLOW}Creating backup directory...${NC}"
mkdir -p video-originals
cp *.mp4 video-originals/ 2>/dev/null || true

# Function to optimize video
optimize_video() {
    local input=$1
    local output="optimized-${input}"
    local webm="${input%.mp4}.webm"

    echo -e "\n${GREEN}Processing: ${input}${NC}"

    # Get original size
    original_size=$(du -h "$input" | cut -f1)
    echo "Original size: $original_size"

    # Optimize MP4 (H.264, CRF 28, slower preset for better compression)
    echo "Creating optimized MP4..."
    ffmpeg -i "$input" \
        -c:v libx264 \
        -crf 28 \
        -preset slow \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -y \
        "$output" 2>&1 | grep -v "frame=" || true

    # Create WebM version (VP9, even better compression)
    echo "Creating WebM version..."
    ffmpeg -i "$input" \
        -c:v libvpx-vp9 \
        -crf 30 \
        -b:v 0 \
        -c:a libopus \
        -b:a 128k \
        -y \
        "$webm" 2>&1 | grep -v "frame=" || true

    # Create poster image (first frame)
    local poster="${input%.mp4}-poster.jpg"
    echo "Creating poster image..."
    ffmpeg -i "$input" \
        -ss 00:00:01 \
        -vframes 1 \
        -q:v 2 \
        -y \
        "$poster" 2>&1 | grep -v "frame=" || true

    # Show new sizes
    optimized_size=$(du -h "$output" | cut -f1)
    webm_size=$(du -h "$webm" | cut -f1)

    echo -e "${GREEN}✓ Optimized MP4: ${optimized_size}${NC}"
    echo -e "${GREEN}✓ WebM version: ${webm_size}${NC}"
    echo -e "${GREEN}✓ Poster created: ${poster}${NC}"

    # Replace original with optimized (comment out if you want to review first)
    # mv "$output" "$input"
}

# Process all MP4 files
echo -e "\n${YELLOW}Starting video optimization...${NC}\n"

for video in *.mp4; do
    if [[ -f "$video" ]]; then
        optimize_video "$video"
    fi
done

echo -e "\n${GREEN}=== Optimization Complete ===${NC}\n"
echo -e "${YELLOW}Summary:${NC}"
echo "- Original videos backed up to: video-originals/"
echo "- Optimized MP4s created with 'optimized-' prefix"
echo "- WebM versions created for better compression"
echo "- Poster images created for lazy loading"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Review the optimized videos to ensure quality is acceptable"
echo "2. Replace originals: mv optimized-*.mp4 *.mp4"
echo "3. Update video components to use WebM with MP4 fallback"
echo "4. Add poster images to video elements"
echo ""
echo -e "${GREEN}Expected savings: ~50% reduction in file size${NC}"
