---
updated: 14-05-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Derniere mise a jour
14-05-2026 — Correction query Dataview orphelines : `string(l)` au lieu de `l.path` pour filtrer les outlinks media.

## Etat du projet
- Vault en maintenance continue, pas de chantier structurant actif
- Queries Dataview Sommaire.md a jour et fonctionnelles

## Faits recents importants
- `l.path` est null dans Dataview pour les outlinks vers des fichiers non-markdown (images, etc.) — toujours utiliser `string(l)`
- Pattern fiable pour filtrer les medias dans les outlinks : `all(file.outlinks, (l) => contains(string(l), ".png") OR ...)`
- ADRs retro n'ont pas de valeur quand l'equipe est deja alignee — bon timing = pendant ou avant la decision

## Decisions actives
- Query "Notes totalement deconnectees" : filtre actif avec `string(l)` + extensions media
- Pas d'ADR standalone : integrer directement dans le plan Notion au moment de la decision

## Prochaines etapes
- Aucune action vault specifique prioritaire
- Focus sur olis-lab : bug S3, CRON automatisation, Payload type narrowing
