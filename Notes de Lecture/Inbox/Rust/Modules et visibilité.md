---
tags:
  - Rust
  - LangagesDeProgs
---
## Ce qu'il faut comprendre

En JS/Node tu organises ton code avec des fichiers et des `import/export`. En Rust, le système de modules est plus explicite et directement lié à la visibilité du code.

## Les trois niveaux

- **Package** : ce que `cargo new` crée. Contient un ou plusieurs crates.
- **Crate** : unité de compilation. Soit un binaire (`main.rs`), soit une librairie (`lib.rs`).
- **Module** : découpage interne d'un crate avec `mod`.

## Déclarer et organiser des modules

```rust
// src/lib.rs ou src/main.rs

mod user {
    pub struct User {
        pub username: String,
        email: String,    // privé : pas accessible hors du module
    }

    pub fn create(username: &str, email: &str) -> User {
        User {
            username: String::from(username),
            email: String::from(email),
        }
    }
}
```

Par défaut tout est **privé**. `pub` rend un item accessible depuis l'extérieur du module. C'est l'inverse de JS où tout est accessible par défaut si tu l'exportes.

## Modules dans des fichiers séparés

Pour un module `user` dans son propre fichier :

```
src/
  main.rs
  user.rs      ← le contenu du module user
```

```rust
// src/main.rs
mod user;  // Rust cherche src/user.rs automatiquement

use user::create;
```

Pour des sous-modules :

```
src/
  main.rs
  user/
    mod.rs     ← le module user
    repository.rs  ← sous-module
```

## use : importer dans le scope courant

```rust
use std::collections::HashMap;
use crate::user::create;  // crate:: = racine de ton crate
use super::user;          // super:: = module parent
```

## lib.rs vs main.rs : la séparation fondamentale

C'est le pattern de base pour du code testable et réutilisable :

- `main.rs` = le point d'entrée, uniquement l'orchestration, le plus court possible
- `lib.rs` = toute la logique, testable indépendamment, importable par d'autres

```rust
// src/main.rs
use mon_projet::run;

fn main() {
    run();
}

// src/lib.rs
pub fn run() {
    // toute la logique ici
}
```

Les tests d'intégration dans `tests/` importent depuis `lib.rs`, pas depuis `main.rs`.

## Questions à se poser après lecture

- Pourquoi la visibilité est privée par défaut en Rust alors que JS exporte explicitement ?
- Quelle est la différence entre `use crate::`, `use super::`, et `use self::` ?
- Comment structurerais-tu en modules le projet CLI todo list du checkpoint 1 ?
- Pourquoi séparer `main.rs` et `lib.rs` est une pratique de craft et pas juste une convention ?

---

**Ressource principale** : [The Rust Book - Ch. 7 : Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)