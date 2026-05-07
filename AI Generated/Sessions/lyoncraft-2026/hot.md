---
updated: 07-05-2026
project: lyoncraft-2026
tags: [meta, hot-cache]
---

# Hot Cache — lyoncraft-2026

## Derniere mise a jour
07-05-2026 — Bug CI GitHub Actions resolu : pnpm v10 bloquait les build scripts en environnement vierge, fixe en pinnant pnpm a v9 dans le workflow.

## Etat du projet
- Build CI / deploy GitHub Pages fonctionnel
- Slides en cours de finalisation (contenu, placeholders a remplacer)

## Faits recents importants
- pnpm v10 introduit un systeme d'approbation strict des build scripts (`ERR_PNPM_IGNORED_BUILDS`) qui ne fonctionne pas en CI meme avec `onlyBuiltDependencies` dans package.json
- Solution : `version: 9` dans `.github/workflows/deploy.yml` — pnpm v9 n'a pas ce systeme, le lockfile format `9.0` est compatible v9/v10
- Les tentatives `--no-frozen-lockfile` et `settings.onlyBuiltDependencies` dans le lockfile n'ont pas fonctionne

## Decisions actives
- pnpm v9 en CI, pnpm v10 en local (coexistence sans friction)
- `onlyBuiltDependencies` reste dans package.json pour la securite locale

## Prochaines etapes
- Remplacer placeholder KicksFolio (slide 19) par vraies screenshots
- Remplacer `{PLACEHOLDER_POST_LINKEDIN}` (slide 22) par le vrai texte
- Verifier rendu visuel complet avec `pnpm run dev`
- Chronometrer chaque acte (objectif : 45 min total)
- Decider si slide "Splash" dans l'Acte 3
