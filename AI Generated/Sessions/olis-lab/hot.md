---
updated: 04-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
04-05-2026 — Recherche et plan d'architecture XML pour la distribution catalogue (GMC, Meta, Klaviyo).

## État du projet
- Phase architecture : structure XML des feeds définie, en attente d'implémentation et POC sandbox
- Migration Content API v2.1 → Merchant API avant le 18 août 2026
- Précédente session : migration plugin SEO (`@payloadcms/plugin-seo` → `@payload-enchants/seo`) bouclée

## Faits récents importants
- GMC + Meta partagent le format RSS 2.0 (`xmlns:g`), seule différence : `in_stock` vs `in stock` pour l'availability
- Klaviyo requiert un format **flat** (sans namespace, prix décimal pur) — incompatible RSS 2.0
- Architecture finale : 3 fichiers XML distincts (gmc, meta, klaviyo) hébergés sur S3 + CloudFront
- Le lien `product-review-feeds/sample` de Google = avis clients, pas catalogue — hors sujet

## Décisions actives
- 3 feeds distincts depuis une source Payload unique (pas de feed universel possible)
- S3 + CloudFront pour l'hébergement des feeds
- POC sandbox requis avant suppression du code Content API v2.1

## Prochaines étapes
- Implémenter le service `feedGenerator` (Payload → XML x3)
- Configurer S3 + CloudFront
- POC sandbox : GMC DataSources + Meta + Klaviyo
- Valider critères go/no-go avant de virer l'ancien code
