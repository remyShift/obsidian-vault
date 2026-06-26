---
updated: 26-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
26-06-2026 — Review de Diego traitée sur la PR #1853 (unlock sku/ean/slug) : 5 findings triés, corrigés (EAN éditable en draft, Generate SKU masqué si Live, `find` par type, classes Payload réutilisées, commentaire `@experimental`). Réponse EN à poster, à vérifier en live.

## État du projet
- **PR #1853 (`refactor/unlock-availability-ean-sku-fields`, TASK-1125, OUVERTE)** : composant partagé `LockableTextField` (sku+ean) sur FieldLabel/TextInput/Button natifs ; lock = `useState(_status === 'published')` éphémère, relock au publish, save draft no-op ; Generate SKU via `computeProductSku` (`field.custom.slugify` + `slugifyHandler` natif, zéro endpoint), **masqué si `status === 'Live'`** (SKU = clé BigBlue). Slug : `slugField` natif gardé, sorti de la sidebar, placé sous l'identité. `CreateOnlyTextField` supprimé. Fix accents SKU (`stripDiacritics` partagé). Review IA de Diego traitée (fixes commités côté working tree, **pas encore push/commit décidé**). tsc+eslint+31 unit verts. **Pas vérifié en live** (env Node cassé localement).
- Autres : navbar PR #1839 (`resolveNavLabel` partagé, non commité) ; slug PR #1850 (`5a283e721`, fix CI non commité, rebuild conteneur à faire) ; top banner (Option 3), bulk-add (Approche B), TASK-1115 SKU (meeting), RFC RBAC (Notion), checkout/footer.

## Faits récents importants
- Repo GitHub = `olis-lab/web-app`. Reviews IA de Diego = **issue comments** (`gh api repos/olis-lab/web-app/issues/<n>/comments`), signées "🤖 conducted by Claude".
- Deux statuts produit : `_status` (Payload draft/published, sert au lock par défaut) vs `status` (commercial `Live`/`Staged`/`Offline`, sert au blocage regen SKU).
- Classes scss du slug natif (`.slug-field-component .label-wrapper`, `.lock-button`) sont dans le bundle `@payloadcms/ui` → réutilisables sur un composant custom ; un `.scss` local importé dans un composant client est refusé par Next hors layout.
- Lock du SlugField natif = `useState` client non persisté ; `slugifyHandler` lit `custom.slugify` de n'importe quel champ. `SlugField` est `@experimental`.

## Décisions actives
- Lock par défaut basé sur `_status === 'published'` (draft/neuf éditable, publié verrouillé). SKU non régénérable quand `status === 'Live'` (Generate masqué) ; pas de migration des SKU accentués (réécrire = risque out-of-stock BigBlue).
- Garder `LockableTextField` (fork contenu du SlugField `@experimental`, visibilité via commentaire d'en-tête) ; réutiliser composants/classes/props Payload plutôt que custom.

## Prochaines étapes
- Poster la réponse EN à Diego (PR #1853) ; vérif visuelle dans l'admin ; commit + push des fichiers (`LockableTextField.tsx`, `Products.ts`).
- Trancher : sur produit Live, geler totalement le SKU (bloquer aussi l'Unlock) ou juste masquer Generate (actuel).
- Optionnel selon Diego : test unitaire sur la logique de relock.
- Reprendre navbar #1839 / slug #1850 / banner / bulk-add / SKU / RFC RBAC.
