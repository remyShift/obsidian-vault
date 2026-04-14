---
source: ai
---

# 2026-04-14 — Construction base de connaissance Oli's Lab

**Domaine :** Code / Workflow
**Statut :** Synthèse brute → intégré directement dans les notes permanentes

---

## Contexte

Longue session de travail sur le vault Obsidian. Objectif : transformer les transcripts de meetings Oli's Lab (huddles Slack + Tech Weeklies) en une base de connaissance permanente et structurée sur le projet.

---

## Points clés

- Intégration de 9 transcripts de meetings supplémentaires (décembre 2025 → mars 2026) : React Query, Joi, debugging infinite loop, MongoDB indexation, state flow audit, QA search, restructuration catégories, migration produits Payload, stratégie images CMS
- Création d'une structure de notes permanentes complète pour Oli's Lab
- Mise à jour de la note chantier CMS Payload avec l'état réel du code lu directement depuis `cms/src/` (collections, infra, architecture sync, seed script)

---

## Décisions prises

- Structure retenue pour le vault Oli's Lab :
  - `00 - Intro Oli's Lab.md` : point d'entrée + sommaire (la note intro fait office de sommaire, pas de note séparée)
  - `Standards & Patterns.md` : référence technique quotidienne
  - `Bugs & Décisions.md` : mémoire des bugs résolus et décisions ponctuelles
  - `Chantiers/` : 3 chantiers retenus (Migration CMS Payload, Migration Next.js, Event Tracking Analytics)
  - `Meetings/` : 19 huddles + 9 Tech Weeklies avec sommaires
- Chantiers retenus : Migration CMS Payload / Migration Next.js (inclut Checkout v2) / Event Tracking Analytics. Les autres (catégories, state management, product recommendation) ont été exclus volontairement pour rester focus.

---

## Actions à faire

- [ ] Relancer les serveurs MCP locaux si le wrap via `/wrap` continue de timeout
- [ ] Mettre à jour le sommaire des conversations manuellement avec cette entrée

---

## À intégrer dans

- Tout a été intégré directement dans `Notes Permanentes/Projets/Oli's Lab/` pendant la session