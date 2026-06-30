---
date: 2025-07-30
likes: 15
comments: 7
reposts: 0
impressions: 698
url: https://www.linkedin.com/feed/update/urn:li:activity:7356209477458534402/
tags:
  - Linkedin
---

Cette semaine, je devais avancer sur KicksFolio et le refacto de l'architecture…

 Et j'avais promis de vous montrer comment je comptais m'y prendre, et quel était le problème concret auquel je faisais face.

Spoiler : j'ai pas encore autant avancé que je voulais, un test technique m'a occupé en début de semaine.

 Mais aujourd'hui, je m'y mets sérieusement !

Le point de départ c'est une dépendance directe dans la plupart de mes hooks qui m'empêche de tester facilement .

Sur le premier bout de code, on voit que mon useAuth hook dépend directement d'un service SupabaseAuthService.

Ce qui fait que si je veux tester mon hook, je dois mocker tout le service.

C'est lourd, ça crée du couplage, et ça me bloque dès que je veux itérer vite sur du code métier ou tester des cas précis.

Le plan pour améliorer ça c'est d'aller vers une solution plus de testable et indépendante du "comment ?".

L'idée, c'est de faire un pas vers une architecture plus "clean" avec une forme d'inversion de dépendance :

Pour chaque fonction de mon hook dépendante d'un "service", je vais :

- Définir une interface abstraite (nommée temporairement Toto, oui on jugera plus tard 😅)
- Cette interface prend en paramètre une fonction qui implémente l'action métier, ex : signIn(email, password)
- Dans le hook, j'interagis avec l'interface, pas avec SupabaseAuthService directement.

Et c'est ce que je fais sur le second screenshot !

Du coup, pour mes tests, je peux injecter n'importe quelle fonction qui suit le contrat attendu (même une fonction mock inline) sans avoir à mocker un service entier.

Ce que je gagne c'est une logique plus modulaire, des tests plus simples, ciblés et rapides et surtout une base plus saine pour évoluer vers une vraie séparation domaine / infra.

D'ailleurs, si tu as de meilleures idées de nommage que Toto pour ces classes intermédiaires et mes "services", je suis preneur !

👉🏼 Dit moi en commentaires ce que t'en pense ? Si c'est une bonne piste, ce que tu changerais …

- - -

🚀 De noob à expert suis mon apprentissage pour un jour rejoindre le monde des développeurs au travers de mes posts Linkedin !

- - -

![](https://media.licdn.com/dms/image/v2/D4E22AQGII71tvRiV-Q/feedshare-shrink_800/B4EZhYXbE9GwAg-/0/1753829192951?e=1779321600&v=beta&t=jB7h6_I0D1L68m0jbvyqIg3fieSgv4q47aGzBgA-wC0)

![](https://media.licdn.com/dms/image/v2/D4E22AQG6Yb81WimugA/feedshare-shrink_800/B4EZhYXbFqGcAg-/0/1753829193404?e=1779321600&v=beta&t=YlWrv-ALdijnjrcsVcNrwrieECwO2yRXyCJJU5NFRJE)
