---
date: 2024-09-06
likes: 19
comments: 10
reposts: 0
impressions: 2885
url: https://www.linkedin.com/feed/update/urn:li:activity:7237720488481869824/
tags: [Linkedin]
---

Vous savez comment faire une racine carrée inverse ? Et surtout, pourquoi c'est utile dans les jeux vidéo ? Je t'explique ça 👇🏼

Dans tous les moteurs graphiques, une chose essentielle est la gestion de la lumière et sa réaction avec les objets du décor. 🌟

Pour faire simple, chaque objet 3D possède des vecteurs qui pointent dans différentes directions en fonction de sa géométrie. La lumière interagit différemment en fonction de l'orientation de ces vecteur et surtout de leur taille.

Pour obtenir un éclairage réaliste, tous les vecteurs doivent avoir la même taille, autrement dit être normalisés.

Pour normaliser un vecteur, on doit diviser ses composantes x, y et z par la même valeur, qui est en fait une racine carrée inverse.

Les développeurs de Quake 3 ont mis au point un algorithme ingénieux pour "normaliser" rapidement les vecteurs, afin de simplifier et d'accélérer les calculs de lumière dans le jeu. Cet algorithme est connu sous le nom de Racine Carré Inverse Rapide (ou Fast Inverse Square Root).

Mais pourquoi "rapide" ?

Parce qu'il ne prend que quelques nanosecondes à s'exécuter ! Et c'est crucial : dans un jeu vidéo, ce calcul est effectué des milliers de fois par seconde en fonction des mouvements du joueur. ⏱️

Alors, comment ont-ils réussi à faire ça ?

Les développeurs de Quake 3 ont utilisé un peu de magie noire du langage C. 🔮

Ils ont trouvé un moyen de convertir un float en int grâce à de la manipulation de pointeurs.

Oui, oui, vous avez bien lu !

En modifiant directement les bits d'un nombre flottant, ils ont pu approximativement calculer la racine carrée inverse avec une rapidité et une efficacité impressionnantes. ✨

Pourquoi est-ce important ?

Parce qu'en informatique graphique, chaque milliseconde compte. Plus l'algorithme est rapide, plus le jeu peut tourner de manière fluide sur une grande variété de machines.

Imaginez devoir faire ce calcul lentement à chaque mouvement du joueur le jeu serait injouable !

Et en dehors des jeux vidéo ?

Cet algorithme est tellement efficace qu'il a inspiré de nombreuses autres applications dans des domaines où la rapidité de calcul est essentielle : simulations physiques, intelligence artificielle, imagerie médicale… Il montre que parfois, une optimisation astucieuse peut changer la donne !

Alors, la prochaine fois que vous jouez à un jeu, pensez à ces petites optimisations cachées qui font toute la différence. 😉

👉🏼 Je te mets en commentaires une vidéo qui explique tout ce que je viens de dire un peu plus en détails et qui m'a inspiré pour ce post.

- - -

🚀 Si tu me découvres moi c'est Rémy, j'ai 24ans, et ça fait 2ans que je suis passionné de développement informatique.

Suis mon aventure pour rejoindre début 2025 le monde des développeurs avec

Road2BeDev !

- - -

![](https://media.licdn.com/dms/image/v2/D4E22AQFLEVBrxsywwA/feedshare-shrink_800/feedshare-shrink_800/0/1725607033655?e=1779321600&v=beta&t=yxr1l91x2r8KrTICez3k_nkncvmmVAYwrwvM8eeBH7g)
