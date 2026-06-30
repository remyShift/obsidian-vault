---
project: olis-lab
type: chantier
tags:
  - olis-lab
date: 21-04-2026
---

## Migration Merchant API — Cheat Sheet

**But** : ce qu'il faut avoir en tête en permanence sur ce sujet. Pas un plan, pas une décision. Juste les faits utiles.

### Dates

- **18 août 2026** : sunset Content API v2.1. Date dure, source officielle Google Merchant Help.
- **28 février 2026** : v1beta de la Merchant API déjà shutdown (pas concerné, on part direct sur v1).
- **~4 mois restants** à partir du 21 avril 2026.

### Package npm

- **À installer** : `@googleapis/merchantapi@17.3.0` (nouvelle API, pattern `google.merchantapi('v1').products.insert({…})`).
- **À remplacer** : `googleapis@122.0.0` utilisé aujourd'hui pour `google.content('v2.1')`.
- Alternative plus moderne mais pre-1.0 : `@google-shopping/products@0.8.0` et `@google-shopping/*` pour chaque sub-API. À éviter pour l'instant (risque d'instabilité).

### Breaking changes à connaître par cœur

| Élément | Avant (Content v2.1) | Après (Merchant v1) |
|---|---|---|
| Host | `shoppingcontent.googleapis.com` | `merchantapi.googleapis.com` |
| ID produit | `online:en:GB:SKU` | `en~GB~SKU` (tildes, pas de channel) |
| Prix | `{ value: "29.90", currency: "EUR" }` | `{ amountMicros: 29900000, currencyCode: "EUR" }` |
| Update | `products.update` | `productInputs.patch` |
| Insert | `products.insert` | `productInputs.insert` |
| Page size max | 250 | 1000 |
| customBatch | supporté | **supprimé** (on n'en utilise pas, donc OK) |

### Étape préalable obligatoire

**Developer Registration** : avant tout appel, linker notre Merchant Center au projet GCP.

```
POST /accounts/v1/accounts/{ACCOUNT_ID}/developerRegistration:registerGcp
```

One-shot. À faire même avant de tester.

### Sandbox (test account)

```
POST https://merchantapi.googleapis.com/accounts/v1/accounts/{ACCOUNT_ID}:createTestAccount
{
  "account_name": "Olis Lab Test",
  "time_zone": { "id": "Europe/Paris" },
  "language_code": "fr-FR"
}
```

- Max 5 test accounts par Google Account.
- Produits **jamais publiés** sur Google Search/Shopping.
- Offres **auto-approuvées** (pas besoin de homepage claiming).
- Quota identique à prod.
- Switch test/prod = juste changer l'account ID dans le param `parent`.
- ⚠️ "Cannot perform registration for test accounts" : la Developer Registration ne peut probablement pas se faire sur un test account. À vérifier en pratique.

### Sub-APIs disponibles

La Merchant API est modulaire. On n'utilise qu'une poignée :

- **Products** : ce qu'on fait aujourd'hui (insert/update/delete/get/list).
- **DataSources** : clef pour l'option B (XML feed hébergé). Méthodes : `create`, `fetch`, `patch`, `delete`, + `fileUploads.get` pour statut.
- **Accounts** : Developer Registration, test accounts.
- **Inventories** : local / regional inventory (pas concerné pour nous).
- **Reports**, **Reviews**, **Promotions**, **Notifications**, **Conversions** : pas concerné MVP.

### DataSources : ce qu'on sait et ce qu'on ne sait pas

**Ce qui est confirmé** :

- 7 types : primary, supplemental, local inventory, regional inventory, promotion, product review, merchant review.
- Méthodes CRUD + `fetch` manuel + `fileUploads.get` pour le statut.
- Supplemental doit être linké à un primary.

**Ce qui n'est pas documenté publiquement** (à valider par POC) :

- Formats exacts supportés (XML ? TSV ? JSON ?).
- Fréquence minimum et configuration du schedule.
- Auth du feed hébergé (URL publique obligatoire ? basic auth ? signed URLs S3 ?).
- Limites de taille fichier.
- Coexistence DataSource + push API sur le même compte.

### Liens utiles

- [Migration overview (Content → Merchant)](https://developers.google.com/merchant/api/guides/compatibility/overview)
- [Test accounts setup](https://developers.google.com/merchant/api/guides/accounts/test-accounts)
- [REST reference](https://developers.google.com/merchant/api/reference/rest)
- [DataSources guide (superficielle)](https://developers.google.com/merchant/api/guides/data-sources/overview)
- [Sunset announcement (Merchant Center Help)](https://support.google.com/merchants/answer/16493611?hl=en)

### Notre code actuel, repères rapides

Tout le flow GMC tient dans ces fichiers (pinned à commit `f2b17c6`) :

- [googleMerchantUtils.js](https://github.com/olis-lab/web-app/blob/f2b17c6f628d33ca1c8fe8fc68df72b077f792d3/apps/server/utils/merchants/googleMerchantUtils.js) : toute la logique Content API (~700 lignes).
- [GoogleMerchantAdapter.js](https://github.com/olis-lab/web-app/blob/f2b17c6f628d33ca1c8fe8fc68df72b077f792d3/apps/server/adapters/merchants/GoogleMerchantAdapter.js) : orchestration.
- [MerchantsService.js](https://github.com/olis-lab/web-app/blob/f2b17c6f628d33ca1c8fe8fc68df72b077f792d3/apps/server/services/merchants/MerchantsService.js) : multi-merchant dispatch.
- [MerchantsController.js](https://github.com/olis-lab/web-app/blob/f2b17c6f628d33ca1c8fe8fc68df72b077f792d3/apps/server/controllers/merchants/MerchantsController.js) : HTTP handlers.
- [merchantsRouter.js](https://github.com/olis-lab/web-app/blob/f2b17c6f628d33ca1c8fe8fc68df72b077f792d3/apps/server/routes/merchants/merchantsRouter.js) : 8 endpoints POST.

9 appels API Google seulement, tous sur `products.*`. Pas de `productstatuses`, pas d'`accountstatuses`. La migration touche uniquement la Products sub-API.

### Ce qu'il manque encore (à confirmer en session Diego)

- Date cible de ship confirmée par Michele (entre aujourd'hui et le 18 août).
- Décision Option A (push 1:1) vs Option B (XML feed + DataSources) pour le catalogue.
- Décision Option 1/2/3/4 pour le stock.
- Plafond de rate limit Bigblue (contact à identifier).
- Confirmation fiabilité du webhook `INVENTORY_UPDATE` Bigblue.
- Accès AWS confirmé + budget S3/CloudFront validé.
