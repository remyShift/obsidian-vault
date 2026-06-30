---
date: 2024-09-03
likes: 12
comments: 3
reposts: 0
impressions: 465
url: https://www.linkedin.com/feed/update/urn:li:activity:7236640690758119424/
tags: [Linkedin]
---

Le code legacy ça te fait peur ? Aller viens je t'explique comment bien l'appréhender ! 👇🏼

Déjà le code legacy c'est quoi ?

Perso j'ai bien aimé la définition qu'on nous donne dans le livre SoftwareCraft : " le code legacy c'est tout code qui ne présente pas de tests ".

En effet, sans tests on a pas de documentation donc on ne connaît pas le comportement attendu du code, si on modifie quelques choses on ne sait pas si on a fait une régression etc etc.

Quand on arrive sur du code legacy, la première étape est de pas paniquer, de se retenir de vouloir tout modifier ce qui nous saute aux yeux et surtout de se délimiter notre champ d'action.

Vouloir refactoriser dès le début c'est rarement une bonne idée on risque de passer à côté de plus gros refacto possible et comme on l'a dit précédemment on a pas encore de tests.

(Pour la suite partons du principe que nous sommes sur du code vraiment spaghettis et donc pas compréhensible au premier abord.)

Lorsque nous allons vouloir tester notre code legacy il est courant d'avoir plusieurs erreurs. Lorsqu'on essaye de les résoudre on se rends compte que finalement le code dans ces erreurs dépends d'autres choses.

Ce sont des dépendances, qu'elles soient facilement identifiable ou non.

Le problème des dépendances est qu'elles compliquent trop l'écriture de nos tests.

C'est pourquoi il va falloir dans un premier temps les identifier pour ensuite les isoler.

Une fois isoler il devient plus aisé d'écrire nos tests avec la mise en place de doublure de tests par exemple.

Lorsqu'on atteint une couverture de test suffisante on va vouloir gérer les dépendances de manière plus propre : on va préférer encapsuler nos dépendances dans des composants injectables par exemple.

Une fois qu'on a nos tests on peut se lancer sur le refactoring de notre code legacy !

NB : Les dépendances peuvent être l'accès à une base de donnée, un appel une API externe, service d'authentification / autorisation …

👉🏼 Et toi t'as déjà travaillé sur du code legacy ? Comment tu t'y es pris ? Dit le moi en commentaire !

- - -

🚀 Si tu me découvres moi c'est Rémy, j'ai 24ans, et ça fait 2ans que je suis passionné de développement informatique.

Suis mon aventure pour rejoindre le monde des développeurs 2025 avec

Road2BeDev !

- - -

![](https://media.licdn.com/dms/image/v2/D4E22AQHWqBfW8FLiOw/feedshare-shrink_800/feedshare-shrink_800/0/1725349589390?e=1779321600&v=beta&t=5ATaj4weDbtNpR8OGrdJuWrzw5RO905bOR0lWLEGP9E)
