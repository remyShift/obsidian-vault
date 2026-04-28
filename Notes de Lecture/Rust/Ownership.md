# Ownership

Tags: #rust #ownership #memoire

L'ownership est le mécanisme central de Rust. C'est lui qui permet d'éliminer le GC tout en garantissant qu'aucune mémoire n'est utilisée après avoir été libérée, et qu'aucune mémoire n'est libérée deux fois. Tout le reste du langage en découle.

Pour comprendre pourquoi ce mécanisme existe, le modèle mémoire aide beaucoup : [[Stack vs Heap]].

## Les trois règles

Chaque valeur en mémoire a un **unique owner**. Il ne peut y en avoir qu'un à la fois. Quand l'owner sort du scope, la valeur est **automatiquement libérée** (on dit qu'elle est "dropped").

## Ce que ça change par rapport à JS

```js
// JS
let a = "hello"
let b = a        // b et a existent tous les deux, le GC s'en occupe
console.log(a)   // fonctionne
```

```rust
// Rust
let a = String::from("hello");
let b = a;       // a est "moved" vers b, a n'existe plus
println!("{}", a); // ERREUR DE COMPILATION
```

Rust refuse de compiler. Après le move, `a` n'est plus owner. Si tu essaies de l'utiliser, le compilateur te l'interdit. Il n'y a pas de GC pour gérer le cas où deux variables pointent vers les mêmes données heap.

## Drop : la libération déterministe

En JS, tu ne sais pas quand le GC va passer. En Rust, tu sais exactement quand la mémoire est libérée : quand l'owner sort du scope.

```rust
{
    let s = String::from("hello"); // s est alloué ici
} // s est dropped ici, mémoire libérée immédiatement
```

C'est déterministe. Prévisible. Pas de pause GC.

## Les types Copy ne sont pas concernés

Les types simples comme `i32`, `bool`, `char` vivent entièrement sur le stack (voir [[Stack vs Heap]]). Rust peut les copier instantanément, donc il le fait automatiquement. Ces types implémentent le trait `Copy` et le move ne s'applique pas à eux.

## Comment passer une valeur sans en perdre l'ownership

Le move force à réfléchir : si tu passes une `String` à une fonction, est-ce que tu veux lui céder ou juste lui prêter ? Pour prêter sans céder, Rust a le borrowing : [[Borrowing et références]].

---

**A lire** : [The Rust Book - Chapter 4](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html)

**Question** : pourquoi ce code ne compile pas ? Explique précisément ce que Rust protège ici.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    println!("{}", s1);
}
```
