---
updated: 02-05-2026
project: claude-obsidian
tags: [meta, hot-cache]
---

# Hot Cache — claude-obsidian

## Dernière mise à jour
02-05-2026 — Amélioration complète du workflow vault : PostCompact hook, hot cache deux niveaux, refactor session-context.sh, /recap mis à jour.

## État du projet
- Plugin claude-obsidian analysé et comparé au setup Rémy — audit terminé
- Implémentations de cette session toutes commitées dans les fichiers de config Claude

## Faits récents importants
- Architecture hot cache deux niveaux : `Sessions/{project}/hot.md` (per-project) + `AI Generated/hot.md` (global fallback)
- SessionStart charge per-project hot > global + 1 recap (au lieu de 3 sessions)
- PostCompact hook ajouté : restaure le contexte vault après compaction silencieusement
- /autoresearch et Index Notes Permanentes pas encore implémentés

## Décisions actives
- Notes Permanentes/ reste le wiki, Notes de Lecture/ reste le raw — pas de duplication de structure
- /autoresearch déposera dans Notes de Lecture/ uniquement, Rémy trie ensuite
- PostToolUse auto-commit skippé (plugin Obsidian git déjà en place)

## Prochaines étapes
- Créer `Notes Permanentes/Index.md` (catalog central par domaine)
- Configurer skill /autoresearch adapté au vault
- Tester SessionStart + PostCompact sur une vraie session longue
