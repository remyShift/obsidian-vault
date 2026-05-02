---
tags:
  - Perso
---
## Architecture
- MCP entre Claude Code et Obsidian via plugin MCP Tools (binaire stdio, API key Local REST API)
- Config dans `~/.claude.json` → serveur `obsidian`
- lean-ctx + symdex configurés en MCPs globaux (`~/.claude.json`)

## Hook SessionStart
- Charge les 3 sessions AI Generated les plus récentes liées au projet en cours (récupérées dynamiquement selon le cwd de la session)
- Fournit le contexte des dernières sessions sans avoir à les relire manuellement

## Commandes actives
- `/recap` : résumé session Claude Code → `AI Generated/Sessions/{projet}/`
- `/wrap` : synthèse conversation → `AI Generated/Conversations/`
- `/evolve` : analyse hebdo AI Generated + Notes Permanentes → rapport `AI Generated/Evolve Reports/`
- `/capture` : note rapide → `Notes de Lecture/Inbox/`
- `/lint` : audit vault (orphelines, liens cassés) + `--fix` interactif

## Structure AI Generated
- `Sessions/{projet}/` : recaps par projet (auto-chargés au SessionStart)
- `Conversations/` : synthèses de chat (/wrap)
- `Evolve Reports/` : rapports /evolve hebdomadaires

## Principe de design
Commandes manuelles volontairement : rester maître de ce qui est conservé, éviter que tout finisse dans les notes. Discipline > automatisation fragile.
