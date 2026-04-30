---
tags:
  - LyonCraft
  - Talk
  - Slidev
---

# Slides LyonCraft 2026

Les slides sont dans un repo dédié hors du vault.

## Liens

- **Repo GitHub** : https://github.com/remyShift/lyoncraft-2026
- **Slides en ligne** : https://remyshift.github.io/lyoncraft-2026/
- **Local** : `~/Desktop/Code/lyoncraft-2026/`

## Workflow

```bash
cd ~/Desktop/Code/lyoncraft-2026

pnpm run dev      # dev local → http://localhost:3030
pnpm run build    # build static → dist/
git push          # redéploie automatiquement sur GitHub Pages
```

## Stack

- [Slidev](https://sli.dev) — slides as code
- Vue 3 + UnoCSS + @vueuse/motion
- DA Monsters & Cie — 4 portes colorées (vert / bleu / rouge / or)
- Composants : `Door`, `SkillCompare`, `SequenceBlock`, `TimelineItem`, `Tag`
