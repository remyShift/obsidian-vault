---
tags:
  - Perso
---

Backlog des frictions du harnais Claude (CLAUDE.md, skills, commandes, hooks, structure du vault). Alimenté **automatiquement** en fin de session par la capture passive (règle dans le CLAUDE.md du vault), et traité manuellement par `/improve`.

Format des entrées (append-only, ne pas réécrire les lignes existantes) :

`- [ ] [observation|explicite] description courte - DD-MM-YYYY`

- `[observation]` : friction détectée seule par Claude en fin de session.
- `[explicite]` : idée ajoutée à la main (via `/improve ajouter <description>`).

Une fois une amélioration appliquée par `/improve`, sa ligne est cochée `[x]` avec la date, jamais supprimée (registre de suivi).

---

## Frictions

<!-- les entrées s'ajoutent ici, plus récent en bas -->
- [ ] [observation] Sous-agent Explore a affirmé avec aplomb l'existence de fichiers (read CRA) en réalité absents du working tree local (16 commits de retard) ; vérité obtenue seulement en vérifiant `origin/develop`. Penser à instruire les sous-agents Explore de vérifier l'état git (local vs origin) quand le contexte mentionne un merge récent. - 15-06-2026
- [ ] [observation] L'outil Edit refuse d'éditer un fichier déjà lu via `Bash cat`/`git show` et exige un `Read` préalable — re-lecture redondante (SiteHeader, hot.md cette session). - 15-06-2026
- [ ] [friction] Chaque appel Bash dans olis-lab doit re-sourcer nvm + `nvm use 20.19.6` (état shell non persistant entre tool calls) - répété 10+ fois - 16-06-2026
- [ ] [friction] ExitPlanMode a échoué une fois sur "Tool permission stream closed before response received" (glitch harnais) - 16-06-2026
