# 06 - Stack vs Heap en Rust

Tags: #rust #memoire #stack #heap

---

## Rappel rapide

**Stack** : mémoire à taille fixe, allouée et libérée automatiquement, très rapide
**Heap** : mémoire à taille variable, allouée manuellement, plus lente

En JS, tu ne penses jamais à ca. Le GC gère tout.
En Rust, ca détermine directement le comportement de l'ownership.

## Ce qui va sur le Stack

Les types dont la taille est connue à la compilation :
- `i32`, `f64`, `bool`, `char`
- tuples et arrays de taille fixe

Ces types implémentent le trait `Copy` : quand tu les assignes, Rust copie la valeur.
Pas de move, pas de problème d'ownership.

```rust
let x = 5;
let y = x;  // copie, pas un move
println!("{}", x); // fonctionne
```

## Ce qui va sur le Heap

Les types dont la taille peut changer ou n'est pas connue :
- `String`
- `Vec<T>`
- `Box<T>`

Ces types ne sont pas `Copy`. Quand tu les assignes, c'est un **move**.

## Comment Rust gère la libération Heap

Pas de GC. Quand l'owner sort du scope, Rust appelle automatiquement le destructeur (`Drop`).
C'est déterministe et prévisible, contrairement au GC.

## Schéma mental

```
Stack                Heap
-----                ----
ptr  ─────────────► "hello world"
len: 5
cap: 11
```

Une `String` sur le stack contient juste un pointeur, une longueur, une capacité.
Les données réelles sont sur le heap.

## Question à te poser

Quand tu fais `let b = a` avec une `String`, qu'est-ce qui est copié exactement ?
Est-ce que Rust copie les données du heap ? Pourquoi ou pourquoi pas ?

---

Source: [The Rust Book - What is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
