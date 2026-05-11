---
updated: 11-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
11-05-2026 — Plan d'automatisation des feeds XML rédigé (4 options analysées), recommandation CRON + admin button retenue.

## Etat du projet
- Feed GMC : opérationnel, route `GET /sitemap/gmc-feed?lang=fr`, clé S3 `feeds/gmc-${lang}.xml`
- Feed Klaviyo : opérationnel, route `GET /sitemap/klaviyo-feed?lang=fr`, clé S3 `feeds/klaviyo-${lang}.xml`
- Feed Meta : pas encore implémenté
- Automatisation feeds : plan rédigé, pas encore implémenté
- Bug S3 double déclaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 août 2026

## Faits recents importants
- CRON (node-cron) retenu comme trigger primaire — suffisant pour la cadence de pull Google (1x/jour)
- Payload `afterOperation` hook écarté pour l'instant : risque over-trigger + appel BigBlue à chaque save
- EventBridge écarté : overkill pour l'architecture actuelle (non stateless)
- Auth sur `/sitemap/*` identifiée comme prérequis sécurité avant mise en prod du CRON
- Bug S3 + auth = deux bloquants à résoudre avant toute automatisation utile

## Decisions actives
- Trigger automatisation : CRON node-cron (primaire) + admin button Payload (fallback manuel)
- Option A (Payload hook) = évolution future si fraîcheur temps-réel devient un besoin business
- Shared secret header sur `/sitemap/*` requis avant prod
- Pattern langue feeds : `?lang=fr|en`, clé S3 `feeds/{platform}-${lang}.xml`

## Prochaines etapes
- Résoudre bug S3 double déclaration XML (priorité #1, bloquant)
- Ajouter shared secret header sur les endpoints feed (sécurité)
- Implémenter CRON node-cron dans server Express (deux feeds)
- Ajouter bouton admin Payload "Regenerate feeds"
- Implémenter feed Meta (`feeds/meta-${lang}.xml`)
- Valider GMC + Klaviyo dans leurs sandboxes respectifs
