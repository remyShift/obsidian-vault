---
updated: 03-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
03-06-2026 — Réduction de `adminLabel` (picker Edits) à `title | brand | sku | subcat > cat` pour accélérer la recherche. Plus tôt : suppression du flag `dev_search_page` + code mort en cascade (PR mergée).

## État du projet
- **Picker Edits (Option A)** : `adminLabel` réduit à `title | brand | sku | subcat > cat` (concerns/skinTypes/status retirés). Migration backfill via `payload.update` (peuple doc + version). Tests verts. **À rejouer** (`migrate:down && migrate`) pour appliquer aux produits existants. Branche `feat/edits-product-picker-admin-label`, rien commité.
- **Search page** : flag `dev_search_page` retiré du code, route `/search` inconditionnelle, ancienne search navbar + `Menu/` + `FeedPageNavbar/` supprimés (code mort). PR mergée. Reste à archiver le flag côté PostHog dashboard.
- **Flickering trading plan** : fix codé (useTradingPlanQuery + Home + Shop), pas commité ni vérifié runtime.
- Trading plan CMS : PR mergée ; contenu prod à remplir + flag `dev_payload_trading_plan` à activer.
- Migration Content API v2.1 → Merchant API avant le 18 août 2026. Page builder blocks : plan approuvé, prochain gros chantier.

## Faits récents importants
- cms consomme le **`dist`** de `packages/shared`, pas le `src` → rebuild shared après toute modif (sinon `isPopulated is not a function` / types faux). Piège récurrent.
- Recherche `relationship` Payload = `like` (regex non ancrée) → scan complet, index n'aide pas. Raccourcir le label aide à la marge seulement.
- Migration : `payload.update` revalide tout le doc → échoue sur data invalide (tags/howToUse manquants). try/catch skip+log en `up()` ET `down()`. OK mongo standalone (local), PAS replica set (prod, transaction abortée).
- `payload.db.updateOne` n'écrit pas les versions ; avec drafts l'admin lit la version `latest` → besoin de `payload.update`.

## Décisions actives
- `adminLabel` = `title | brand | sku | subcat > cat`. Abandon assumé de la recherche par concern/skinType/status (perf > exhaustivité du ticket).
- Collectibles = cas à part (ID `OLIS_LAB_COLLECTIBLES_BRAND_ID`), schéma zod base. Produits invalides → log+skip (up et down).

## Prochaines étapes
- Rejouer la migration puis mesurer la recherche ; sinon attaquer le scan `like` (text index Mongo).
- Caveat prod (validation `payload.update`) : assainir la data ou écriture directe doc+versions.
- Réconcilier `migrate:status` après runs échoués ; commiter la branche picker.
- Archiver flag `dev_search_page` (PostHog dashboard) ; vérif runtime + commit fix flickering ; contenu CMS trading plan prod + flag.
