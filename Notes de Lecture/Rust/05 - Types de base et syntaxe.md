# 05 - Types de base et syntaxe

Tags: #rust #types #syntaxe

---

## Variables

```rust
let x = 5;          // immutable par défaut
let mut y = 5;      // mutable
```

En Rust, les variables sont **immutables par défaut**. C'est l'inverse du réflexe JS.

## Types scalaires

| Type | Description | Equiv JS |
|---|---|---|
| `i32` | entier signé 32 bits | `number` |
| `u32` | entier non signé 32 bits | `number` |
| `f64` | flottant 64 bits | `number` |
| `bool` | booléen | `boolean` |
| `char` | caractère Unicode | `string[0]` |

## String vs &str

C'est une distinction importante et sans équivalent direct en JS :

- `String` : alloué sur le heap, owned, modifiable
- `&str` : référence vers une string, juste un pointeur vers des bytes

```rust
let s1: &str = "hello";           // string literal, stocké dans le binaire
let s2: String = String::from("hello"); // alloué sur le heap
```

## Fonctions

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y  // pas de point-virgule = valeur de retour (expression)
}
```

Rust distingue **expressions** (retournent une valeur) et **statements** (ne retournent rien).
Pas de point-virgule sur la dernière ligne = retour implicite.

## Structures de contrôle

```rust
if x > 5 {
    println!("grand");
} else {
    println!("petit");
}

// if est une expression en Rust
let result = if x > 5 { "grand" } else { "petit" };
```

## Question à te poser

Pourquoi Rust rend les variables immutables par défaut ? Quel problème ca prévient ? Comment ca se compare au `const` vs `let` en JS ?

---

Source: [The Rust Book - Common Programming Concepts](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html)
