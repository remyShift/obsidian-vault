# Rust — Index

Tags: #rust #index

Point d'entrée pour toutes mes notes Rust. L'ordre ci-dessous suit la logique d'apprentissage, pas l'alphabet.

Rust existe parce que les alternatives ne suffisaient pas : [[Pourquoi Rust existe]].

Avant de coder, il faut installer la toolchain : [[Installation et toolchain]].

La syntaxe de base et les types primitifs, pour se sentir à l'aise avant d'aller plus loin : [[Types de base et syntaxe]].

La mémoire fonctionne différemment qu'en JS, et tout le reste en dépend : [[Stack vs Heap]].

L'ownership est le concept central de Rust, celui qui élimine le GC : [[Ownership]].

Pour passer des valeurs sans en perdre le contrôle, le borrowing : [[Borrowing et références]].

Rust n'a pas de `null` ni de `try/catch`. Les erreurs et l'absence de valeur sont des types explicites : [[Result et Option]].

Parce que le compilateur force une bonne structure, les tests sont naturellement propres : [[Tester en Rust]].

---

**Ressources**

- [The Rust Book](https://doc.rust-lang.org/book/) — la référence principale
- [Rust By Example](https://doc.rust-lang.org/rust-by-example/) — apprendre par le code
- [std docs](https://doc.rust-lang.org/std/) — la librairie standard

**Prochains sujets**

- Structs et enums
- Pattern matching
- Lifetimes (suite du borrowing)
- Traits
