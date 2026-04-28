---
tags:
  - Rust
  - LangagesDeProgs
---
Rust n'a pas été créé pour concurrencer Python ou JavaScript. Il a été créé pour résoudre un problème que C et C++ n'ont jamais vraiment réglé --> comment avoir un contrôle total sur la mémoire sans créer des bugs de sécurité catastrophiques.

Les langages bas niveau comme C laissent le développeur gérer la mémoire à la main. Résultat : deux classes de bugs qui représentent la majorité des failles critiques dans les OS, navigateurs et serveurs.
- **Use-after-free** : tu utilises de la mémoire qui a déjà été libérée
- **Data races** : deux threads modifient la même mémoire en même temps

Les langages haut niveau (JS, Ruby, Python) règlent ça avec un **Garbage Collector**. Mais le GC a un coût réel, pauses imprévisibles, overhead mémoire, impossible dans un contexte embarqué ou temps réel.

Rust prend une troisième voie et garantit la sécurité mémoire **à la compilation**, sans GC. Si ton code compile, il ne peut pas avoir ces bugs. Le compilateur les interdit avant même que le programme tourne.

> "If it compiles, it's (memory) safe."

C'est pour ça que Rust est utilisé dans les OS, le WebAssembly, les CLIs critiques, les moteurs de jeux, les serveurs haute performance. Partout où tu as besoin de vitesse ET de fiabilité en même temps.

Le mécanisme central qui permet tout ça s'appelle l'ownership. C'est là que tout commence : [[Ownership]].

---

**A lire** : [The Rust Book - Introduction](https://doc.rust-lang.org/book/ch00-00-introduction.html)

**Question** : en JS, qui libère la mémoire à ta place quand tu fais `let x = { a: 1 }` dans une fonction ? Et que se passe-t-il si le GC fait une pause au mauvais moment dans un jeu vidéo à 60fps ?
