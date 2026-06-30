---
date: 2026-07-06
likes:
comments:
reposts:
impressions:
url:
tags:
  - Linkedin
---

Petite question technique, mais je pose le décor d'abord pour ceux qui connaissent pas.

Je bosse avec Payload, un CMS qu'on code en TypeScript.

En gros, tu définis tes contenus et leurs relations, et il te génère une API et les types qui vont avec.

Mon souci est sur les relations.

Quand tu fais une requête avec un "depth" pour aller chercher les données liées, le type que tu récupères dit que la relation est soit un simple ID, soit l'objet complet.

Du coup, à chaque fois que je veux accéder à un champ de la relation, je dois d'abord vérifier "c'est un string ou un objet ?".

Et ça finit par polluer tout mon code.

Je sens que je m'y prends mal, soit y'a un pattern propre pour typer ça selon le depth, soit je rate un truc dans ma façon de modéliser.

Vous gérez ça comment, ceux qui font du Payload ? Type guards partout, un helper dédié, autre chose ?

Je prends toute ressource ou retour d'expérience.

NB : je précise que c'est un soucis interne à Payload pas de ma configuration et que sur le repo de Payload une pr est ouverte depuis un moment visant à fix ça.
