---
tags:
  - Rust
  - LangagesDeProgs
---
## Ce qu'il faut comprendre

Une `struct` en Rust regroupe des données nommées sous un même type. Pas de classes, pas d'héritage. Juste des données, et séparément, des comportements attachés via `impl`.

```rust
struct User {
    username: String,
    email: String,
    active: bool,
}
```

Pour créer une instance :

```rust
let user = User {
    username: String::from("remy"),
    email: String::from("remy@example.com"),
    active: true,
};
```

## Méthodes avec impl

Les comportements d'une struct sont définis dans un bloc `impl`, séparé de la définition des données. C'est intentionnel : les données et le comportement ne sont pas mélangés comme dans une classe JS.

```rust
impl User {
    // méthode : prend &self, accès en lecture à l'instance
    fn display_name(&self) -> &str {
        &self.username
    }

    // méthode mutable : prend &mut self pour modifier l'instance
    fn deactivate(&mut self) {
        self.active = false;
    }

    // fonction associée (pas de self) : constructeur par convention
    fn new(username: &str, email: &str) -> User {
        User {
            username: String::from(username),
            email: String::from(email),
            active: true,
        }
    }
}
```

`User::new(...)` s'appelle avec `::` parce que ce n'est pas une méthode d'instance, c'est une fonction associée au type. C'est le pattern constructeur idiomatique en Rust.

## Tuple structs

Des structs sans champs nommés, utiles pour créer des types distincts autour d'un même type primitif (voir aussi le pattern Newtype au niveau 3).

```rust
struct Meters(f64);
struct Kilograms(f64);

let distance = Meters(10.5);
let weight = Kilograms(10.5);
// Ces deux types ne sont pas interchangeables même si la valeur est identique
```

## Questions à se poser après lecture

- Quelle est la différence entre `&self`, `&mut self`, et `self` dans un bloc `impl` ?
- Pourquoi Rust sépare la définition de la struct et le bloc `impl` ? Qu'est-ce que ça dit sur la philosophie du langage ?
- Comment l'ownership s'applique quand une struct contient des `String` ? Qu'est-ce qui se passe si tu moves une struct dans une fonction ?
- En quoi `User::new()` diffère d'un `constructor` en JavaScript ?

---

**Ressource principale** : [The Rust Book - Ch. 5 : Using Structs to Structure Related Data](https://doc.rust-lang.org/book/ch05-00-structs.html)