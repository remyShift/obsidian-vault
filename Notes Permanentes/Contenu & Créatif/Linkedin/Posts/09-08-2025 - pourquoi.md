---
date: 2025-08-09
likes: 15
comments: 15
reposts: 0
impressions: 867
url: https://www.linkedin.com/feed/update/urn:li:activity:7359833414302072832/
tags:
  - Linkedin
---

Pourquoi je me dois de normaliser la base de données de KicksFolio

Quand j’ai conçu le premier schéma de KicksFolio, mon objectif était clair : aller vite, avoir quelque chose qui fonctionne, et tester l’idée.

Mais j’ai un schéma simple… mais avec des redondances et des champs qui risquaient de poser problème à long terme comme on peut le voir sur l’image.

Hier grâce à un call avec 👾 Romain AGA on a parler de « normalisation de base de données ».

Une notion qui m’était inconnue et qui me parait pourtant, après coup, si évidente.

En gros, c’est l’art de structurer ta base pour éviter la duplication des données, améliorer la cohérence et simplifier les mises à jour.

Exemple concret :
Dans mon schéma actuel, certaines infos des sneakers pourraient se retrouver copiées à plusieurs endroits. 

Ça marche… jusqu’au jour où tu dois corriger une info, et te rendre compte qu’elle est enregistrée en 4 exemplaires différents.

En normalisant, je vais :
• Isoler les entités en tables plus spécifiques (par exemple, une table séparée pour les marques, les tailles, le statut …),
• Supprimer les champs inutiles ou calculables,
• Créer des relations claires pour éviter toute donnée orpheline.

Et je vais aussi éviter de dupliquer mes sneakers. Désormais 1 modèle de sneakers ne pourra être en base de données 1 unique fois et les données variable seront passé au travers d’une table intermédiaire entre mon user et la sneaker.

L’avantage c’est que je vais avoir une base plus propre, plus scalable et prête à accueillir de nouvelles fonctionnalités sans casser l’existant.

L’inconvénient c’est que ça va demander un peu de travail de refacto et de migration… mais c’est un investissement qui évite beaucoup de sueurs froides plus tard.

Après le refacto de me front au tour de mon backend et de la structure de ma base de données !

Bref, passer d’un schéma “rapide à mettre en place” à un schéma “pensé pour durer”, c’est un peu comme passer de sneakers achetées sur un coup de tête à une paire intemporelle qui tient des années.

J’ai de quoi m’occuper ce week end ! Et toi quoi de prévu ce week end ?

- - -

🚀 De noob à expert suis mon parcours pour un jour rejoindre le monde des développeurs au travers de mes posts !

- - -

![](https://media.licdn.com/dms/image/v2/D4D22AQGUxxeZEtkINA/feedshare-shrink_800/B4DZiLmZzHH4Ag-/0/1754688757542?e=1779321600&v=beta&t=_BuJqdg6jxsZhEjZ2B_SYdfDbnu56ljHNoUNL839Z4Q)
