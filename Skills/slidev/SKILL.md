---
name: slidev
description: Create and present web-based slidedecks for developers using Slidev with Markdown, Vue components, code highlighting, animations, and interactive features. Use when building technical presentations, conference talks, code walkthroughs, teaching materials, or developer decks.
---

# Slidev - Presentation Slides for Developers

Web-based slides maker built on Vite, Vue, and Markdown.

## When to Use

- Technical presentations or slidedecks with live code examples
- Syntax-highlighted code snippets with animations
- Interactive demos (Monaco editor, runnable code)
- Mathematical equations (LaTeX) or diagrams (Mermaid, PlantUML)
- Record presentations with presenter notes
- Export to PDF, PPTX, or host as SPA
- Code walkthroughs for developer talks or workshops

## Quick Start

```bash
pnpm create slidev    # Create project
pnpm run dev          # Start dev server (opens http://localhost:3030)
pnpm run build        # Build static SPA
pnpm run export       # Export to PDF (requires playwright-chromium)
```

**Verify**: After `pnpm run dev`, confirm slides load at `http://localhost:3030`. After `pnpm run export`, check the output PDF exists in the project root.

## Basic Syntax

```md
---
theme: default
title: My Presentation
---

# First Slide

Content here

---

# Second Slide

More content

<!--
Presenter notes go here
-->
```

- `---` separates slides
- First frontmatter = headmatter (deck config)
- HTML comments = presenter notes

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Markdown Syntax | Slide separators, frontmatter, notes, code blocks | [core-syntax](core-syntax.md) |
| Animations | v-click, v-clicks, motion, transitions | [core-animations](core-animations.md) |
| Headmatter | Deck-wide configuration options | [core-headmatter](core-headmatter.md) |
| Frontmatter | Per-slide configuration options | [core-frontmatter](core-frontmatter.md) |
| CLI Commands | Dev, build, export, theme commands | [core-cli](core-cli.md) |
| Components | Built-in Vue components | [core-components](core-components.md) |
| Layouts | Built-in slide layouts | [core-layouts](core-layouts.md) |
| Exporting | PDF, PPTX, PNG export options | [core-exporting](core-exporting.md) |
| Hosting | Build and deploy to various platforms | [core-hosting](core-hosting.md) |
| Global Context | $nav, $slidev, composables API | [core-global-context](core-global-context.md) |

## Feature Reference

### Code & Editor

| Feature | Usage | Reference |
|---------|-------|-----------|
| Line highlighting | `` ```ts {2,3} `` | [code-line-highlighting](code-line-highlighting.md) |
| Click-based highlighting | `` ```ts {1\|2-3\|all} `` | [code-line-highlighting](code-line-highlighting.md) |
| Line numbers | `lineNumbers: true` or `{lines:true}` | [code-line-numbers](code-line-numbers.md) |
| Scrollable code | `{maxHeight:'100px'}` | [code-max-height](code-max-height.md) |
| Code tabs | `::code-group` (requires `comark: true`) | [code-groups](code-groups.md) |
| Monaco editor | `` ```ts {monaco} `` | [editor-monaco](editor-monaco.md) |
| Run code | `` ```ts {monaco-run} `` | [editor-monaco-run](editor-monaco-run.md) |
| Edit files | `<<< ./file.ts {monaco-write}` | [editor-monaco-write](editor-monaco-write.md) |
| Code animations | `` ````md magic-move `` | [code-magic-move](code-magic-move.md) |
| TypeScript types | `` ```ts twoslash `` | [code-twoslash](code-twoslash.md) |
| Import code | `<<< @/snippets/file.js` | [code-import-snippet](code-import-snippet.md) |

### Diagrams & Math

| Feature | Usage | Reference |
|---------|-------|-----------|
| Mermaid diagrams | `` ```mermaid `` | [diagram-mermaid](diagram-mermaid.md) |
| PlantUML diagrams | `` ```plantuml `` | [diagram-plantuml](diagram-plantuml.md) |
| LaTeX math | `$inline$` or `$$block$$` | [diagram-latex](diagram-latex.md) |

### Layout & Styling

| Feature | Usage | Reference |
|---------|-------|-----------|
| Canvas size | `canvasWidth`, `aspectRatio` | [layout-canvas-size](layout-canvas-size.md) |
| Zoom slide | `zoom: 0.8` | [layout-zoom](layout-zoom.md) |
| Scale elements | `<Transform :scale="0.5">` | [layout-transform](layout-transform.md) |
| Layout slots | `::right::`, `::default::` | [layout-slots](layout-slots.md) |
| Scoped CSS | `<style>` in slide | [style-scoped](style-scoped.md) |
| Global layers | `global-top.vue`, `global-bottom.vue` | [layout-global-layers](layout-global-layers.md) |
| Draggable elements | `v-drag`, `<v-drag>` | [layout-draggable](layout-draggable.md) |
| Icons | `<mdi-icon-name />` | [style-icons](style-icons.md) |

### Animation & Interaction

| Feature | Usage | Reference |
|---------|-------|-----------|
| Click animations | `v-click`, `<v-clicks>` | [core-animations](core-animations.md) |
| Rough markers | `v-mark.underline`, `v-mark.circle` | [animation-rough-marker](animation-rough-marker.md) |
| Drawing mode | Press `C` or config `drawings:` | [animation-drawing](animation-drawing.md) |
| Direction styles | `forward:delay-300` | [style-direction](style-direction.md) |
| Note highlighting | `[click]` in notes | [animation-click-marker](animation-click-marker.md) |

### Syntax Extensions

| Feature | Usage | Reference |
|---------|-------|-----------|
| Comark syntax | `comark: true` + `{style="color:red"}` | [syntax-comark](syntax-comark.md) |
| Block frontmatter | `` ```yaml `` instead of `---` | [syntax-block-frontmatter](syntax-block-frontmatter.md) |
| Import slides | `src: ./other.md` | [syntax-importing-slides](syntax-importing-slides.md) |
| Merge frontmatter | Main entry wins | [syntax-frontmatter-merging](syntax-frontmatter-merging.md) |

