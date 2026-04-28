---
tags:
  - Rust
  - LangagesDeProgs
---
En JS tu gères les erreurs avec `try/catch` et les valeurs absentes avec `null` ou `undefined`.

Rust n'a ni l'un ni l'autre, à la place, les erreurs et l'absence de valeur sont des types ordinaires que le compilateur t'oblige à gérer explicitement.

C'est directement lié à la philosophie de Rust : si quelque chose peut mal se passer, ça doit être visible dans la signature de la fonction comme ça pas de surprise à l'exécution.

## Option : une valeur qui peut ne pas exister

`Option<T>` remplace `null` et `undefined`. Une valeur est soit `Some(valeur)`, soit `None`.

```rust
fn trouver_utilisateur(id: u32) -> Option<String> {
    if id == 1 {
        Some(String::from("Rémy"))
    } else {
        None
    }
}
```

Le compilateur t'interdit d'utiliser la valeur sans vérifier d'abord si elle existe. En JS, tu oublies le check et tu as un `Cannot read property of undefined` à runtime. En Rust, ça ne compile pas.

```rust
let nom = trouver_utilisateur(1);
println!("{}", nom); // ERREUR : tu ne peux pas utiliser Option<String> directement
```

Pour accéder à la valeur, tu dois pattern matcher :

```rust
match trouver_utilisateur(1) {
    Some(nom) => println!("Trouvé : {}", nom),
    None => println!("Pas trouvé"),
}
```

## Result : une opération qui peut échouer

`Result<T, E>` remplace `try/catch`. Une opération retourne soit `Ok(valeur)` si ça s'est bien passé, soit `Err(erreur)` si ça a échoué.

```rust
fn diviser(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division par zéro"))
    } else {
        Ok(a / b)
    }
}
```

La signature dit tout : cette fonction peut échouer, et le type d'erreur est `String`. L'appelant est forcé de gérer les deux cas.

```rust
match diviser(10.0, 2.0) {
    Ok(resultat) => println!("Résultat : {}", resultat),
    Err(e) => println!("Erreur : {}", e),
}
```

## L'opérateur ? : propager une erreur vers le haut

L'équivalent d'un `throw` pour remonter une erreur sans la gérer localement. Il s'utilise dans une fonction qui retourne elle-même un `Result`.

```rust
fn lire_et_parser(path: &str) -> Result<i32, String> {
    let contenu = lire_fichier(path)?; // si Err, retourne l'Err immédiatement
    let nombre = contenu.trim().parse::<i32>().map_err(|e| e.to_string())?;
    Ok(nombre)
}
```

Sans `?`, tu devrais écrire un `match` à chaque étape. Avec `?`, c'est compact et la propagation est explicite.

## Pourquoi c'est important pour les tests

Quand tu testes du code Rust, tu vas souvent tester des fonctions qui retournent `Result` ou `Option`. Comprendre ces types te permet d'écrire des assertions précises sur le comportement attendu : est-ce que la fonction retourne bien un `Ok` avec la bonne valeur, ou bien un `Err` avec le bon message ? C'est ce qu'on voit dans [[Tester en Rust]].

---

**Ressource** : [The Rust Book - Error Handling](https://doc.rust-lang.org/book/ch09-00-error-handling.html)
