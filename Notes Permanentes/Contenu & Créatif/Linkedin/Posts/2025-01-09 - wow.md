---
date: 2025-01-09
likes: 19
comments: 8
reposts: 0
impressions: 1183
url: https://www.linkedin.com/feed/update/urn:li:activity:7283021997758943232/
tags:
  - Linkedin
---

Wow ma mission de stage va me décoiffer ! Je t’explique ça 👇🏼


Depuis Lundi j’ai commencé mon stage chez Spash.

Spash c’est quoi ?

C’est le futur du padel !

Ils filment des match de padels pour après les analyser à l’IA et en sortir des stats pour chaque joueur.

Mon but dans tout ça ?

Fournir un outil de debug pour la team IA.

Ils en avaient déjà un mais qui était pas super beau visuellement.

Lundi on s’est mis d’accord sur ce qu’ils voulaient et j’ai commencé une maquette figma.

Mardi je l’ai finis, modifier ce qu’il fallait en fonction de leur retour et puis j’ai commencé à coder.

Hier, j’ai presque finis l’affichage de la détection de joueur et en le faisant on s’est rendu compte qu’il y avait 2 frames de décalages dans les stats.

Le principe de l’outil est d’avoir une vidéo qui a été analyser à l’IA et afficher sur cette vidéos les différentes informations que l’IA a trouver comme par exemple la détection de la balle ou celle des joueurs.

Pour faire ça j’ai un gros fichier JSON de quelques dizaine de GB qui contient toutes les données trouvées par l’IA.

Il leur faut aussi une représentation 2D du terrain et de la position des éléments.

Et pour finir last but not least, plusieurs timelines en fonctions des événements qu’il se passe durant le match.

Ca leur permettra de voir quels événements se passe en même temps, de naviguer d’évents en évents etc.

Pour faire tout ça j’ai choisi de partir sur Next !

Simple d’utilisation, si je découpe bien mon code ça sera facile pour eux de le maintenir et le scale pour un autre projet qu’ils ont.

Ça m’évite à configurer un serveur backend qui sert juste à récupérer des fichiers locaux (la vidéo et le gros json).

👉🏼 Partages moi ton avis en commentaires et si t’as des features qui t’intéressent que tu voudrais voir !


#Next 
#Spash

- - -

🚀De noob à expert suis mon apprentissage pour un jour rejoindre le monde des développeurs au travers de mes posts !

- - -
