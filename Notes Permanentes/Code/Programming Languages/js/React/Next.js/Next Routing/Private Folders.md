---
tags: [LangagesDeProgs, React, NextJS]
---

⚠️ Un private folder sera exclu de notre routing.

Pour avoir un private folder il suffit de créer dans notre dossier app, un folder avec un`_` devant, ex : `src/app/_lib`.

L'intérêt d'un private folder permets d'avoir des fonctions utiles et éviter ainsi de la répétition dans nos component UI.
- On sépare l'UI logic de la routing logic,
- Avoir une meilleure clarté d'organisation de file d'un projet,
- Pour éviter des conflits de nommage,

**NB :** Si on a besoin cependant d'utiliser un underscore dans notre path il faudra mettre devant le nom de fichier `%5F`, ex : `src/app/%5Flib`.