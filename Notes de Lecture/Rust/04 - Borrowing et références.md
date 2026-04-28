# 04 - Borrowing et références

Tags: #rust #borrowing #references

---

## Le problème que ca résout

Si chaque move transfère l'ownership, comment passer une valeur à une fonction sans la perdre ?

La réponse : **borrowing**. Tu prêtes la valeur, tu ne la cèdes pas.

## Référence immutable

```rust
let s = String::from("hello");
let len = calculate_length(&s); // on passe une référence
println!("{}", s); // s est toujours valide
```

Le `&` signifie "référence". La fonction emprunte `s` sans en prendre ownership.

## Référence mutable

```rust
let mut s = String::from("hello");
change(&mut s);
```

Règle critique : **tu ne peux avoir qu'une seule référence mutable à la fois**.

```rust
let r1 = &mut s;
let r2 = &mut s; // ERREUR DE COMPILATION
```

## Pourquoi cette règle ?

Ca empêche les **data races** à la compilation. Si deux parties du code peuvent modifier la même mémoire en même temps, tu as un bug potentiel. Rust le refuse avant même que le programme tourne.

## Résumé des règles

- Plusieurs références immutables (`&T`) : OK
- Une seule référence mutable (`&mut T`) : OK
- Les deux en même temps : INTERDIT

## Analogie

Imagine un document partagé :
- Plusieurs personnes peuvent le lire en même temps (immutable refs)
- Une seule personne peut l'éditer, et pendant ce temps personne ne peut lire (mutable ref)

## A lire

[The Rust Book - References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)

## Question à te poser

Que se passe-t-il si tu crées une référence vers une valeur qui sort de son scope avant la référence ? Comment Rust appelle ce problème ?
