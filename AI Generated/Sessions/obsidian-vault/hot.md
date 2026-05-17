---
updated: 18-05-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Derniere mise a jour
18-05-2026 — Query Dataview pondérée LinkedIn + renommage massif de 275 fichiers Posts avec titres descriptifs.

## Etat du projet
- Vault en bonne santé : Inbox vidée (hors Rust)
- Sommaire LinkedIn enrichi : score pondéré, section "Posts sans impressions", Top 10 impressions, Top 10 pires
- 275 fichiers LinkedIn Posts renommés avec titres descriptifs (format DD-MM-YYYY - titre)
- Dossier Code/Dev Knowledge/Infra/ existant avec Terraform.md et Infra.md

## Faits recents importants
- `WHERE !impressions` en Dataview filtre les champs absents/null nativement
- L'arithmétique dans les colonnes TABLE Dataview est supportée sans FLATTEN
- `l.path` est null dans Dataview pour les outlinks non-markdown — toujours utiliser `string(l)`
- Style notes permanentes : Nom Note inline dans le texte, jamais de section "Lien avec d'autres concepts"
- `mcp__obsidian__patch_vault_file` interdit (bug latin1 + doublons) — utiliser Write/mcp__vault__write_file

## Decisions actives
- Pas de section "Sources" ni "Lien avec d'autres concepts" dans les notes permanentes
- Renommage fichiers LinkedIn > frontmatter title: (lisibilité explorateur Obsidian)
- Pondération score LinkedIn : impressions x1, likes x30, commentaires x70
- Pour les prochaines intégrations Inbox : déplacer avec mv/Write+rm, jamais créer en doublon

## Prochaines etapes
- Compléter les impressions manquantes dans les posts LinkedIn anciens (section "Posts sans impressions")
- Traiter les notes Rust dans Inbox/Rust/
- Alimenter Infra/ (CI/CD, Docker, Kubernetes)
- Vérifier consommation de localCartAtom dans olis-lab (re-render potentiel)
