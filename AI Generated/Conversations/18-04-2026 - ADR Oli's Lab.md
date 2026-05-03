---
source: ai
---

# 18-04-2026 - ADR Oli's Lab

**Domaine :** Code
**Statut :** Synthèse brute -> à intégrer dans les notes permanentes si pertinent

---

## Contexte

Conversation autour de la pratique des Architecture Decision Records (ADR) : ce que c'est, pourquoi c'est utile, et application concrète sur le projet Oli's Lab. La conversation a abouti à la génération de 5 fichiers Markdown prêts à déposer dans le repo.

---

## Points clés

- Un ADR est un document court qui capture une décision technique : contexte, décision prise, alternatives écartées, conséquences assumées
- Le format standard (Nygard) comporte 5 champs : Titre, Statut, Contexte, Décision, Conséquences
- Les ADR se stockent dans `docs/adr/` du repo, numérotés séquentiellement, en Markdown
- Écrire un ADR force à articuler le problème avant de toucher au code - effet secondaire positif pour quelqu'un qui a tendance à implémenter trop vite
- Les ADR rétrospectifs (sur des décisions déjà prises) sont tout aussi valables - ils formalisent des choses qui restaient implicites
- Documenter les dettes assumées (pas de TypeScript, pas de tests) via ADR les rend explicites plutôt que silencieuses

---

## Décisions prises

- 5 ADR rédigés en anglais et exportés en fichiers Markdown, basés sur les notes Obsidian du projet Oli's Lab et les comptes-rendus de meetings

### Contenu des 5 ADR

- **ADR-001** - Migration de Notion + Make vers Payload CMS
  - Sources : `2026-02-11 Payload CMS POC`, `2026-02-17 CMS Infrastructure Image Upload`, `2026-03-02 Tech Weekly`, `2026-03-26 Migration Produits Payload Schemas`

- **ADR-002** - Deux collections Media séparées : `media` et `logo-media`
  - Sources : `2026-02-17 CMS Infrastructure Image Upload`, `2026-03-02 CMS Payload Strategie Images`

- **ADR-003** - Unicité composite des subcategories gérée par query Payload, pas par index MongoDB
  - Sources : `2026-02-20 Categories Slug Routing`, `2026-01-22 Migration Categories Subcategories`, `2026-01-27 Restructuration Categories Subcategories`

- **ADR-004** - Deux patterns d'event tracking distincts : comportemental vs transactionnel
  - Sources : `2026-03-03 Events Capturing`, `2026-03-02 Tech Weekly`, `2026-03-23 Tech Weekly`, `2025-10-07 Tech Weekly`

- **ADR-005** - Sync Payload vers MongoDB : un endpoint dédié par collection, pas de script générique
  - Sources : `2026-03-31 CMS Sync Script Code Review`, `2026-03-23 Tech Weekly`

---

## Actions à faire

- [ ] Créer le dossier `docs/adr/` dans le repo Oli's Lab
- [ ] Déposer les 5 fichiers Markdown générés
- [ ] Partager la pratique avec l'équipe (message rédigé en anglais pendant la session, prêt à envoyer)
- [ ] Documenter les prochaines décisions au fil de l'eau, dès qu'elles sont prises

---

## À intégrer dans

- Standards & Patterns - mentionner les ADR comme pratique à mettre en place sur le projet
- Intro Oli's Lab - référencer le dossier `docs/adr/` dans les liens utiles
