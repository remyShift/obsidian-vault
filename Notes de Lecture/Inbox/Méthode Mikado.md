---
tags:
---
## Origine

Créée par **Ola Ellnestam et Daniel Brolund**, formalisée dans leur livre *The Mikado Method* (Manning). Le nom vient du jeu de mikado (pick-up sticks) : tu ne peux pas attraper un bâton sans faire bouger les autres. Si tu forces, tu perds. La bonne approche c'est de comprendre ce qui bloque, et de commencer par là.

---

## Principe

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

Vinta Software utilise des blocs de **10 minutes** par itération. Si le goal n'est pas atteint à la fin du timer, on revert et on documente. Cette contrainte n'est pas arbitraire : elle force à rester dans des baby steps et à ne jamais accumuler trop de WIP. C'est le même principe que Kanban appliqué au code.

---

## Le Graphe Mikado

La représentation visuelle des dépendances. On part de l'objectif en haut, et on descend vers les prérequis.

```
[Objectif principal]
  └── [Prérequis A]
        └── [Prérequis A1]  ← feuille (aucun enfant) : on commence ici
        └── [Prérequis A2]  ← feuille
  └── [Prérequis B]         ← feuille
```

**On commence toujours par les feuilles** : ce sont les seules transformations sans dépendances non résolues. Une fois une feuille complète et les tests au vert, on la marque en vert, on commit, et on remonte vers son parent.

Le graphe a aussi un effet secondaire : il constitue une roadmap lisible par les autres membres de l'équipe (voire par des non-techs) pour suivre l'avancement d'un refactoring complexe.

---

## Exemple concret (tiré de Vinta Software)

**Contexte** : retirer un modèle Django `DailyProcessingStatus` devenu redondant, référencé dans des dizaines de fichiers et de tests.

**Objectif défini** : chercher `DailyProcessingStatus` dans la codebase ne doit retourner aucun résultat en dehors de la déclaration du modèle lui-même.

**Déroulement** :
1. Timer 10 min. Tentative de suppression directe. Résultat : plusieurs tests cassés.
2. On documente les blocages dans le graphe. On revert avec `git reset --hard`.
3. Plusieurs rounds de 10 min pour cartographier toutes les dépendances.
4. On commence à traiter les feuilles. Premier commit propre.
5. On remonte progressivement. Tous les sous-objectifs passent au vert.
6. L'objectif principal est atteint. La recherche ne retourne plus que la déclaration du modèle.

---

## Ce que ça change en pratique

- Le code compile et les tests passent **à chaque étape**
- Les commits sont petits, atomiques, avec des messages qui correspondent exactement à un prérequis du graphe
- On a une **carte** de ce qu'il reste à faire, pas juste une intuition
- Les interruptions ne coûtent presque rien : on reprend au dernier nœud en cours
- Ça facilite les pull requests partielles sur de gros refactorings

---

## Une nuance importante

La méthode pousse à ne faire **que ce qui est nécessaire** pour atteindre l'objectif. Matthias Noback le souligne : certaines tâches qu'on a envie de faire pendant un refactoring (renommer des variables, améliorer la lisibilité ailleurs, uniformiser les conventions) ne sont pas des prérequis. Elles n'apparaissent pas dans le graphe Mikado. Les faire serait du scope creep déguisé.

---

## Lien avec d'autres pratiques

- Complémentaire au **TDD** : chaque feuille du graphe peut être traitée en cycle rouge/vert/refactor
- Même logique que **Kanban** : limiter le WIP à 1 pour maximiser le débit et garder le process sain
- Complémentaire au **Gamble TDD** : les baby steps correspondent aux feuilles du graphe

---

## Sources

- Livre : *The Mikado Method* - Ola Ellnestam & Daniel Brolund (Manning)
- https://www.vintasoftware.com/blog/the-mikado-method
- https://matthiasnoback.nl/2021/02/refactoring-the-mikado-method/
- https://mreigosa.medium.com/smooth-code-refactors-using-the-mikado-method-a69095988718
