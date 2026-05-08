---
source: ai
---

# 08-05-2026 - Rust Roadmap et notes fondations

**Domaine :** Code
**Statut :** Synthèse brute -> à intégrer dans les notes permanentes si pertinent

---

## Contexte

Session de travail sur l'apprentissage de Rust. L'objectif était de faire un état des lieux des notes existantes dans le vault, construire une roadmap complète de zéro à Rust avancé (en intégrant les pratiques Craft et l'architecture logicielle), puis générer les notes manquantes pour compléter le Niveau 1.

---

## Points clés

- Les notes existantes couvrent correctement les fondations : Pourquoi Rust, toolchain, types de base, Stack/Heap, Ownership, Borrowing, Result/Option, et tests. C'est ~70% du Niveau 1.
- Il manquait 4 notes pour compléter le Niveau 1 : Structs et méthodes, Enums et pattern matching, Modules et visibilité, Lifetimes.
- La roadmap est structurée en 5 niveaux progressifs, chacun terminé par un projet checkpoint concret.
- Chaque niveau intègre explicitement des pratiques Craft (nommage, responsabilité unique, tests, architecture hexagonale, DDD léger).
- L'architecture hexagonale est introduite dès le Niveau 3 avec un projet API HTTP comme checkpoint.
- Le pattern "lib.rs / main.rs" est identifié comme une pratique de craft fondamentale, pas juste une convention.

---

## Décisions prises

- Roadmap créée dans `Notes Permanentes/Code/Programming Languages/Rust/Rust Roadmap.md`
- Les 4 notes manquantes du Niveau 1 ont été créées dans `Notes de Lecture/Inbox/Rust/` pour traitement différé
- Ordre de traitement recommandé pour ces notes : Structs -> Enums -> Modules -> Lifetimes

---

## Actions à faire

- [ ] Lire et traiter `Structs et méthodes.md` en premier
- [ ] Déplacer chaque note traitée de `Inbox/Rust/` vers `Notes Permanentes/Code/Programming Languages/Rust/`
- [ ] Une fois le Niveau 1 complet, démarrer le checkpoint projet 1 : CLI todo list

---

## À intégrer dans

- `Notes Permanentes/Code/Programming Languages/Rust/Rust Intro.md` -> ajouter un lien vers la Roadmap
- `Notes Permanentes/Code/Programming Languages/Rust/Rust Roadmap.md` -> déjà créée, c'est la destination principale
