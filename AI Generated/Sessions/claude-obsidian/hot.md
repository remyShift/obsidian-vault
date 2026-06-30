---
updated: 02-05-2026
project: claude-obsidian
tags: [hot-cache]
---

## Hot Cache — claude-obsidian

### Dernière mise à jour

02-05-2026 — Workflow vault entièrement bouclé : PostCompact, hot cache deux niveaux, /recap, /autoresearch, Sommaire recréé.

### État du projet

- Audit du plugin claude-obsidian et amélioration complète du workflow terminés
- Tous les fichiers de config modifiés : settings.json, session-context.sh, recap.md, CLAUDE.md

### Faits récents importants

- Hook PostCompact ajouté : contexte vault restauré automatiquement après compaction
- Hot cache deux niveaux : `Sessions/{projet}/hot.md` (per-project) + `AI Generated/hot.md` (global)
- /recap met maintenant à jour les deux niveaux automatiquement
- /autoresearch créé : dépose tout dans Notes de Lecture/, Rémy décide ce qui monte
- Pas d'Index.md verbose : le Sommaire existant suffit comme point d'entrée Claude

### Décisions actives

- SessionStart : per-project hot > global + 1 recap (plus les 3 sessions)
- /autoresearch → Notes de Lecture/ uniquement
- PostToolUse auto-commit non ajouté (plugin git Obsidian déjà présent)

### Prochaines étapes

- Tester le SessionStart sur une vraie session (olis-lab)
- Tester le PostCompact en session longue
- Lancer un /autoresearch sur un vrai sujet
