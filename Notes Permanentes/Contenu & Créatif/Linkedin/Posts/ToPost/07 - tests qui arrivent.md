---
date: 
likes: 
comments: 
reposts: 
impressions: 
url: 
tags:
  - Linkedin
---
Des tests commencent à apparaître dans notre code base.

Alors dit comme ça c'est pas glamour, je sais.

C'est un projet où pendant longtemps "on ajoutera les tests plus tard" était la norme.

Contraintes de startup, dette assumée, on livre d'abord et on verra, tu connais la chanson.

Et là les premiers vrais tests débarquent, on est loin d'une couverture complète, très loin, plein de flows critiques tournent encore à nu.

Mais y'a un basculement, le test arrête d'être le truc qu'on se promet, il devient le truc qu'on fait.

Le moment où j'ai compris l'intérêt, c'est un débat en réunion sur un bug en prod.

La question c'était pas "il faut tester", tout le monde était d'accord, mais cétait plutôt "tester quoi, exactement".

Vérifier qu'une valeur existe, ça suffit pas, la valeur cassée existait bel et bien. Il fallait tester sa forme, ce qu'elle était censée être. Et là je me suis rendu compte que la moitié de mes bugs, c'étaient pas des bugs. C'était moi qui savais pas précisément ce que j'attendais.

Avant je voyais le test comme une corvée. Maintenant je le vois comme le seul moment où je suis forcé de dire à voix haute ce que mon code est censé faire, avant de le faire.

Le test m'a pas appris à mieux coder. Il m'a appris à savoir ce que je veux avant de coder. C'est pas pareil, et c'est tout le sujet.

T'as un avant/après sur ton rapport aux tests, ou t'es encore team "plus tard" ?
