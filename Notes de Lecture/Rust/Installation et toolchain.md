# Installation et toolchain

Tags: #rust #setup

Rust s'installe via `rustup`, le gestionnaire de toolchain officiel. Pense à `nvm` pour Node, c'est le même principe : tu gères les versions de Rust depuis un seul outil.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Ca installe trois choses : `rustc` (le compilateur), `cargo` (le build tool et package manager), et `rustup` lui-même.

## Cargo est ton vrai outil

En pratique tu n'appelles presque jamais `rustc` directement. Tout passe par `cargo`, qui est à la fois l'équivalent de `npm`, `webpack`, et le runner de tests.

```bash
cargo new mon_projet   # crée un projet
cargo run              # compile et exécute
cargo check            # vérifie sans compiler (beaucoup plus rapide)
cargo build            # compile
cargo test             # lance les tests
```

`cargo check` est ton meilleur ami au quotidien : il valide le code sans produire de binaire, donc il est deux à trois fois plus rapide que `cargo build`. Tu l'utilises en continu pendant que tu codes.

## Structure d'un projet

```
mon_projet/
  Cargo.toml   ← l'équivalent de package.json
  src/
    main.rs    ← point d'entrée
```

`Cargo.toml` contient le nom, la version, et les dépendances (appelées "crates"). `src/main.rs` est là où commence le programme.

Pour poser les bases de la syntaxe et des types avant de plonger dans ce qui rend Rust unique : [[Types de base et syntaxe]].

---

**A lire** : [The Rust Book - Getting Started](https://doc.rust-lang.org/book/ch01-00-getting-started.html)

**Exercice** : installe Rust, crée un projet avec `cargo new`, fais tourner `cargo run`. Puis modifie `main.rs` pour que le programme affiche ton prénom. Qu'est-ce que tu observes si tu introduis une erreur de syntaxe ?
