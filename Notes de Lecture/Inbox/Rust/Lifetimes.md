---
tags:
  - Rust
  - LangagesDeProgs
---
## Ce qu'il faut comprendre

Les lifetimes ne sont pas un concept nouveau que Rust invente : toute référence a une durée de vie. Ce que Rust fait, c'est rendre cette durée de vie vérifiable à la compilation. Le compilateur doit être capable de garantir qu'une référence ne pointera jamais vers de la mémoire qui a déjà été libérée.

La plupart du temps, le compilateur infère les lifetimes tout seul. Les annotations explicites (`'a`) n'apparaissent que quand le compilateur ne peut pas le déduire seul.

## Le problème que les lifetimes résolvent

```rust
fn plus_long(x: &str, y: &str) -> &str {
    if x.len() > y.len() { x } else { y }
}
```

Ce code ne compile pas. Le compilateur ne sait pas si la référence retournée vivra aussi longtemps que `x` ou que `y`. Si l'appelant utilise le résultat après que l'une des deux variables est droppée, c'est un bug critique.

## Les annotations de lifetime

Une annotation `'a` dit : "cette référence vivra au moins aussi longtemps que `'a`".

```rust
fn plus_long<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

`'a` ici signifie : "la durée de vie du résultat est contrainte par la plus courte des durées de vie de x et y". Le compilateur peut maintenant vérifier que l'appelant n'utilise pas le résultat trop longtemps.

## Lifetimes dans les structs

Quand une struct contient une référence, elle doit déclarer une lifetime. Sinon le compilateur ne sait pas combien de temps la struct peut exister.

```rust
struct Excerpt<'a> {
    content: &'a str,
}
```

Cela signifie : une instance de `Excerpt` ne peut pas vivre plus longtemps que la `str` qu'elle référence.

## Lifetime elision : quand tu n'as pas besoin d'annoter

Le compilateur applique des règles d'inférence automatiques appelées "lifetime elision rules". Dans la majorité des fonctions simples, tu n'as pas besoin d'écrire les annotations.

```rust
fn first_word(s: &str) -> &str {  // pas d'annotation nécessaire
    // le compilateur infère que le résultat a la même lifetime que s
}
```

Les annotations explicites n'apparaissent que quand ces règles d'inférence ne suffisent pas, comme dans l'exemple `plus_long` ci-dessus.

## `'static` : la lifetime spéciale

`'static` signifie "vit pendant toute la durée du programme". Les string literals (`"hello"`) ont une lifetime `'static` parce qu'elles sont compilées dans le binaire.

```rust
let s: &'static str = "je vis pour toujours";
```

Attention : quand le compilateur te suggère d'ajouter `'static` pour corriger une erreur, c'est rarement la bonne solution. C'est souvent un signal que la conception doit être repensée.

## Questions à se poser après lecture

- Pourquoi le compilateur ne peut-il pas inférer la lifetime dans l'exemple `plus_long` ?
- Quelle est la différence entre une lifetime et un scope ? Est-ce la même chose ?
- Dans quel cas tu préfèrerais que ta struct possède une `String` plutôt que de contenir une référence `&str` avec une lifetime ?
- Que signifie concrètement qu'une lifetime `'a` est la "plus courte" entre deux lifetimes ?

---

**Ressource principale** : [The Rust Book - Ch. 10.3 : Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)