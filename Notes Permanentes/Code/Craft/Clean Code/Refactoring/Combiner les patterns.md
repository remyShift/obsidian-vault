---
tags:
  - SoftwareCraft
  - CleanCode
  - Refactoring
---

Enchaîner des refactos avec différents patterns permets d'avoir une meilleure vision de notre code jusqu'à petit à petit avoir un forme satisfaisante.

Voici quelques combinaisons fréquentes :

## Refacto pour préparer le suivant

Extraire des variables locales va nous permettre de préparer le terrain pour que l'IDE nous propose une signature pertinente pour une extraction de méthode.

Rassembler tout les return d'une méthode dans une variable temporaire pour faire un extract méthode de notre IDE avant de remettre les return dans notre méthode et effacer notre variable temporaire.

## Dégrader pour améliorer

" Sauter pour mieux reculer "

Refacto c'est accepter de dégrader temporairement pour avoir de meilleurs options d'améliorations par la suite.

- Dégrader permets d'avoir une autre vision de notre code avec une nouvelle compréhension.

### inline + extract method

Inline permets de rassembler tout le code dans un même bloc trop gros et avec trop de responsabilités —> on dégrade donc le code.

Mais cela permets faire l'inventaire de toutes ces responsabilités et donc de les extraire plus aisément avec la méthode extract.

### Extraction de fonction / inlining

Lorsqu'on veut réécrire des occurrences de code cela permets d'avoir une manière de faire plus sécurisé et efficace que de rechercher chaque occurrence et réécrire chaque occurrence.

On va procéder comme suit :

- Identifier le code qu'on veut réécrire,
- Extraire toutes les occurrences de ce code en 1 méthodes,
- réécrire le code dans notre méthode ainsi extraite,
- et enfin " inliner " la méthode en remplaçant toutes les occurrences,

Cela nous permets d'avoir un buffer temporaire plus sûr que de rechercher / remplacer. On va travailler directement au niveau de la logique plus qu'au niveau textuel.
