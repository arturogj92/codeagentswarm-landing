---
title: Landing content looked undersized on 2K and 4K displays
summary: The homepage now scales its existing rem-based design smoothly above laptop widths without changing the mobile layout.
kind: diagnostic
status: current
updated: 2026-08-11
files: ["app/globals.css", "messages/en.json", "messages/es.json"]
---

## Symptom

At 2560×1440 and 3840×2160, the homepage remained a 1280px-wide island with 72px hero type and a 1024px video. The composition looked increasingly small as the viewport grew.

## Root cause

The whole layout uses rem-based Tailwind sizes, but the root font size stayed fixed at 16px. Every container and type cap therefore stopped growing at laptop dimensions.

## Fix

`app/globals.css` scales the root font from 16px to a 24px ceiling. Existing rem-based widths, spacing and type now grow together, while mobile and laptop layouts retain their original 16px base. Anchored sections also reserve space for the fixed header.

Marketing copy now presents the product as a visual command center for AI agents. “Terminal” remains only where it describes a literal terminal or a terminal-focused guide.

## Verification

Playwright viewport checks at 320, 375, 390, 768, 1024, 1280, 1440, 1920, 2560 and 3840 pixels showed no horizontal overflow. Spanish and English hero, features, pricing and download sections were inspected at mobile and 2K sizes. The production Next.js build generated all 310 static pages successfully.
