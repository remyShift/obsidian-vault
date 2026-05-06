---
source: ai
---

# 06-05-2026 - Organisation posts LinkedIn Obsidian

**Domaine :** Workflow / Créatif
**Statut :** Synthèse brute

---

## Contexte

Tri et organisation des posts LinkedIn dans le vault Obsidian. Le dossier `Notes Permanentes/Contenu & Créatif/Linkedin/Posts/` contenait environ 250 fichiers plats sans structure. Objectif : les ranger dans des sous-dossiers par année puis par mois.

## Points clés

- Les fichiers suivent le format `DD-MM-YYYY - slug.md`, ce qui permet d'extraire l'année et le mois automatiquement
- Le MCP vault ne permet pas de faire des opérations en batch - chaque `move_file` est un appel individuel, ce qui rend le tri complet de 250 fichiers impraticable via Claude seul
- Un script bash a été fourni pour compléter l'opération en une commande
- Rémy a finalisé manuellement la migration et a aussi renommé le format des sous-dossiers
- Structure finale retenue : `YYYY/MM-Mois/` (ex: `2026/01-Janvier/`)
- Un dossier `TODO` a été créé comme zone de staging pour les posts récents dont on attend que les stats tombent avant de les archiver dans le bon dossier année/mois

## Décisions prises

- Structure des dossiers : `YYYY/MM-Mois/` (ex: `2026/04-Avril/`)
- Les nouveaux posts passent d'abord par `TODO`, puis sont déplacés une fois les stats disponibles

## Actions à faire

- [ ] Adapter le script bash au nouveau format de mois pour les futurs tris en batch

## À intégrer dans

- Note workflow Obsidian / organisation du vault si elle existe
