---
source: ai
---

# 14-06-2026 - Création CLAUDE.md guide du vault

**Domaine :** Workflow
**Statut :** Synthèse brute -> à intégrer dans les notes permanentes si pertinent

---

## Contexte

Objectif : créer un fichier `CLAUDE.md` à la racine du vault pour orienter toute instance de Claude qui y travaille (structure, conventions, insights de gestion). Avant de rédiger, exploration du vault réel via le MCP plutôt que de reconstituer la structure de mémoire.

## Points clés

- Le vault compte environ 2069 fichiers. Sa cartographie repose sur un système de sommaires (un `Sommaire*.md` par grande section), qui sert de colonne vertébrale de navigation.
- Quatre territoires : Code & craft, Projets (surtout Oli's Lab), Vie perso (daily, finances, coréen, Corée), Contenu (LinkedIn, talks).
- Conventions captées : frontmatter YAML standard, `source: ai` pour tout ce qui est généré, nommage daté `DD-MM-YYYY`, skills en `Skills/<nom>/SKILL.md`, commandes manuelles par discipline.
- Méthodo Zettelkasten : capture en Inbox, tri, atomisation, connexion, chasse aux orphelines via Dataview.
- Deux incohérences relevées dans l'existant : mélange tiret cadratin / tiret simple dans les noms de fichiers de conversations, et le template interne du skill `/wrap` qui utilise encore le cadratin alors que la règle l'interdit.

## Décisions prises

- Tiret simple `-` acté comme norme officielle partout, cadratin banni, sans renommer les anciennes notes.
- Règle inscrite : aucune note de `AI Generated/` ne linke une note Obsidian.
- `CLAUDE.md` laissé hors du `Sommaire.md` racine : fichier opérationnel, pas une note de connaissance.
- Écriture dans le vault : toujours via `vault:write_file`. La première tentative avait écrit le fichier en local hors du vault, erreur corrigée.

## Actions à faire

- [ ] Corriger le template interne du skill `/wrap` qui utilise encore le tiret cadratin
- [ ] Optionnel : passe de vérification des sommaires non lus en entier (LinkedIn, Tech Weeklies, Sessions) pour confirmer qu'ils suivent les conventions décrites