### Presenter & Recording

| Feature | Usage | Reference |
|---------|-------|-----------|
| Recording | Press `G` for camera | [presenter-recording](presenter-recording.md) |
| Timer | `duration: 30min`, `timer: countdown` | [presenter-timer](presenter-timer.md) |
| Remote control | `slidev --remote` | [presenter-remote](presenter-remote.md) |
| Ruby text | `notesAutoRuby:` | [presenter-notes-ruby](presenter-notes-ruby.md) |

### Export & Build

| Feature | Usage | Reference |
|---------|-------|-----------|
| Export options | `slidev export` | [core-exporting](core-exporting.md) |
| Build & deploy | `slidev build` | [core-hosting](core-hosting.md) |
| Build with PDF | `download: true` | [build-pdf](build-pdf.md) |
| Cache images | Automatic for remote URLs | [build-remote-assets](build-remote-assets.md) |
| OG image | `seoMeta.ogImage` or `og-image.png` | [build-og-image](build-og-image.md) |
| SEO tags | `seoMeta:` | [build-seo-meta](build-seo-meta.md) |

**Export prerequisite**: `pnpm add -D playwright-chromium` is required for PDF/PPTX/PNG export. If export fails with a browser error, install this dependency first.

### Editor & Tools

| Feature | Usage | Reference |
|---------|-------|-----------|
| Side editor | Click edit icon | [editor-side](editor-side.md) |
| VS Code extension | Install `antfu.slidev` | [editor-vscode](editor-vscode.md) |
| Prettier | `prettier-plugin-slidev` | [editor-prettier](editor-prettier.md) |
| Eject theme | `slidev theme eject` | [tool-eject-theme](tool-eject-theme.md) |

### Lifecycle & API

| Feature | Usage | Reference |
|---------|-------|-----------|
| Slide hooks | `onSlideEnter()`, `onSlideLeave()` | [api-slide-hooks](api-slide-hooks.md) |
| Navigation API | `$nav`, `useNav()` | [core-global-context](core-global-context.md) |

## Common Layouts

| Layout | Purpose |
|--------|---------|
| `cover` | Title/cover slide |
| `center` | Centered content |
| `default` | Standard slide |
| `two-cols` | Two columns (use `::right::`) |
| `two-cols-header` | Header + two columns |
| `image` / `image-left` / `image-right` | Image layouts |
| `iframe` / `iframe-left` / `iframe-right` | Embed URLs |
| `quote` | Quotation |
| `section` | Section divider |
| `fact` / `statement` | Data/statement display |
| `intro` / `end` | Intro/end slides |

## Resources

- Documentation: https://sli.dev
- Theme Gallery: https://sli.dev/resources/theme-gallery
- Showcases: https://sli.dev/resources/showcases
