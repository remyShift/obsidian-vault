---
date: 2024-09-04
likes: 14
comments: 10
reposts: 0
impressions: 694
url: https://www.linkedin.com/feed/update/urn:li:activity:7236997497108254720/
tags: [Linkedin]
---

Toujours sur mon apprentissage de NextJS aujourd'hui on parle " special file " ! 👇🏼

La dernière fois je parlais du routing via l'organisation de dossier aujourd'hui on voit ce qu'on peut mettre dans ces dossiers.

Alors c'est quoi ces fichier spéciaux ? (je préfère la version anglaise)

C'est tout ces fichiers qu'on peut mettre dans notre src/app qui vont rendre de l'UI à notre utilisateur.

Dans un premier temps on retrouve le " page.tsx ".

C'est le fichier de base celui qui mis dans un dossier (/ donc une route) sera display à notre utilisateur.

Ensuite on a le " layout.tsx ", il contient des éléments qui seront partagé entre plusieurs " page.tsx ".

Par exemple on fait un groupe de route et dans ce groupe de route on ajoute un " layout.tsx " avec un header et un footer. On aura donc toutes les pages de ce groupe de route qui auront le header et le footer correspondant à ce " layout.tsx ".

C'est aussi très utile pour des routes dynamiques ou encore pour avoir une sidebar partagée sur toute notre site.

De plus dans le même genre que le layout on a le " template.tsx ".

La différence avec le layout est que le le layout garde le state tel quel si on va d'une page à une autre qui se partage le même layout.

Le template lui va mount dans le DOM une nouvelle instance et le DOM est donc re render ce qui veut dire que le state n'est pas préservé.

De plus on a le " loading.tsx ", c'est de l'UI qui est rendu le temps qu'une " page.tsx " s'affiche. Si par exemple elle attends des données pour s'afficher complètement.

Enfin on a le " error.tsx ", qui pour être bref, est de l'UI afficher à notre utilisateur si une page " throw " une erreur.

Les fichier error n'écrivent pas par-dessus les layouts ou templates ce qui veut dire que le reste de notre app reste fonctionnel si besoin.

Dans un file " error.tsx " on peut ajouter un bouton qui prendra une fonction " reset " qui nous amènera sur la page précédent l'erreur.

J'ai essayé d'être le plus concis possible tout en mettant en pratique cette citation :

" Ce que l'on conçoit bien s'énonce clairement et les mots pour le dire arrivent aisément. "

👉🏼 Si vous avez des questions ou je n'ai pas été claire n'hésitez pas à me le dire en commentaire !

Un des moyens d'apprendre est d'expliquer et c'est ce que j'essaye avec ces posts.

- - -

🚀 Si tu me découvres moi c'est Rémy, j'ai 24ans, et ça fait 2ans que je suis passionnée de développement informatique.

Suis mon aventure pour rejoindre le monde des développeurs début 2025 avec

Road2BeDev !

- - -

![](https://media.licdn.com/dms/image/v2/D4E22AQE6k2UWWpO02w/feedshare-shrink_800/feedshare-shrink_800/0/1725434659083?e=1779321600&v=beta&t=cmODpyKkvNDUwXrXgGSmBVgSGcISTnkoq-aZQuG0yMc)
