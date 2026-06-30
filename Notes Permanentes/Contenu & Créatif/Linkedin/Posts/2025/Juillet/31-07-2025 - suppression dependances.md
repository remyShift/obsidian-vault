---
date: 2025-07-31
likes: 14
comments: 2
reposts: 0
impressions: 982
url: https://www.linkedin.com/feed/update/urn:li:activity:7356571918784700416/
---

Hier j'ai enfin pu m'y mettre. Et j'ai fait ce que j'avais annoncé.

J'ai retiré la dépendance directe entre mon hook useAuth et mon ancien SupabaseAuthService.

Fini le mock obligatoire pour tester quoi que ce soit.

Désormais, entre les deux, j'ai une couche intermédiaire.

Une classe que j'ai appelé AuthInterface.

Elle a les même fonctions d'authentification que le service mais fait de l'inversion de dépendance comme montré précédemment.

Le hook utilise cette interface, et l'interface, elle, dialogue avec ce qui était avant mon "service", renommé AuthProvider.

C'est beaucoup plus testable, chose que je me suis empressé de faire aussi hier en parallèle.

Beaucoup plus souple.

Et ça m'a forcé à poser des mots plus clairs sur mon architecture.

Alors j'ai aussi revu mon naming :

→ Les actions qui communiquent avec le backend, je les place maintenant dans ce que j'appelle le domain.

→ Les actions métier qui n'ont rien à voir avec le backend (comme convertir une pointure US → EU), je les appelle des services.

→ Et les couches intermédiaires entre mes hooks et mon "backend" sont devenues des interfaces.

Je ne prétends pas suivre une architecture parfaite.

Je me base sur ce que j'apprends au fur et à mesure.

Mais ça me semble plus clair, plus cohérent.

Et surtout, ça me permet d'avancer proprement.

Par contre, je doute encore du naming.

Je ne sais pas si c'est aligné avec les conventions du DDD ou de la clean architecture.

Donc si t'as des ressources ou une meilleure terminologie, je prends avec plaisir ! 🙏🏼

Je sens que cette refonte va me permettre d'aller beaucoup plus loin sur KicksFolio.

- - -

🚀 De noob à expert suis mon parcours pour rejoindre le monde des développeurs au travers de mes posts !

- - -
