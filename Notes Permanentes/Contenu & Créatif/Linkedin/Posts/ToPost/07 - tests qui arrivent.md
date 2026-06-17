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

La question c'était pas "il faut tester", tout le monde était d'accord, c'était plutôt "tester quoi, exactement".

Et c'est là que le vrai sujet est sorti. Un test peut vérifier que ton code fait exactement ce que t'as écrit, passer au vert, pendant que le client, lui, voit un truc cassé.

Le bug venait de là. La donnée existait, un test "est-ce qu'elle est là" serait passé tranquille. Mais ce que le client avait sous les yeux était faux.

Ce jour-là j'ai compris ce qui vaut le coup d'être testé. Pas la mécanique interne, pas le détail d'implémentation qui pète au moindre refacto. Le comportement métier. Ce que le produit est censé faire, pour de vrai, du point de vue de la personne en face.

Genre : quand un client applique un code promo valide, le total baisse du bon montant. Ça, c'est une promesse. Comment c'est branché derrière, on s'en fout, ça peut changer dix fois sans que personne le remarque.

Et là je me suis rendu compte que la moitié de mes bugs, c'étaient pas des bugs. C'était moi qui savais pas précisément ce que mon code était censé garantir au client.

Avant je voyais le test comme une corvée. Maintenant je le vois comme le seul moment où je suis forcé de dire à voix haute ce que mon code est censé faire, avant de le faire.

Le test m'a pas appris à mieux coder. Il m'a appris à savoir ce que je veux avant de coder. C'est pas pareil, et c'est tout le sujet.

T'as un avant/après sur ton rapport aux tests, ou t'es encore team "plus tard" ?
