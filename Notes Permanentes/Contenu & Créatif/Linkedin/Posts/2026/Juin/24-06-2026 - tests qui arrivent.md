---
date: 24-06-2026
likes: 14
comments: 8
reposts: 1
impressions: 1093
url: https://www.linkedin.com/posts/remy-cassagne_malgr%C3%A9-le-post-dhier-des-tests-commencent-activity-7475438863315025920-rkYj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEe2QnwBdGCTQ_9nepGZI7rLcUupSImAgo8
tags:
  - Linkedin
---

Des tests commencent à apparaître dans notre code base, alors dit comme ça c'est pas glamour, je sais.

C'est un projet où pendant longtemps "on ajoutera les tests plus tard" était la norme.

Contraintes de startup, dette assumée, on livre d'abord et on verra, tu connais la chanson.

Et là les premiers vrais tests débarquent, on est loin d'une couverture complète, très loin, plein de flows critiques tournent encore à nu.

Mais y'a un basculement, le test arrête d'être le truc qu'on se promet, il devient le truc qu'on fait.

Le moment où j'ai compris l'intérêt, c'est un débat en réunion sur un bug en prod.

La question c'était pas "il faut tester", tout le monde était d'accord, c'était plutôt "tester quoi, exactement".

Et c'est là que le vrai sujet est sorti. Un test peut vérifier que ton code fait exactement ce que t'as écrit, passer au vert, pendant que le client, lui, voit un truc cassé.

Le bug venait de là, la donnée existait, un test "est-ce qu'elle est là" serait passé tranquille mais ce que le client avait sous les yeux était faux.

Grâce au Craft je savais ce qui valait le coup d'être testé, pas la mécanique interne, pas le détail d'implémentation qui pète au moindre refacto, mais le comportement métier.

Ce que le produit est censé faire, pour de vrai, du point de vue de la personne en face.

Genre quand un client applique un code promo valide, le total baisse du bon montant.

Ça, c'est une promesse, mais comment c'est branché derrière, on s'en fout, ça peut changer dix fois sans que personne le remarque.

Le Craft me permets d'être plus force de proposition et pertinent sur ce sujet.

Les tests au travers du Craft m'ont pas appris à mieux coder, ils m'ont appris à savoir ce que je veux avant de coder.

C'est pas pareil, et c'est tout le sujet.

T'as un avant/après sur ton rapport aux tests, ou t'es encore team "plus tard" ?
