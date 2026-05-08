---
tags:
  - Rust
  - LangagesDeProgs
  - ToProcess
---

# Enums et pattern matching

> Note en attente de traitement. Lire, expérimenter, puis déplacer dans Notes Permanentes.

**Ressource principale** : [The Rust Book - Ch. 6 : Enums and Pattern Matching](https://doc.rust-lang.org/book/ch06-00-enums.html)

---

## Ce qu'il faut comprendre

Les enums en Rust sont bien plus puissantes qu'en TypeScript ou en Ruby. Chaque variant peut porter des données de types différents. C'est ce qu'on appelle un type algébrique.

```rust
enum Shape {
    Circle(f64),              // un f64 : le rayon
    Rectangle(f64, f64),      // deux f64 : largeur et hauteur
    Triangle { base: f64, height: f64 }, // champs nommés
}
```

Un seul type `Shape` peut représenter trois réalités différentes avec des données différentes. En JS tu aurais un objet avec un champ `type: string` et des propriétés optionnelles. En Rust, le compilateur sait exactement ce que chaque variant contient.

## match : pattern matching exhaustif

`match` est l'outil principal pour travailler avec les enums. Il est exhaustif : si tu oublies un variant, le code ne compile pas.

```rust
fn area(shape: Shape) -> f64 {
    match shape {
        Shape::Circle(r) => std::f64::consts::PI * r * r,
        Shape::Rectangle(w, h) => w * h,
        Shape::Triangle { base, height } => 0.5 * base * height,
    }
}
```

Le compilateur vérifie que tous les cas sont couverts. C'est une garantie que tu n'as pas en JS avec un `switch`.

## if let : match simplifié pour un seul cas

Quand tu ne t'intéresses qu'à un variant et que tu veux ignorer les autres :

```rust
let shape = Shape::Circle(5.0);

if let Shape::Circle(r) = shape {
    println!("C'est un cercle de rayon {}", r);
}
// les autres variants sont simplement ignorés
```

## Option et Result sont des enums

`Option<T>` et `Result<T, E>` que tu connais déjà sont des enums de la librairie standard. `match` et `if let` s'appliquent directement sur eux.

```rust
// Option est défini comme ça dans std :
enum Option<T> {
    Some(T),
    None,
}

// Result est défini comme ça :
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

## Questions à se poser après lecture

- Pourquoi le fait que `match` soit exhaustif est une propriété de sécurité et pas juste une contrainte ?
- En quoi un enum Rust avec des données dans ses variants est-il différent d'une union de types TypeScript ?
- Quand est-ce que tu utilises `match` plutôt que `if let` ?
- Comment modéliser un état de connexion utilisateur (déconnecté, en attente, connecté avec un token) avec un enum ?
