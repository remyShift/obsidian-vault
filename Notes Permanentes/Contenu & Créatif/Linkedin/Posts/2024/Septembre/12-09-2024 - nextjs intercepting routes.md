---
date: 2024-09-12
likes: 9
comments: 3
reposts: 0
impressions: 448
url: https://www.linkedin.com/feed/update/urn:li:activity:7239896833232187392/
tags:
  - Linkedin
---

Intercepter une route en NextJS, mais pourquoi et comment ? Je t’explique ça 👇🏼

Disons que l'on veuille passer de la route "accueil" à la route "login".

Mais on souhaite que lors du passage d'accueil à login, la page de login soit affichée en tant que 𝗺𝗼𝗱𝗮𝗹𝗲, avant que, si on fait un rafraîchissement, elle prenne toute la page comme c’est le cas normalement.

Ok, mais 𝗽𝗼𝘂𝗿𝗾𝘂𝗼𝗶 faire ça ?

Déjà, cela nous permet de créer des modales via le routage de notre site tout en gardant le 𝗰𝗼𝗻𝘁𝗲𝘅𝘁𝗲 en arrière-plan.

Et 𝗰𝗼𝗺𝗺𝗲𝗻𝘁 on fait ?

On a vu dans un précédent post que NextJS utilise l’organisation de fichiers et de dossiers (dans le dossier `src/app`) pour le routage.

Dans notre cas, nous aurions donc une première route avec `𝘀𝗿𝗰/𝗮𝗽𝗽/𝗮𝗰𝗰𝘂𝗲𝗶𝗹`.

Et une seconde route avec `𝘀𝗿𝗰/𝗮𝗽𝗽/𝗮𝗰𝗰𝘂𝗲𝗶𝗹/𝗹𝗼𝗴𝗶𝗻`.

Chacun de ces dossiers contient à l’intérieur un fichier `page.tsx` qui est l’UI affichée à notre utilisateur.

Ajoutons désormais, dans le dossier de départ d’où se fait l’interception (dans notre cas `src/app/accueil`), un nouveau dossier nommé `(.)𝗹𝗼𝗴𝗶𝗻` avec son fichier `page.tsx` qui sera notre modale.

Le `(.)` devant le nom du dossier indique à NextJS qu’il s’agit de 𝗹’𝗶𝗻𝘁𝗲𝗿𝗰𝗲𝗽𝘁𝗶𝗼𝗻 𝗱’𝘂𝗻𝗲 𝗿𝗼𝘂𝘁𝗲, et le nom du dossier qui suit précise quelle route doit être interceptée.

Désormais, lors du passage de "accueil" à "login", ce sera 𝗹’𝗨𝗜 𝗱𝘂 𝗳𝗶𝗰𝗵𝗶𝗲𝗿 `𝗽𝗮𝗴𝗲.𝘁𝘀𝘅` 𝗱𝗮𝗻𝘀 `(.)𝗹𝗼𝗴𝗶𝗻` que notre utilisateur verra.

Et dans notre cas, ce sera donc 𝗹𝗮 𝗺𝗼𝗱𝗮𝗹𝗲 𝗱𝗲 𝗹𝗼𝗴𝗶𝗻.

À noter que dans cet exemple, je parle de modale car c’est le cas le plus courant, mais l’interception peut afficher tout type d’UI.

👉🏼 Et toi, quelle est la dernière chose que tu as apprise ?


#NextJS 
#ReactJS 
#Code 
#Javascript

---

🚀 Si tu viens de me découvrir, moi c’est Rémy et cela fait 2 ans que je suis passionné de développement informatique.

𝗦𝘂𝗶𝘀 𝗺𝗼𝗻 𝗮𝘃𝗲𝗻𝘁𝘂𝗿𝗲 à travers mes posts LinkedIn pour, un jour, rejoindre le monde des développeurs 
#Road2BeDev.

---

![](https://media.licdn.com/dms/image/v2/D4E10AQEcpA_BCiC0ZQ/image-shrink_800/image-shrink_800/0/1726125915471?e=1778446800&v=beta&t=LIcCzd6YDEBBjDC6wZho8d9S-caIuk-tATyUdsxgDSw)
