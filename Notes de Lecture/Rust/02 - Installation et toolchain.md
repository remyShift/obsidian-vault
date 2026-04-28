# 02 - Installation et toolchain

Tags: #rust #setup

---

## Rustup

Rust s'installe via `rustup`, le gestionnaire de toolchain officiel.
C'est l'équivalent de `nvm` pour Node.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Ca installe :
- `rustc` : le compilateur
- `cargo` : le build tool + package manager (équivalent npm)
- `rustup` lui-même : pour gérer les versions

## Vérifier l'installation

```bash
rustc --version
cargo --version
```

## Cargo : ton outil principal

Tu n'utilises presque jamais `rustc` directement. Tout passe par `cargo`.

| Commande | Rôle |
|---|---|
| `cargo new mon_projet` | Crée un nouveau projet |
| `cargo build` | Compile |
| `cargo run` | Compile et exécute |
| `cargo check` | Vérifie sans compiler (rapide) |
| `cargo test` | Lance les tests |

## Structure d'un projet Cargo

```
mon_projet/
  Cargo.toml   ← équivalent package.json
  src/
    main.rs    ← point d'entrée
```

## Question à te poser

Quelle est la différence entre `cargo build` et `cargo check` ? Dans quel cas utiliserais-tu l'un plutôt que l'autre ?

---

Source: [The Rust Book - Getting Started](https://doc.rust-lang.org/book/ch01-00-getting-started.html)
