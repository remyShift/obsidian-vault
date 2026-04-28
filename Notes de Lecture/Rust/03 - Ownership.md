# 03 - Ownership : le concept central

Tags: #rust #ownership #memoire

---

## Ce que c'est

L'ownership est le mécanisme par lequel Rust gère la mémoire sans GC.
Chaque valeur en mémoire a **un seul propriétaire** à la fois.

## Les 3 règles fondamentales

1. Chaque valeur a **un unique owner**
2. Il ne peut y avoir **qu'un seul owner à la fois**
3. Quand l'owner sort du scope, la valeur est **automatiquement libérée** (dropped)

## Comparaison JS vs Rust

En JS :
```js
let a = "hello"
let b = a       // b pointe vers la même string, le GC s'occupe du reste
console.log(a)  // fonctionne
```

En Rust :
```rust
let a = String::from("hello");
let b = a;       // a est "moved" vers b
// println!("{}", a); // ERREUR DE COMPILATION
```

Rust refuse de compiler parce que `a` n'est plus owner après le move.
Il n'y a pas de GC pour gérer le cas où les deux pointent vers la même mémoire.

## Pourquoi ce modèle ?

Si deux variables pointaient vers la même mémoire, et que les deux essayaient de la libérer : **double free error**. C'est exactement ce que Rust interdit à la compilation.

## Ce que "drop" veut dire

Quand une variable sort de son scope, Rust appelle automatiquement `drop()`.
C'est déterministe : tu sais exactement quand la mémoire est libérée.

```rust
{
    let s = String::from("hello"); // s est alloué ici
} // s est dropped ici, mémoire libérée
```

## A lire

[The Rust Book - Chapter 4 : Understanding Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html)

## Question à te poser

Lis le chapitre 4. Ensuite explique-moi : pourquoi les types simples comme `i32` ne suivent pas les règles de move ? Qu'est-ce que le trait `Copy` ?
