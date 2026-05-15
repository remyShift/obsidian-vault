---
created: 2025-05-15 00:00
type: fleeting
status: to-process
tags: [inbox, tdd, testing, craft, lyon-craft-2025]
---

# TDD et au-delà - Gamble TDD & Méthode Mikado

## Idée brute

### Gamble TDD
Variante du TDD classique basée sur le pari : avant de lancer les tests, on parie sur leur résultat (passent / échouent). Peu importe le résultat, on commit.

Effets recherchés :
- Encourage les **baby steps** : petites transformations atomiques
- Pousse à **lancer les tests souvent**
- Force à **comprendre le résultat** des tests, pas juste les lancer
- Permet de **revenir vite à l'état initial** si ça part dans le mauvais sens

Contraintes self-imposées :
- Pas de valeurs par défaut dans le code de prod
- 1 transformation = modifier environ 1 ligne

### Méthode Mikado
Technique pour aborder une transformation trop grosse pour être faite d'un coup.

Processus :
1. Tenter la transformation souhaitée
2. Constater qu'elle ne peut pas se faire en une seule passe
3. Identifier et comprendre les contraintes qui bloquent
4. Refactorer pour lever ces contraintes, puis réessayer

L'idée centrale : on ne force pas le changement, on prépare le terrain.

## Contexte

Conférence **Lyon Craft 2025**. Talk sur le TDD et ses extensions pratiques.

## À faire

- [ ] Trier : garder / promouvoir en Note Permanente / supprimer
- [ ] Relier à des notes existantes si pertinent
- [ ] Définir l'action concrète qui en découle (si applicable)
