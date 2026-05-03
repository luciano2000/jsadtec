# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`jsadtec` is a vanilla JavaScript wrapper for Google Publisher Tag (GPT) that simplifies ad slot management. It ships two files: `google-admanager.js` (annotated source) and `google-admanager.min.js` (production minified). There is no build system or package manager.

## Updating the Minified File

After editing `google-admanager.js`, the minified file must be updated manually. Use any standard minifier:

```bash
# With terser (if installed globally)
terser google-admanager.js -o google-admanager.min.js --compress --mangle

# With uglify-js
uglifyjs google-admanager.js -o google-admanager.min.js --compress --mangle
```

The minified file is what publishers embed in production. Always keep both in sync.

## Validation Scripts

```bash
# Quick validation during development (security, lint, UX, SEO)
python .agent/scripts/checklist.py .

# Full pre-deployment suite (adds Lighthouse, Playwright E2E, bundle analysis)
python .agent/scripts/verify_all.py . --url http://localhost:3000
```

## Architecture

### Two-Layer Pattern

The library uses a private/public split within one IIFE (`google-admanager.js:59`):

- **`AdManager` class** (`google-admanager.js:154`) — all implementation logic. Never exposed directly.
- **`window.GoogleAdManager`** (`google-admanager.js:928`) — the public facade. Only this object is used by publishers.

### Responsive Size Mapping

All ad sizes live in `adSizesByPosition` (`google-admanager.js:102`). The object maps position names (`topo`, `meio`, `lateral`, `barra`, `rodape`, `inread`, `inread-full`, `container`, `big`) to viewport-breakpoint arrays. Breakpoints are 750, 1000, 1050, and 1300px. Positions not found fall back to `default`.

When adding a new canonical position, add its entry to `adSizesByPosition`. Publishers can also add custom positions at runtime via `GoogleAdManager.addPosition()`.

### Sequential Position Indexing

Multiple `<div class="pubad" data-pos="meio">` elements in a page get auto-indexed as `meio_1`, `meio_2`, etc. This is done in `detectAdSlots()` (`google-admanager.js:470`) and the index is written to `element.dataset.posIndex`. GPT targeting uses both `pos` (base name) and `pos_index` (with index) keys.

### SPA / Dynamic DOM Support

A `MutationObserver` watches `document.body` for new `.pubad` elements. It is debounced at 300ms to avoid hammering `detectAdSlots()` during bulk DOM insertions (`google-admanager.js:950`).

### Resize Strategy

The resize listener (`setupResizeListener`) only triggers ad refresh when the window width crosses a defined breakpoint — not on every resize event. This prevents unnecessary GPT calls when users resize between the same breakpoint range.

### GPT Initialization Flow

`init()` dynamically injects `gpt.js`, then inside `googletag.cmd.push()` it configures: SRA, collapse empty divs, lazy load, PPID, Navegg, global targeting, and event listeners — in that order. `enableServices()` is called last. The method returns a Promise.

## Key Files

| File | Purpose |
|---|---|
| `google-admanager.js` | Annotated source — edit this |
| `google-admanager.min.js` | Production minified — regenerate after edits |
| `par.js` | Standalone partner navigation bar widget (separate from AdManager) |
| `.agent/ARCHITECTURE.md` | Antigravity Kit agent/skill overview |
| `.agent/rules/GEMINI.md` | Workspace AI behavior rules (agent routing, checklist protocol) |
