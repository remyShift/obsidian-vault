---
source: ai
---

# 16-05-2026 - Notes Craft et atomisation Code Smells

**Domaine :** Code
**Statut :** Synthèse brute -> à intégrer dans les notes permanentes si pertinent

---

## Contexte

Session de travail sur la base de connaissance Craft dans Obsidian. Deux axes : enrichir les Notes de Lecture sur des sujets non encore couverts, puis atomiser la note Code Smells existante en sous-notes détaillées.

---

## Points clés

- Lecture du style des notes permanentes existantes avant toute création : format, tags, liens internes, absence de titres inutiles, prose fluide.
- Création de 6 nouvelles notes dans Notes de Lecture/Code/ : Primitives, Memoize, Event Driven, Expand DDD, Monad, Immutabilité.
- Les 6 notes sont liées entre elles de manière cohérente : Primitives -> Immutabilité -> Monad -> Memoize, Event Driven -> DDD -> Event Sourcing, Expand DDD complète sans répéter la note principale.
- Expand DDD se concentre sur ce qui manquait : les 4 règles de Vaughn Vernon sur les Aggregates, le Context Mapping (Shared Kernel, ACL, Open Host), et les erreurs fréquentes de mise en oeuvre.
- Monad traite Promise comme exemple concret (flatMap natif), Maybe pour l'absence, Either pour les erreurs sans exceptions - sans librairie, juste le concept et son utilité réelle.
- Atomisation de Code Smells : la note principale devient un index par groupes, 18 sous-notes créées (une par smell), chacune avec structure identique : définition, code mauvais, code corrigé, fix nommé, signal d'identification concret.

---

## Décisions prises

- Notes de Lecture placées dans Notes de Lecture/Code/ (nouveau sous-dossier créé).
- Sous-notes Code Smells dans le dossier existant Code Smells/ aux côtés de la note principale.
- Note principale Code Smells réécrite comme index pur avec liens vers chaque sous-note.
- Chaque sous-note Code Smells suit une structure fixe et reproductible.

---

## À intégrer dans

- Les notes permanentes correspondantes dans Notes Permanentes/Code/Craft/ peuvent absorber le contenu des Notes de Lecture une fois digéré.
- La structure atomique des Code Smells peut servir de modèle pour atomiser d'autres notes denses (Design Patterns, SOLID).
