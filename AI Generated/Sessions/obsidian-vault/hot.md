---
updated: 15-05-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Derniere mise a jour
15-05-2026 — Intégration complète des 15 notes Inbox dans Notes Permanentes (6 clusters, DDD/Craft/Tests/Legacy/Agilité/Infra).

## Etat du projet
- Vault en bonne santé : Inbox vidée (hors Rust)
- Nouveau dossier Code/Dev Knowledge/Infra/ créé avec Terraform.md et Infra.md
- Réseau de liens dense créé entre les notes DDD (CQRS, Event Sourcing, Value Object, DTO)

## Faits recents importants
- `l.path` est null dans Dataview pour les outlinks non-markdown — toujours utiliser `string(l)`
- Style notes permanentes : liens [[NomNote]] inline dans le texte, jamais de section "Lien avec d'autres concepts"
- CheckoutProvider olis-lab/apps/web : bon usage de Context (DI, pas state bag, tout memoïsé)
- Store Jotai olis-lab propre : zéro logique métier, purs conteneurs atomiques

## Decisions actives
- Pas de section "Sources" ni "Lien avec d'autres concepts" dans les notes permanentes
- SDK.md standalone (pas de lien DTO forcé)
- IaC positionné comme approche de gestion de l'infra, pas comme définition de l'infra
- Pour les prochaines intégrations Inbox : déplacer avec mv/Write+rm, jamais créer en doublon

## Prochaines etapes
- Traiter les notes Rust dans Inbox/Rust/
- Alimenter Infra/ (CI/CD, Docker, Kubernetes)
- Vérifier consommation de localCartAtom dans olis-lab (re-render potentiel)
- Focus olis-lab : bug S3, CRON automatisation, Payload type narrowing
