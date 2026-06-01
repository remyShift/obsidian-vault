---
updated: 01-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
01-06-2026 — Composant `SearchableRelationshipField` (picker relationship multi-champs générique) créé en TDD et branché sur Edits.products. Checks statiques verts, test UI réel restant.

## État du projet
- Picker Edits : composant générique livré (logique pure 19/19 verts, typecheck/lint clean, importMap régénéré). Pas encore vérifié en runtime (dev server + Mongo + admin).
- Trading plan CMS -> web_client : PR mergée ; contenu CMS prod à remplir + flag PostHog `dev_payload_trading_plan` à activer.
- Feed GMC + Klaviyo : opérationnels. Feed Meta : pas implémenté.
- Bug S3 double déclaration XML : toujours ouvert.
- Migration Content API v2.1 -> Merchant API avant le 18 août 2026.
- Page builder blocks : plan approuvé, prochain gros chantier.

## Faits récents importants
- Limite Payload : `relationship` recherche ET affiche via `useAsTitle` cible (Products = `sku`). Pas séparable nativement.
- Virtual field (afterRead) = pas en DB donc **non searchable** → fausse piste.
- `clientProps` Payload v3 doivent être sérialisables → rendu riche déclaratif, pas de fonction.
- `qs-esm`/`lodash` absents des deps cms (pnpm strict) → helpers maison (`stringifyQuery`, getter de chemin).
- ReactSelect adapter Payload n'expose pas `formatOptionLabel` → override via `components={{ Option }}` (adapter spread `...components` en dernier).
- Tests unitaires cms : `tests/unit/**/*.test.ts`, script `test:unit` (vitest).
- `STATUS_OPTIONS = ['Live','Staged','Offline']` (Products + Edits).

## Décisions actives
- Picker : composant custom gardant le `relationship` natif (persiste les IDs), **zéro champ ajouté, zéro reprocessing**. Rejet de l'option `adminLabel` persisté et du virtual field.
- Composant générique + config déclarative (titleField/subtitleFields/badge), réutilisable sur d'autres collections.
- Chips au `label` string par défaut (pas d'override MultiValueLabel) pour limiter le couplage react-select.
- Trading plan : composants dumb (props), pages gèrent CMS + fallback i18n, flag explicite dans la page.

## Prochaines étapes
- Tester le picker en réel : dev server + Mongo, doc Edits, recherche marque/sku/concern, save/reload/réordonnancement hasMany.
- Vérifier forme requêtes REST acceptée + `like` sur `title` localisé.
- Optionnel : override `MultiValueLabel` si badge voulu dans les chips.
- Remplir trading plan CMS prod (EN/FR) + activer flag PostHog une fois validé.
- Page builder blocks (gros chantier).
