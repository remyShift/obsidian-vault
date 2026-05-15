---
tags: [payload, testing, mongodb, integration-tests]
---

# Payload CMS — Stratégie de tests

## Contrainte principale

Payload ne recommande pas `mongodb-memory-server`. Son adapter Mongoose a un lifecycle interne (init plugins, enregistrement collections, index) qui présuppose une vraie connexion MongoDB. Les in-memory servers cassent ce lifecycle silencieusement.

## Pattern infra recommandé

DB dédiée aux tests via env var :

```
DATABASE_URL=mongodb://127.0.0.1/nom_projet_test
```

Même instance MongoDB locale que dev, base séparée. Cleanup par tracking d'IDs en `afterEach`, pas de flush complet (trop lent, casse l'isolation inter-suites).

## Seed

Via Local API uniquement : `payload.create(...)`. Pas de raw MongoDB, pas de migration files. Fonctions de seed locales, une par suite, auto-contenues.

## Priorités de test

1. **Tests unit (transformateurs)** : zéro infra requise. Fonctions pures. Priorité haute car une corruption silencieuse peut toucher la legacy DB si bug (ex : `transformPayloadProductToLegacy`).

2. **Tests d'intégration** : hooks (`computeCartSnapshot`, contraintes custom comme `uniquePerCategory`), endpoints sync. Requièrent la DB dédiée.

3. **E2E Playwright** : déprioritisé — trop fragile pour la valeur sur un CMS admin.

## Éléments non couverts par la doc officielle

Payload n'a pas de documentation officielle sur le testing pour les app developers. Les guides existants couvrent la contribution au repo open-source (CONTRIBUTING.md) et le développement de plugins, pas l'usage en production.

## Sources

- Session olis-lab 15/05/2026 (exploration CMS 13 collections, 27 scénarios Gherkin, validation via Discord communauté Payload)
- Payload docs : Local API, plugin development guide (context7)
