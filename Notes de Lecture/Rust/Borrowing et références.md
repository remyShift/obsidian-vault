# Borrowing et références

Tags: #rust #borrowing #references

Si chaque assignation transfère l'ownership, comment passer une valeur à une fonction sans la perdre définitivement ? C'est le problème que le borrowing résout : tu prêtes la valeur au lieu de la céder.

Avant d'aller plus loin, l'ownership est la base de tout ça : [[Ownership]].

## Référence immutable

Le `&` devant une valeur crée une référence. La fonction emprunte la valeur, le ownership reste chez l'appelant.

```rust
fn main() {
    let s = String::from("hello");
    let len = calculate_length(&s); // on prête s
    println!("{} a {} caractères", s, len); // s est toujours valide ici
}

fn calculate_length(s: &String) -> usize {
    s.len()
} // s est juste une référence, elle n'est pas dropped ici
```

## Référence mutable

Pour modifier la valeur empruntée, il faut une référence mutable : `&mut`.

```rust
let mut s = String::from("hello");
change(&mut s);
```

Et là, la règle critique : **une seule référence mutable à la fois**.

```rust
let r1 = &mut s;
let r2 = &mut s; // ERREUR : tu ne peux pas avoir deux &mut en même temps
```

## Pourquoi cette règle existe

Ce n'est pas arbitraire. Si deux parties du code peuvent modifier la même mémoire simultanément, tu as un **data race** : comportement non déterministe, bugs impossibles à reproduire. Rust l'interdit structurellement, à la compilation.

Les règles complètes :

- Plusieurs références immutables (`&T`) en même temps : ok
- Une seule référence mutable (`&mut T`) à la fois : ok
- Une référence mutable ET une immutable en même temps : interdit

L'intuition : si quelqu'un est en train de modifier, personne d'autre ne peut lire ou modifier. Si tout le monde lit, personne ne peut modifier.

## Ce qui se passe si la valeur disparaît avant la référence

C'est ce que Rust appelle une **dangling reference**. En C, c'est un bug classique : tu retournes un pointeur vers une variable locale qui n'existe plus. Rust refuse de compiler ce cas.

```rust
fn dangle() -> &String { // ERREUR
    let s = String::from("hello");
    &s // s est dropped à la fin de la fonction, la référence pointe vers rien
}
```

Le compilateur appelle ça un problème de **lifetime**. C'est le prochain concept clé après le borrowing.

---

**A lire** : [The Rust Book - References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)

**Question** : qu'est-ce qui se passe dans ta tête quand tu vois une erreur "does not live long enough" ? Essaie de reproduire l'exemple `dangle()` ci-dessus et lis le message d'erreur du compilateur. Qu'est-ce qu'il t'explique exactement ?
