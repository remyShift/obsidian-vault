---
created: 2025-05-15 00:00
type: fleeting
status: to-process
tags: [inbox, refactoring, methode-mikado, craft, lyon-craft-2025]
---

# La Méthode Mikado

## Principe

La Méthode Mikado est une technique de refactoring pour aborder des transformations trop grosses pour être faites en une seule fois sans tout casser.

Le nom vient du jeu de mikado : tu ne peux pas attraper un bâton sans faire bouger les autres. Si tu essaies de forcer, tu perds. La bonne approche, c'est d'identifier ce qui bloque, et de commencer par là.

L'idée centrale : **ne pas forcer le changement, préparer le terrain.**

---

## Le problème qu'elle résout

On veut faire une modification dans le code. On commence, et rapidement on réalise que ça touche à d'autres choses, qui touchent à d'autres choses. On se retrouve avec 10 fichiers ouverts, un build cassé, et une diff illisible.

Solutions habituelles (mauvaises) :
- Continuer quand même et espérer que ça tienne
- Tout committer dans un état intermédiaire bancal
- Abandonner et revenir au point de départ à la main

La méthode Mikado donne une alternative structurée.

---

## Fonctionnement

### Le cycle de base

```
1. Tenter la transformation souhaitée
2. Constater ce qui casse ou ce qui bloque
3. Annoter ces dépendances (dans un graphe ou une liste)
4. Revenir à l'état initial propre (git checkout / revert)
5. Traiter une des dépendances identifiées (recommencer depuis 1 sur elle)
6. Une fois les dépendances résolues, faire la transformation initiale
```

Le mot clé à l'étape 4 : **revenir proprement**. Pas de "je garde ça quand même", pas de compromis. L'état du code doit être sain à chaque étape.

### Le graphe Mikado

On représente les dépendances sous forme d'arbre :

```
[Objectif principal]
  └── [Dépendance A]
        └── [Dépendance A1]
        └── [Dépendance A2]
  └── [Dépendance B]
```

On commence toujours par les feuilles (les nœuds sans enfants), car ce sont les seules transformations qu'on peut faire sans prérequis.

---

## Exemple concret

**Contexte** : tu veux migrer une fonction utilitaire vers un nouveau module avec une signature différente. Elle est appelée à 15 endroits dans le code.

**Sans Mikado** : tu changes la signature, tu te retrouves avec 15 erreurs, tu commences à corriger en cascade, tu casses d'autres choses, le build est rouge pendant 2 heures.

**Avec Mikado** :

1. Tu tentes le changement de signature
2. Tu constates : 15 appels cassés, 3 types à mettre à jour, 1 test d'intégration à revoir
3. Tu notes ça dans ton graphe :

```
[Changer signature de formatPrice()]
  └── [Mettre à jour les 15 appels]
        └── [Mettre à jour les types associés]
  └── [Mettre à jour le test d'intégration]
```

4. Tu reverts tout
5. Tu commences par les feuilles : mise à jour des types
6. Commit propre
7. Tu continues feuille par feuille
8. À la fin, tu fais la transformation initiale, et elle passe

---

## Ce que ça change en pratique

- Le code est **toujours dans un état qui compile et tourne** entre chaque étape
- Les commits sont **petits, atomiques, lisibles**
- Tu as une **carte** de ce qu'il reste à faire, pas juste une intuition
- Le revert n'est pas un échec, c'est **partie intégrante de la méthode**

---

## Lien avec d'autres pratiques

- Fonctionne très bien avec le **TDD** : chaque feuille du graphe peut être traitée en cycle rouge/vert/refactor
- Complémentaire au **Gamble TDD** : les baby steps du Gamble TDD correspondent aux feuilles du graphe Mikado
- S'appuie sur une maîtrise de **git** : savoir revenir proprement est non-négociable

---

## À faire

- [ ] Trier : garder / promouvoir en Note Permanente / supprimer
- [ ] Relier à des notes existantes si pertinent
- [ ] Essayer sur un vrai cas de refactoring sur la mission
