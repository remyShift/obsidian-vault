---
updated: 06-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
06-05-2026 — Feed GMC XML implémenté dans xmlController, bug double déclaration XML sur S3 non résolu.

## Etat du projet
- Feed GMC : `generateGmcFeed` implémenté, route `GET /sitemap/gmc-feed` exposée, upload sur `feeds/gmc.xml`
- Bug actif : double déclaration XML (`<?xml ...?><?xml ...?>`) sur le fichier S3 — fichier illisible par parser XML
- SearchPage : 5 onglets opérationnels, plan search refactor soumis à l'équipe
- Migration Content API v2.1 → Merchant API avant le 18 août 2026

## Faits recents importants
- `getAllInventoryFromBigblue()` retourne `'in stock'` (espaces) → conversion en `'in_stock'` (underscores) nécessaire pour GMC XML, faite dans l'implémentation
- `.limit(1)` a été ajouté par le linter sur la query Mongo dans `generateGmcFeed` — à retirer avant prod
- `invalidateCloudFrontCache` importé et utilisé dans `updateXml` par le linter — l'import existe déjà dans s3Utils
- Route montée sur `/sitemap` dans server.js → endpoint complet : `GET /sitemap/gmc-feed`
- Clé S3 : `feeds/gmc.xml`, même bucket que le sitemap

## Decisions actives
- Comportement strict : throw si traduction FR manquante (pas de skip silencieux)
- `g:price` = originalPrice si discount, `g:sale_price` = prix calculé final
- `g:google_product_category` hardcodée `Health & Beauty > Skin Care`
- `g:product_type` = `translations.fr.categories` en complément
- 3 feeds distincts (gmc, meta, klaviyo) depuis une source Payload unique

## Prochaines etapes
- Resoudre le bug de double declaration XML sur S3 (priorite immediate)
- Retirer `.limit(1)` dans `generateGmcFeed`
- Valider le feed dans GMC Sandbox (DataSources)
- Implementer feed Meta (`feeds/meta.xml`) et Klaviyo (`feeds/klaviyo.xml`)
