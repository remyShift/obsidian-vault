---
updated: 03-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
03-06-2026 — Global `announcement-bar` créé (CMS + admin, PR ouverte sur `feat/announce-bar-global`). Plan complet validé pour un futur global `navbar` (planif, pas d'implémentation). Plus tôt : picker Edits `adminLabel` raccourci, flag `dev_search_page` + code mort supprimés (PR mergée).

## État du projet
- **Announce bar (Option segments)** : global `apps/cms/src/globals/AnnouncementBar.ts` (messages 1-3 → segments text|link, `text` localisé, `link` requis si type=link), RowLabel admin avec soulignement des liens. Enregistré + types régénérés + importMap. Typecheck CMS/shared verts. PR ouverte. Câblage front (2 TopBanner) = tickets de suivi.
- **Navbar (global Payload)** : plan complet validé, sauvegardé dans `~/.claude/plans/j-aimerais-cr-er-donc-une-noble-pumpkin.md`. **Pas encore implémenté.** Structure Hybride (top-level figé + sections en array), liens explicites + `app`, fin du scan produits, `validate` léger sur `path`, tout localisé CMS. Scope = global seul, câblage plus tard.
- **Picker Edits** : `adminLabel` = `title | brand | sku | subcat > cat`. Tests verts. Migration **à rejouer** (`migrate:down && migrate`). Branche `feat/edits-product-picker-admin-label` non commitée.
- **Search page** : flag `dev_search_page` retiré du code, route `/search` inconditionnelle, ancienne search navbar + `Menu/` + `FeedPageNavbar/` supprimés. PR mergée. Reste à archiver le flag côté PostHog.
- **Flickering trading plan** : fix codé, pas commité ni vérifié runtime.
- Migration Content API v2.1 → Merchant API avant le 18 août 2026. Page builder blocks : plan approuvé, prochain gros chantier.

## Faits récents importants
- cms consomme le **`dist`** de `packages/shared`, pas le `src` → rebuild shared après toute modif (sinon `isPopulated is not a function` / types faux). Piège récurrent.
- Types Payload pour array de segments **pas** une union discriminée → narrowing au render via `createAsserter` (`packages/shared/src/payload/guard.ts`), pas de Zod de lecture.
- Array Payload sans label lisible → composant `RowLabel` (`useRowLabel<T>()`). Composant admin par chemin `@/...` → régénérer l'importMap (`generate:importmap`).
- Navbar : top-level (`shop`/`your-lab`/`learn`/`brands`) codé en dur dans l'UI (`TNavItemType`) → figé côté CMS aussi. Champ `app` route entre next/legacy pendant la migration. Pattern global à suivre : `TradingPlan.ts`.
- `validate` Payload : `siblingData` implicite `any` en strict → typer inline (pattern `requiredUnlessBrand` dans `Products.ts`). Piège shell : `rm` aliasé `-i`, utiliser `/bin/rm -f`.

## Décisions actives
- Navbar : structure Hybride, top-level NON éditable cette itération (arbitrage Michele : ça retarde), liens explicites + `app`, fin assumée du scan produits (saisie manuelle content team — à confirmer Michele), `validate` léger sur `path`.
- Announce bar : segments structurés (pas Lexical), `link` en URL texte libre, contenu dynamique free-shipping hors CMS, pas de Zod partagé.
- Picker : `adminLabel = title|brand|sku|subcat>cat`, abandon recherche par concern/skinType/status (perf > exhaustivité).

## Prochaines étapes
- Navbar : implémenter le global (créer `Navbar.ts`, enregistrer, régénérer/sync types) ; confirmer impact produit « fin scan produits » avec Michele ; re-poster le fil commentaires sur la bonne task.
- Announce bar : vérif runtime admin + lecture API ; tickets de suivi câblage TopBanner next + legacy.
- Picker : rejouer la migration + mesurer la recherche (sinon scan `like` / text index Mongo) ; commiter la branche.
- Archiver flag `dev_search_page` (PostHog) ; vérif runtime + commit fix flickering ; contenu CMS trading plan prod + flag.
