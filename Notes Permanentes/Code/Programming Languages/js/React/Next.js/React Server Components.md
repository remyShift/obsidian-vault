> [!info]- Tags
> #LangagesDeProgs #React #NextJS 

React Server Components (*RSC*) ajoute une nouvelle manière de créer des composants en les dissociant en 2 catégories :
## Server Components

Par défaut en Next tout les composants seront des Server Components.

Ils ont la possibilités de fetch des données, exécuter des tâches comme lire des fichier etc ...
- Néanmoins ils n'ont pas la possibilités d'utiliser des hooks ou de gérer des interactions utilisateurs.
## Client Components

Les Client Components nécessiteront l'ajout de `use client` en haut du fichier de notre composant pour que Next sache qu'on veut que ça soit un Client Component.

Ils peuvent aussi fetch des données et exécuter certaines tâches mais ce qui les différencie des Server Components c'est la possibilités qu'ils ont d'utiliser les hooks et gérer les interaction utilisateur.