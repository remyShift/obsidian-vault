---
date: 2025-05-05
likes: 13
comments: 11
reposts: 0
impressions: 901
url: https://www.linkedin.com/feed/update/urn:li:activity:7325047853658038273/
tags:
  - Linkedin
---

Ce week-end j’ai remis les mains dans KicksFolio ! Je t’explique ce que j’ai fais 👇🏼


Déjà il m’a fallu un bon moment pour tout reprendre, je me suis relu le gros de mon code pour me le remettre en tête et avoir à nouveau une idée du chantier qu’il m’attends.

Pour information la dernière fois que j’avais touché à mon code j’avais implémenté des tests sur tout ce qui marchait actuellement sur mon app.

J’avais aussi commencé le refacto en faisant des sortes de « services » côté front qui étaient des classes comprenant différentes méthodes.

Par exemple j’ai un « service » qui va être donc une classe qui va gérer les users, que ça soit la création, édition, suppression etc, un autre qui va se charger de gérer la validations des champs inputs et ainsi de suite.

🚨TW pour le puristes : J’utilise sans doute le mot « service » à tort d’où les guillemets. J’avoue n’avoir qu’une idée vague de ce que serait une architecture de micro service et qui seraient sans doute overkill pour mon application, le but est surtout que j’ai un truc propre, bien découpé et structuré pour que je m’y retrouve, chose qui était loin d’être le cas.

Bref ça nous dit toujours pas ce que j’ai fais ce week-end.

J’ai finis mes « services ».

Quand j’ai repris le code mes tests échouaient car ils testaient l’ancienne architecture.

Je les ai donc adapté au fur et à mesure pour tester plutôt par « services », ainsi que les mocks qui n’étaient plus accurate.

Et c’était déjà beaucoup, le plus dur a été de se remettre la tête dedans et de comprendre la merde que j’avais laissé.

Maintenant il me reste plus qu’à passer à la partie la plus compliqué à mon sens ou du moins celle qui m’effraie le plus : refacto mes composants front.

Et c’est ce que j’attaquerais demain !

(non les noms de mes tests ne sont pas les noms de mes services).

👉🏼 Dans le premier commentaires tu trouveras une vidéo (mal compressé) de où j’en étais sur KicksFolio !

Hésite pas à me donner tes conseils en commentaires sur comment aborder la suite du refacto !

- - - 

🚀 De noob à expert suis mon parcours pour un jour rejoindre le monde des développeurs au travers de mes posts et avec 

- - -

![](https://media.licdn.com/dms/image/v2/D4E22AQHJhocw2U8eXw/feedshare-image-high-res/B4EZadFSzTHoAs-/0/1746392133401?e=1779321600&v=beta&t=emL4lFwWI6WLdGSqgdIN794pMGpN6onkIFG-5pKyXwA)
