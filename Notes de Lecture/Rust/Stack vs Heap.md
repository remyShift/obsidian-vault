---
tags:
  - Rust
  - LangagesDeProgs
---
Pour comprendre l'ownership, il faut d'abord avoir le bon modèle mental de la mémoire. En JS, tu n'y penses jamais. En Rust, c'est explicite et ça détermine directement le comportement du compilateur.

**Le stack** est une mémoire à taille fixe, organisée en pile. 
- Ultra rapide, gérée automatiquement.
- Quand une fonction est appelée, une "frame" est empilée. Quand elle retourne, la frame est dépilée.

**Le heap** est une mémoire dynamique.
- Quand tu as besoin de stocker quelque chose dont la taille n'est pas connue à la compilation, ça va sur le heap.
- C'est plus lent, et quelqu'un doit s'occuper de libérer cette mémoire.

## Ce qui va sur le stack

Les types dont la taille est connue à la compilation : `i32`, `f64`, `bool`, `char`, les tuples et arrays de taille fixe. Ces types implémentent le trait `Copy`. Quand tu les assigne à une nouvelle variable, Rust copie simplement la valeur.

```rust
let x = 5;
let y = x;       // copie, x est toujours valide
println!("{}", x); // fonctionne
```

## Ce qui va sur le heap

Les types dont la taille peut changer : `String`, `Vec<T>`, et tout ce qui est alloué dynamiquement. Ces types ne sont pas `Copy`. Quand tu les assigne, ce n'est pas une copie, c'est un **move**.

Une `String` sur le stack, ça ressemble à ça :

```
Stack                Heap
-----                ----
ptr  ─────────────► "hello world"
len: 11
cap: 11
```

Sur le stack, tu as juste un pointeur, une longueur, une capacité. Les données réelles sont sur le heap. Quand tu fais `let b = a` avec une `String`, seule la partie stack est copiée. C'est pour ça que Rust interdit d'utiliser `a` après : il n'y a pas deux copies des données heap, juste deux pointeurs vers les mêmes données. Et si les deux essayaient de libérer la mémoire : double free, bug critique.

C'est exactement le problème que l'ownership résout : [[Ownership]].

---

**A lire** : [The Rust Book - What is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html) section "Memory and Allocation"

**Question** : quand tu fais `let b = a` avec une `String`, qu'est-ce que Rust copie exactement ? Est-ce que les données du heap sont dupliquées ? Pourquoi Rust fait ce choix plutôt que de copier systématiquement tout ?
