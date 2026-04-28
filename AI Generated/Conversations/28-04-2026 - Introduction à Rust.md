---
source: ai
---

# 28-04-2026 - Introduction à Rust

**Domaine :** Code
**Statut :** Synthèse brute -> à intégrer dans les notes permanentes si pertinent

---

## Contexte

Session d'introduction à Rust. Rémy est dev JS/TS junior, à l'aise avec Vitest/Jest et le TDD. Objectif : créer des notes atomiques dans le vault Obsidian sous `Notes de Lecture/Rust/` pour poser les bases du langage.

---

## Points clés

- Les notes ont d'abord été créées avec un format numéroté (01, 02...) puis entièrement refaites dans le style du vault de Rémy : prose, liens internes avec phrase d'intro, questions en fin de note
- 8 notes créées au total dans `Notes de Lecture/Rust/` : Rust Index, Pourquoi Rust existe, Installation et toolchain, Types de base et syntaxe, Stack vs Heap, Ownership, Borrowing et références, Result et Option, Tester en Rust
- Concepts couverts dans l'ordre logique : contexte historique -> toolchain -> types -> mémoire -> ownership -> borrowing -> gestion d'erreurs -> tests
- `Result` et `Option` ont été introduits comme prérequis aux tests, pas séparément
- Discussion sur `String` vs `&str` : Rémy avait l'intuition "String pour modifier, &str pour constante" -> affiné vers "&str = vue en lecture seule sur de la mémoire existante, peu importe la source (literal ou slice d'une String)"
- Discussion sur la convention de co-localiser tests et code dans le même fichier en Rust : Rémy venait de fichiers de tests séparés en JS -> clarifié que `#[cfg(test)]` rend ça gérable mentalement, et que le dossier `tests/` existe pour les tests d'intégration

---

## Décisions prises

- Format des notes : pas de numérotation dans les titres, chaque note se lit seule et référence les autres avec une mini phrase d'intro
- Deux précisions identifiées à ajouter dans les notes existantes : section "quand utiliser String vs &str" dans `Types de base et syntaxe`, et clarification sur la co-localisation des tests dans `Tester en Rust`

## Actions à faire

- [ ] Ajouter la section "quand utiliser String vs &str" dans la note `Types de base et syntaxe`
- [ ] Ajouter la clarification sur tests unitaires co-localisés vs tests d'intégration dans `Tester en Rust`
- [ ] Faire l'exercice : fonction `est_pair` avec trois tests, lancer `cargo test`
- [ ] Lire le chapitre 4 du Rust Book sur l'ownership
- [ ] Expliquer pourquoi ce code ne compile pas : `let s2 = s1; println!("{}", s1);`

## À intégrer dans

- `Notes de Lecture/Rust/Types de base et syntaxe` - section String vs &str à compléter
- `Notes de Lecture/Rust/Tester en Rust` - précision sur co-localisation tests/code
