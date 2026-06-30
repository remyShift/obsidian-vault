---
updated: 12-05-2026
project: lyoncraft-2026
tags: [hot-cache]
---

# Hot Cache — lyoncraft-2026

## Derniere mise a jour
12-05-2026 — Systeme dark/light theme complet implemente : CSS variables centralisees, bloc light theme, composants migres, toggle natif Slidev active.

## Etat du projet
- Build CI / deploy GitHub Pages fonctionnel
- Theming dark/light operationnel avec toggle natif Slidev (bouton soleil/lune dans la barre)
- Slides en cours de finalisation (contenu, placeholders a remplacer)

## Faits recents importants
- pnpm v10 bloquait les build scripts en CI — fixe en pinnant pnpm v9 dans le workflow
- `colorSchema: auto` dans `slides.md` active le toggle dark/light natif Slidev — rien d'autre a coder
- Slidev ajoute la classe `dark` sur `html`, donc `html:not(.dark)` suffit pour le theme light
- Variables renommees de `-dark` vers `-bg` (ex: `--color-door-green-bg`) pour clarte semantique
- `color-mix(in srgb, var(--color) X%, transparent)` remplace les rgba hardcodes dans les composants
- `--text-context` est une variable semantique pour la couleur cyan du SkillCompare (intentionnelle)

## Decisions actives
- pnpm v9 en CI, pnpm v10 en local (coexistence sans friction)
- `onlyBuiltDependencies` reste dans package.json pour la securite locale
- Couleurs de props dynamiques de `Door.vue` maintenues hardcodees dans les slides (couleurs de contenu, pas de theme)

## Prochaines etapes
- Remplacer placeholder KicksFolio (slide 19) par vraies screenshots
- Remplacer `{PLACEHOLDER_POST_LINKEDIN}` (slide 22) par le vrai texte
- Verifier rendu visuel complet light + dark sur toutes les slides (`pnpm run dev`)
- Chronometrer chaque acte (objectif : 45 min total)
- Decider si slide "Splash" dans l'Acte 3
