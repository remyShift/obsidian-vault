---
tags: [SoftwareCraft, CodeLegacy]
---

Créée par **Ola Ellnestam et Daniel Brolund**, formalisée dans leur livre *The Mikado Method* (Manning). Le nom vient du jeu de mikado (pick-up sticks) : tu ne peux pas attraper un bâton sans faire bouger les autres. Si tu forces, tu perds. La bonne approche c'est de comprendre ce qui bloque, et de commencer par là.

---

La méthode Mikado permet d'aborder des refactorings trop gros pour être faits en une seule transformation sans tout casser. Elle s'applique particulièrement aux changements qui prennent des jours, des semaines, voire des mois.

L'idée centrale : **ne pas forcer le changement, préparer le terrain.**

Le code doit rester dans un état stable et fonctionnel à chaque étape. Le revert n'est pas un échec, c'est une partie intégrante de la méthode.

---

## Le problème qu'elle résout

On veut faire une modification. On commence, et très vite on réalise que ça touche à d'autres choses, qui touchent à d'autres choses. On se retrouve avec un build cassé, 10 fichiers ouverts, une diff illisible.

Comme le décrit Martin Reigosa : *"whenever we fixed 1 problem, 2 more arose. We found ourselves sinking into quicksand."*

Les réponses habituelles sont mauvaises :

- Continuer quand même et espérer que ça tienne
- Committer dans un état intermédiaire bancal
- Tout annuler à la main en espérant ne rien oublier

---

## Le cycle de base

```
1. Définir l'objectif clairement
2. Tenter la transformation directement
3. Observer ce qui casse ou bloque
4. Ajouter ces blocages comme prérequis dans le graphe
5. Revenir à l'état initial (git reset --hard)
6. Traiter un prérequis (feuille du graphe) - recommencer depuis 1
7. Une fois un prérequis complété avec tous les tests au vert : commit
8. Remonter dans le graphe jusqu'à l'objectif principal
```

Point clé sur les premières itérations : elles servent à **découvrir**, pas à pousser du code. Chaque revert rapporte de l'information sur la structure réelle du problème.

### La contrainte des time slots

Vinta Software utilise des blocs de **10 minutes** par itération. Si le goal n'est pas atteint à la fin du timer, on revert et on documente. Cette contrainte force à rester dans des baby steps et à ne jamais accumuler trop de WIP — même logique que Kanban appliqué au code.

---

## Le Graphe Mikado

La représentation visuelle des dépendances. On part de l'objectif en haut, et on descend vers les prérequis.

```
[Objectif principal]
 └── [Prérequis A]
    └── [Prérequis A1]  ← feuille (aucun enfant) : on commence ici
    └── [Prérequis A2]  ← feuille
 └── [Prérequis B]      ← feuille
```

Le graphe a aussi un effet secondaire : il constitue une roadmap lisible par les autres membres de l'équipe pour suivre l'avancement d'un refactoring complexe.

---

## Ce que ça change en pratique

- Le code compile et les tests passent **à chaque étape**
- Les commits sont petits, atomiques, avec des messages qui correspondent exactement à un prérequis du graphe
- On a une **carte** de ce qu'il reste à faire, pas juste une intuition
- Les interruptions ne coûtent presque rien : on reprend au dernier nœud en cours
- Ça facilite les pull requests partielles sur de gros refactorings

---

## Une nuance importante

La méthode pousse à ne faire **que ce qui est nécessaire** pour atteindre l'objectif. Certaines tâches qu'on a envie de faire pendant un refactoring, renommer des variables, améliorer la lisibilité ailleurs, uniformiser les conventions, ne sont pas des prérequis. Elles n'apparaissent pas dans le graphe Mikado. Les faire serait du scope creep déguisé.

Traiter chaque feuille en cycle [[TDD|rouge/vert/refactor]] garantit que le code reste vert à chaque étape et que les baby steps restent vraiment petits.
