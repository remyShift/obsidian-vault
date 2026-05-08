---
tags:
  - Rust
  - LangagesDeProgs
---
De zéro à Rust avancé, avec une pratique constante du craft et de l'architecture logicielle. Chaque niveau se termine par un projet checkpoint avant de passer au suivant.

---

## NIVEAU 1 - Fondations

[[Rust Intro]]
### Concepts
- [x] Pourquoi Rust existe
- [x] Toolchain, Cargo
- [x] Types de base, syntaxe, mutabilité
- [x] Stack vs Heap
- [x] Ownership et move semantics
- [x] Borrowing et références
- [x] Result et Option
- [x] Tests unitaires et d'intégration
- [ ] Structs et méthodes (`impl`)
- [ ] Enums et pattern matching (`match`, `if let`, `while let`)
- [ ] Modules et visibilité (`mod`, `pub`, `use`)
- [ ] Lifetimes basiques (annotations `'a`, ce que le compilateur exige et pourquoi)

### Craft associé
- Nommer correctement ses types : pas `data`, pas `info`, pas `manager`
- Une fonction = une responsabilité, pas d'effets de bord cachés
- Tester en même temps que tu codes, jamais après coup
- Zéro `.unwrap()` nu dans du code de production

### Checkpoint projet 1 : CLI "todo list"

> Construire une todo list en ligne de commande, tout en mémoire.

