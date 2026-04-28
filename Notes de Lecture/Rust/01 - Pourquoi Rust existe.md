# 01 - Pourquoi Rust existe

Tags: #rust #intro

---

## Le problème que Rust résout

Les langages bas niveau comme C et C++ donnent un contrôle total sur la mémoire.
C'est puissant, mais ca crée deux grandes catégories de bugs :

- **Use-after-free** : utiliser de la mémoire qui a déjà été libérée
- **Data races** : deux threads qui accèdent à la même mémoire en même temps

Ces bugs sont à l'origine de la majorité des failles de sécurité critiques (navigateurs, OS, serveurs).

Les langages haut niveau (JS, Ruby, Python) règlent ca avec un **Garbage Collector (GC)**.
Mais le GC a un coût : pauses imprévisibles, overhead mémoire, impossible à utiliser dans des contextes temps réel ou embarqué.

## Ce que Rust propose

Rust garantit la sécurité mémoire **sans GC**, à la compilation.
Le compilateur vérifie les règles d'ownership et refuse de compiler si quelque chose est dangereux.

> "If it compiles, it's (memory) safe."

## Cas d'usage typiques

- Systèmes d'exploitation
- WebAssembly (le browser compile du Rust aujourd'hui)
- CLIs performants
- Moteurs de jeux
- Tout ce qui doit être rapide ET fiable

## Question à te poser

En JS, qui libère la mémoire à ta place ? Et quel est le problème de cette approche dans un contexte temps réel ?

---

Source: [The Rust Book - Introduction](https://doc.rust-lang.org/book/ch00-00-introduction.html)
