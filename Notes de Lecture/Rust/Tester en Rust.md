---
tags:
  - Rust
  - LangagesDeProgs
---
Rust a un système de tests intégré dans le langage, pas besoin d'installer Vitest ou Jest. `cargo test` suffit. Et parce que Rust t'oblige à modéliser les erreurs explicitement avec [[Result et Option]], les tests sont souvent plus précis qu'en JS : tu vérifies non seulement que ça fonctionne, mais que ça échoue exactement comme prévu.

## La structure d'un test

Un test en Rust c'est une fonction annotée avec `#[test]`. Par convention, les tests vivent dans le même fichier que le code qu'ils testent, dans un module dédié en bas du fichier.

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;  // importe tout ce qui est dans le fichier parent

    #[test]
    fn should_add_two_numbers() {
        assert_eq!(add(2, 3), 5);
    }
}
```

`#[cfg(test)]` dit au compilateur de n'inclure ce module que lors des tests, pas dans le binaire de production. `use super::*` importe les fonctions du fichier parent dans le module de test.

## Les macros d'assertion

```rust
assert!(condition);              // passe si condition est true
assert_eq!(valeur, attendu);     // passe si égaux, affiche les deux valeurs si échec
assert_ne!(valeur, attendu);     // passe si différents
```

`assert_eq!` est ton outil principal. Quand un test échoue, Rust affiche les deux valeurs côte à côte, ce qui rend le diagnostic immédiat.

## Tester un Result

C'est là où ça devient intéressant. Tu peux faire retourner un `Result` à ta fonction de test. Si elle retourne `Err`, le test échoue avec le message d'erreur.

```rust
#[test]
fn should_parse_valid_number() -> Result<(), String> {
    let n: i32 = "42".parse().map_err(|e: std::num::ParseIntError| e.to_string())?;
    assert_eq!(n, 42);
    Ok(())
}
```

Et pour vérifier qu'une fonction échoue correctement :

```rust
#[test]
fn should_fail_on_division_by_zero() {
    let result = diviser(10.0, 0.0);
    assert!(result.is_err());
}
```

## Tester une panique avec should_panic

Certaines fonctions paniquent intentionnellement sur des entrées invalides. Pour tester ça :

```rust
#[test]
#[should_panic(expected = "index out of bounds")]
fn should_panic_on_invalid_index() {
    let v = vec![1, 2, 3];
    let _ = v[10];
}
```

`expected` vérifie que le message de panique contient ce texte. Sans `expected`, n'importe quelle panique fait passer le test.

## Tests d'intégration

Pour les tests qui testent plusieurs modules ensemble, Rust utilise un dossier `tests/` à la racine du projet. Chaque fichier dans ce dossier est un crate de test indépendant.

```
mon_projet/
  src/
    main.rs
    lib.rs
  tests/
    integration_test.rs   ← tests d'intégration
```

```rust
// tests/integration_test.rs
use mon_projet::add;  // importe depuis le crate public

#[test]
fn test_add_from_outside() {
    assert_eq!(add(2, 3), 5);
}
```

La différence clé : les tests dans `src/` ont accès aux fonctions privées. Les tests dans `tests/` n'ont accès qu'à l'API publique, exactement comme un consommateur externe de ta librairie.

## Lancer les tests

```bash
cargo test                    # tous les tests
cargo test nom_du_test        # un test spécifique par nom
cargo test -- --nocapture     # affiche les println! pendant les tests
```

## Ce que ça change par rapport à JS

En JS, tu peux tester du code mal structuré. Tu peux mocker n'importe quoi, contourner les dépendances, patcher des modules au runtime. En Rust, le compilateur t'oblige à structurer ton code de façon testable dès le départ : pas d'effets de bord cachés, pas d'état global implicite. Si une fonction est difficile à tester, c'est un signal que sa conception est mauvaise, pas qu'il faut un meilleur outil de mock. C'est ça, le craft en Rust.

L'ownership et le borrowing ([[Ownership]], [[Borrowing et références]]) forcent à penser en termes de responsabilités claires, ce qui rend les tests naturellement simples.

---

**A lire** : [The Rust Book - Writing Automated Tests](https://doc.rust-lang.org/book/ch11-00-testing.html)

**Exercice** : écris une fonction `fn est_pair(n: i32) -> bool` et trois tests pour elle : un qui passe avec un nombre pair, un avec un nombre impair, et un avec zéro. Lance `cargo test` et observe le format de sortie. Qu'est-ce qui te surprend par rapport à Vitest ?
