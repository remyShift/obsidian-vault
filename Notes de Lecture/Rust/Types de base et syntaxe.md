---
tags:
  - Rust
  - LangagesDeProgs
---
Avant d'arriver à ce qui rend Rust unique, il faut se familiariser avec la syntaxe de base. La première chose qui surprend venant de JS c'est que les variables sont **immutables par défaut**.

```rust
let x = 5;        // immutable, tu ne peux pas réécrire x après
let mut y = 5;    // mutable, le mot-clé mut est obligatoire
```

En JS, `let` est mutable par défaut et `const` empêche la réassignation. Rust fait l'inverse : `let` est immutable, et tu dois explicitement demander la mutabilité avec `mut`. C'est un choix philosophique fort, rendre le changement d'état visible dans le code.

## Les types scalaires

Rust est statiquement typé mais avec une inférence de types très puissante. Tu n'as pas toujours besoin de les écrire.

| Type | Description |
|---|---|
| `i32` | entier signé 32 bits (le défaut pour les entiers) |
| `u32` | entier non signé 32 bits |
| `f64` | flottant 64 bits (le défaut pour les décimaux) |
| `bool` | `true` ou `false` |
| `char` | un seul caractère Unicode, entre guillemets simples `'a'` |

## String vs &str : une distinction sans équivalent JS

C'est un des premiers points de friction. Il existe deux types de chaînes en Rust.

```rust
let s1: &str = "hello";              // string literal, stocké directement dans le binaire
let s2: String = String::from("hello"); // alloué sur le heap, owned, modifiable
```

- `&str` est une référence vers une séquence de bytes quelque part en mémoire.
- `String` est une chaîne dont tu es propriétaire, que tu peux modifier.

## Fonctions

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y   // pas de point-virgule = valeur de retour implicite
}
```

Rust distingue **expressions** (produisent une valeur) et **statements** (ne produisent rien). La dernière ligne sans `;` est une expression, elle est retournée automatiquement. Avec `;` elle devient un statement et ne retourne rien.

## Le if est une expression

```rust
let result = if x > 5 { "grand" } else { "petit" };
```

En Rust, `if` retourne une valeur. C'est l'équivalent de l'opérateur ternaire JS, mais en beaucoup plus lisible. Les deux branches doivent retourner le même type.

---

**A lire** : [The Rust Book - Common Programming Concepts](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html)

**Question** : en JS, `const` empêche la réassignation mais pas la mutation (`const obj = {}; obj.a = 1` fonctionne). Est-ce que `let` en Rust empêche aussi la mutation, ou seulement la réassignation ? Essaie avec une `String` pour le savoir.
