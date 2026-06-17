---
updated: 15-06-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Dernière mise à jour
15-06-2026 — Inspiré du repo Kenjaku : ajout d'un RAG sémantique local, d'un skill `/coach`, d'une boucle de friction + `/improve`, généralisation de la délégation sous-agents. lean-ctx entièrement retiré.

## État du projet
- **RAG opérationnel** : moteur Kenjaku dans `~/vault-rag/rag/`, embedder `in-process` local (gratuit), serveur MCP `vault-rag` global dans `~/.claude.json`. 1003 docs / 3389 chunks. Vérifié live (stats + recherche cross-lingue OK).
- **`/coach`** : `Skills/coach/SKILL.md` (prep sous-agent + Radical Candor), logs dans `AI Generated/Coaching/`.
- **`/improve`** : `~/.claude/commands/improve.md`, traite `Vie Perso/Harnais Backlog.md`.
- **Capture de friction** + **délégation sous-agents** : règles passées en **global** dans `~/.claude/CLAUDE.md`.
- **`/lint` supprimé** (redondant avec Axe C de `/evolve`).

## Faits récents importants
- User MCPs lus depuis `~/.claude.json` (pas `~/.claude/mcp.json`) → utiliser `claude mcp add --scope user`.
- `~/.claude.json` réécrit en direct par Claude Code : relire avant Edit.
- Moteur RAG résout ses chemins depuis `__dirname` (indépendant du cwd) ; serveur stdio = pas un démon (spawné/tué par session, reindex incrémental au démarrage).
- Classifieur bloque l'exécution de code tiers + l'édition des permissions `settings.json` → Rémy le fait à la main.

## Décisions actives
- RAG : tout le vault, moteur réutilisé, embedder local. Serveur en global.
- Friction : auto-capture (global) + traitement manuel `/improve`.
- Délégation sous-agents : principe global (recherche large → sous-agent ~500 tokens ; fetch 1-2 notes → direct).

## Prochaines étapes
- Tester `/coach` en usage réel (apparaît après relance).
- Optionnel : ajouter le vault aux `additionalDirectories` global (capture friction sans prompt hors-vault) + permissions `mcp__vault-rag__*`.
- Investiguer le hook SessionStart qui plante (`session-context.sh`).
- Laisser le backlog de friction se remplir, puis `/improve`.
