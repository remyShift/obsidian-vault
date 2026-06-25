---
updated: 25-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
25-06-2026 — Feature unlock champs identité Products (PR ouverte, branche `refactor/unlock-availability-ean-sku-fields`) : SKU/EAN sur composant partagé `LockableTextField` (lock/unlock + Generate SKU), slug remonté hors sidebar, fix bug accents SKU. (Plus tôt aujourd'hui : fix navbar CMS labels PR #1839 + fix slug PR #1850.)

## État du projet
- **Feature unlock sku/ean/slug (PR ouverte, branche `refactor/unlock-availability-ean-sku-fields`)** : `LockableTextField` (`apps/cms/src/components/`) partagé sku+ean (verrouillé à l'ouverture, bouton Unlock, bouton Generate pour le SKU via `canGenerate`). `computeProductSku` (`hooks/sku/`) branché sur `field.custom.slugify` → réutilise `slugifyHandler` natif, zéro endpoint. Slug : `slugField` natif gardé, sorti de la sidebar (`delete field.admin.position`), placé sous l'identité. `CreateOnlyTextField` supprimé. Lock = `useState` éphémère (non persisté), relock au publish via `useFormProcessing`+`_status`. tsc+eslint clean, 31 tests unit verts. **Pas vérifié en live.**
- **Navbar CMS labels (PR #1839)** : `resolveNavLabel` fonction pure partagée desktop/mobile. 3 fichiers non commités.
- **Slug fix (PR #1850, `5a283e721`)** : génération en hooks collection `beforeValidate`. Fix CI (nom brand unique) non commité.
- **Top banner (planif)** : reco Option 3. **Bulk-add Products→Edit (planif)** : Approche B. **TASK-1115 SKU** : auto-regen revertée, meeting. **RFC RBAC** : doc EN à coller dans Notion. Chantiers checkout/footer en attente.

## Faits récents importants
- Lock SlugField natif = `useState(true)` **client non persisté** → pas de field de lock, pas de hook serveur "lock au publish".
- `slugifyHandler` lit `field.custom.slugify` de **n'importe quel** champ → bouton Generate réutilisable (SKU) sans endpoint custom.
- `sanitizeBrandSection` ne retirait pas les accents (bug `OLIS-MIMÉT…`) → `stripDiacritics` extrait de `@/lib/slugify`, partagé. Fix bouton + auto-gen.
- `Button` Payload : prop `margin={false}` enlève le `margin-block` par défaut (sinon gros gap vertical). CSS global d'un composant client non bundlé par Next → style flex inline.
- Slug = hook collection `beforeValidate` (jamais hook de champ : race validation parallèle → 400). next-intl non typé strict dans `apps/web`. Bot Devin : sévérité 🟡/🚩, tri humain.
- Env local : shell Node 26 vs repo pin 20.19, `mise exec` tombe sur node Homebrew 25 cassé → `generate:importmap` KO en local. Index Mongo `unique` non appliqué en local mais en CI.

## Décisions actives
- unlock champs : composant partagé `LockableTextField` sur FieldLabel/TextInput/Button natifs ; SKU regen via tuyau slug natif (`computeProductSku`, renommé depuis `slugifyProductSku`) ; lock éphémère, relock au publish, save draft = no-op ; EAN verrouillé même en draft ; pas de test sur `computeProductSku` (Rémy) mais tests `buildSku` gardés.
- Slug : garder `slugField`, juste repositionner. Navbar : `resolveNavLabel` partagé. Slug gen : collection `beforeValidate`, checkbox neutralisée.

## Prochaines étapes
- Vérifier en live le rendu + comportement unlock/Generate/relock dans le CMS ; suivre la PR `refactor/unlock-availability-ean-sku-fields`.
- Commit fix navbar (PR #1839, 3 fichiers) ; commit+push fix CI slug → finaliser PR #1850 ; rebuild conteneur CMS.
- Trancher migration subcategory. Reprendre banner / bulk-add / SKU / RFC RBAC.