- CRUD complet : ajouter, lister, marquer comme fait, supprimer
- Gestion d'erreurs avec `Result`, aucun `.unwrap()` exposé
- Tests unitaires sur toute la logique métier
- Code organisé en modules propres (`main.rs` ne fait qu'orchestrer)
- **Ressource** : [The Rust Book - Ch. 12 : Building a CLI Program](https://doc.rust-lang.org/book/ch12-00-an-io-project.html)

---

## NIVEAU 2 - Programmation générique et traits

*Débloquer les abstractions.*

### Concepts
- [ ] Traits : définition, implémentation, trait bounds
- [ ] Generics (`<T>`)
- [ ] Trait objects (`dyn Trait`) vs `impl Trait`
- [ ] Closures et itérateurs (`map`, `filter`, `collect`, `fold`)
- [ ] Lifetimes dans les structs et les fonctions génériques
- [ ] `Vec<T>`, `HashMap<K,V>`, `HashSet<T>`
- [ ] Slices (`&[T]`)
- [ ] Introduction à `Box<T>`, `Rc<T>`, `Arc<T>`

### Craft associé
- Coder vers des abstractions : définir les traits avant les structs
- Séparation des responsabilités via les traits (équivalent des interfaces en TypeScript)
- Introduction à la Clean Architecture : couche domaine isolée du reste
- Eviter les abstractions prématurées : extraire un trait quand le besoin est réel, pas avant

### Checkpoint projet 2 : Librairie de parsing
> Parser un format de fichier simple depuis zéro.

- Parser du CSV ou un format de configuration custom
- API publique propre derrière des traits (le consommateur ne voit pas les détails internes)
- Aucun `.unwrap()`, propagation d'erreurs complète avec `?`
- Documentation avec `///` sur toutes les fonctions publiques, `cargo doc` qui passe
- **Ressource** : [The Rust Book - Ch. 10 : Generic Types, Traits, and Lifetimes](https://doc.rust-lang.org/book/ch10-00-generics.html)

---

## NIVEAU 3 - Architecture et design patterns

*Penser en systèmes.*

### Concepts
- [ ] Enums comme types algébriques et state machines
- [ ] Le pattern Builder
- [ ] Le pattern Newtype (wrapper de types pour la sémantique métier)
- [ ] Erreurs personnalisées avec `thiserror`
- [ ] Modules, crates, workspaces Cargo
- [ ] Séparation `lib.rs` / `main.rs` : pourquoi et comment

### Craft associé
- Architecture hexagonale en Rust : ports = traits, adapters = structs qui les implémentent
- Domain-Driven Design léger : types qui portent et encodent les règles métier
- "Make illegal states unrepresentable" : utiliser les enums pour que les états invalides ne compilent pas
- Types d'erreurs par couche, pas un seul type global
- Clippy en CI, `rustfmt` obligatoire

### Checkpoint projet 3 : API HTTP simple
> Un service web avec architecture hexagonale.

- Utiliser `axum` ou `actix-web`
- Architecture hexagonale : domaine / ports / adapters, trois couches claires
- Couche domaine sans aucune dépendance à axum ou à la couche HTTP
- Gestion d'erreurs différenciée par couche
- Tests d'intégration sur les routes HTTP
- Tests unitaires sur le domaine en isolation totale
- **Ressource** : [Axum documentation](https://docs.rs/axum/latest/axum/)

---

## NIVEAU 4 - Concurrence et performance

*Rust pour ce pour quoi il a été construit.*

### Concepts
- [ ] Threads (`std::thread`) et `move` closures
- [ ] `Arc<Mutex<T>>` : partage de données entre threads
- [ ] `Send` et `Sync` : pourquoi le compilateur les impose et ce qu'ils garantissent
- [ ] Async/await de base
- [ ] `tokio` : runtime async, tasks, channels (`mpsc`, `oneshot`)
- [ ] Zero-cost abstractions : comprendre ce que le compilateur génère réellement
- [ ] Benchmarks avec `criterion`

### Craft associé
- Ne pas sur-ingénierer la concurrence : threads d'abord, async si nécessaire
- Tester le code async (`#[tokio::test]`)
- Profiler avant d'optimiser, jamais l'inverse
- Documenter les invariants de concurrence dans les commentaires

### Checkpoint projet 4 : Worker async
> Un service qui traite des tâches en parallèle.

- Consomme des tâches depuis un channel `tokio::mpsc`
- Plusieurs workers qui tournent en parallèle
- Gestion propre du shutdown (signal CTRL+C, drain du channel)
- Métriques basiques : tâches traitées, durée moyenne, erreurs
- **Ressource** : [Tokio Tutorial](https://tokio.rs/tokio/tutorial)

---

## NIVEAU 5 - Rust avancé et écosystème

*Maîtrise et ouverture.*

### Concepts
- [ ] Macros déclaratives (`macro_rules!`)
- [ ] Unsafe Rust : ce que c'est, quand c'est justifié, comment le contenir
- [ ] `serde` : sérialisation/désérialisation JSON et autres formats
- [ ] `sqlx` ou `diesel` : accès base de données typé
- [ ] Feature flags dans `Cargo.toml`
- [ ] FFI basique : appeler du C depuis Rust
- [ ] WebAssembly avec Rust (`wasm-bindgen`)

### Craft associé
- Contribuer à une crate open source (même une petite correction)
- Code review systématique : clippy + rustfmt + tests + docs, pas négociable
- La documentation comme partie intégrante du contrat public de l'API
- Penser à la compatibilité sémantique (`semver`)

### Checkpoint projet 5 : Service complet en production
> Un service web prêt à déployer.

- API REST avec persistance PostgreSQL via `sqlx`
- Architecture hexagonale complète, domaine pur isolé
- Authentification JWT
- Variables d'environnement avec `dotenvy` ou `config`
- CI avec tests automatiques (GitHub Actions)
- Dockerfile fonctionnel

---

## Ordre de lecture recommandé

1. [The Rust Book](https://doc.rust-lang.org/book/) -- la référence principale, lire dans l'ordre
2. [Rust By Example](https://doc.rust-lang.org/rust-by-example/) -- en parallèle pour pratiquer
3. [std documentation](https://doc.rust-lang.org/std/) -- consulter au fil des besoins
4. [Rustlings](https://github.com/rust-lang/rustlings) -- exercices pratiques niveau 1 et 2

---

*Dernière mise à jour :* [[2026-05-08]]
