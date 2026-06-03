---
updated: 03-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
03-06-2026 — Création du global Payload `announcement-bar` (barre d'annonce, segments text/link, `text` localisé, drafts, RowLabel admin). PR ouverte sur `feat/announce-bar-global`. Plus tôt le même jour : réduction `adminLabel` du picker Edits + suppression search navbar / code mort (PR mergée).

## État du projet
- **Announce bar** : global `announcement-bar` créé (`apps/cms/src/globals/AnnouncementBar.ts`) — `messages` (1-3) → `segments` (`type: text|link`, `text` localisé, champ `link` requis si lien). Composant admin `AnnouncementMessageRowLabel` (phrase + liens soulignés). Scope du ticket = CMS uniquement, **aucun câblage front**. Typecheck vert, types + importMap régénérés. PR ouverte par Rémy.
- **Picker Edits** : `adminLabel` réduit à `title | brand | sku | subcat > cat`. Migration backfill via `payload.update`. **À rejouer** (`migrate:down && migrate`). Branche `feat/edits-product-picker-admin-label`, rien commité.
- **Search page** : flag `dev_search_page` retiré du code, route `/search` inconditionnelle, search navbar + `Menu/` + `FeedPageNavbar/` supprimés. PR mergée. Flag à archiver côté PostHog.
- **Flickering trading plan** : fix codé, pas commité ni vérifié runtime. Contenu CMS prod trading plan à remplir + flag `dev_payload_trading_plan` à activer.
- Migration Content API v2.1 → Merchant API avant le 18 août 2026. Page builder blocks : plan approuvé, prochain gros chantier.

## Faits récents importants
- cms consomme le **`dist`** de `packages/shared` → rebuild shared après toute modif (sinon `isPopulated is not a function` / types faux). Piège récurrent.
- Types Payload d'un array ne sont **pas** des unions discriminées (segment `link` → `url` reste optionnel) → narrowing au rendu via `createAsserter` (`packages/shared/src/payload/guard.ts`), **pas de nouveau Zod** (le Zod legacy `tradingPlanSchema` a vocation à être remplacé par l'asserter).
- Array Payload : pas de label par nom de champ → composant `RowLabel` (`useRowLabel<T>()`). Ajout d'un composant par chemin → régénérer l'importMap.
- `validate` d'un champ : typer `siblingData` inline (sinon implicit any en strict).
- Recherche `relationship` Payload = `like` non ancré → scan complet, index n'aide pas.
- Migration : `payload.update` revalide tout le doc → échoue sur data invalide. OK mongo standalone (local), PAS replica set (prod).

## Décisions actives
- Announce bar : segments structurés, array `segments` non-localisé + `text` localisé, lien = URL texte libre (champ `link`), dynamique hors CMS, pas de Zod, RowLabel niveau message uniquement.
- `adminLabel` = `title | brand | sku | subcat > cat` (abandon recherche par concern/skinType/status).
- Collectibles = cas à part (`OLIS_LAB_COLLECTIBLES_BRAND_ID`), produits invalides → log+skip (up et down).

## Prochaines étapes
- Announce bar : vérif runtime admin ; tickets de suivi pour câbler les 2 TopBanner (Next + legacy) + fusion messages dynamiques free-shipping ; optionnel `'announcement-bar'` dans le plugin `translator`.
- Rejouer la migration adminLabel puis mesurer la recherche ; sinon scan `like` (text index Mongo).
- Réconcilier `migrate:status` ; commiter la branche picker.
- Archiver flag `dev_search_page` (PostHog) ; vérif runtime + commit fix flickering ; contenu CMS trading plan prod + flag.
- Caveat prod : `payload.update` revalide tout le doc → assainir la data ou écriture directe doc+versions.
