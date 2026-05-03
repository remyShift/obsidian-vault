---
date: 2025-06-15
likes: 6
comments: 10
reposts: 0
impressions: 677
url: https://www.linkedin.com/feed/update/urn:li:activity:7339901982108790784/
tags:
  - Linkedin
---

T’aimes vivre dangereusement quand tu codes ?


Le genre à pousser du code sans parachute, en espérant qu'il ne s'écrase pas ?

Pas de tests, pas de filet.

Juste toi, tes features… et des bugs qui apparaissaient toujours trop tard.

Quand j’ai commencé KicksFolio c’est ce que je faisais.

Mais après une bonne chute libre il est temps de se sécuriser.

Depuis que j’ai repris mon app, j’ai voulu faire les choses autrement.

Refacto complet → base de code plus saine → temps de penser à la suite.

Et la suite, c’est d’écrire des tests qui tiennent la route.

Je commence par ceux de l’UI : champs invalides, messages d’erreur utilisateur, boutons désactivés, etc …

Je mock les hooks métiers pour me concentrer sur le comportement de l’UI.

Et je les testerais après, en isolant les appels à l’API.

Mais écrire un test, c’est pas cocher une case.

C’est s’assurer qu’il échoue au moins une fois.

Sinon ? Tu valides peut-être un bug sans t’en rendre compte.

Alors je dégrade le code, je casse des conditions, j’envoie de mauvaises données.

Je provoque l’échec.

Et une fois que le test a bien gueulé… là, seulement, je le considère “valide”.

C’est un changement de rythme, mais ça change tout.

J'ai un filet de sécurité et je pourrais faire évoluer mon code sans stress.

D’ailleurs ces nouvelles features je me forcerais à les faire en TDD.

Au moins le test échoue avant l’implémentation donc on ne peut que être sûr que l’ajout de code minimale qu’on apporte est bien validée.

👉🏼 Et toi, t’as une méthode pour être sûr que tes tests font vraiment leur job ?
Curieux de lire comment tu gères ça de ton côté.

- - -

🚀 De noob à expert suis mon parcours pour un jour rejoindre le monde des développeurs au travers de mes posts !

- - -

![](https://media.licdn.com/dms/image/v2/D4E22AQEkNB8gsXtTXw/feedshare-shrink_1280/B4EZdwrR.PG4Ak-/0/1749942084136?e=1779321600&v=beta&t=hhKRTO4LzDdt5JjSh7YRf874Qq8a-LqyF7eGPHM3mao)
