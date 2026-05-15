---
tags:
---

## Définition

Le Bus Factor (aussi appelé "Truck Factor" ou "Lottery Factor") est le **nombre minimal de personnes qui devraient quitter un projet pour le faire s'effondrer** faute de connaissance.

> Si cette personne se faisait renverser par un bus demain, que se passerait-il ?

Un Bus Factor de **1** est la situation la plus critique : une seule personne porte une connaissance essentielle que personne d'autre ne peut reprendre.

L'origine du terme remonte à 1994, lors de discussions sur Python : que se passerait-il si Guido van Rossum (créateur du langage) disparaissait ?

---

## Ce que le Bus Factor mesure vraiment

Il mesure la **concentration de connaissance** dans une équipe, pas sa taille. Une équipe de 10 développeurs peut avoir un Bus Factor de 1 si un seul développeur comprend le système de paiement critique. Une équipe de 3 peut avoir un Bus Factor de 3 si chacun maîtrise toutes les parties du système.

Ajouter des personnes ne résout pas automatiquement un Bus Factor faible. Si les nouveaux arrivants travaillent sur de nouvelles fonctionnalités pendant que la personne critique reste seule sur son périmètre, le risque reste entier.

---

## Exemples concrets

### Développement
Alice est la seule à comprendre le système de base de données legacy. Elle connaît le schéma, les optimisations non documentées, les bugs connus et leurs workarounds. Si Alice part, personne ne peut maintenir ce système.

### Open source
L'incident **left-pad** de 2016 : un développeur unique a retiré un package NPM minuscule. Des milliers de projets dans le monde ont cassé. Bus Factor de 1 pour une dépendance critique de tout l'écosystème JS.

---

## Comment l'évaluer

1. Identifier les parties critiques du système (performance, données, sécurité, fonctionnalités clés)
2. Pour chaque partie : combien de personnes peuvent intervenir dessus de façon autonome ?
3. Les parties avec un seul "owner" sont vos Bus Factor 1

Des outils d'analyse Git peuvent calculer le Bus Factor en mesurant la concentration des commits par fichier ou module.

---

## Comment l'améliorer

- **Documentation** : documenter les décisions, les workarounds, l'architecture
- **Pair programming** : travailler à deux sur les parties critiques pour partager la connaissance
- **Code review** : forcer plusieurs personnes à lire et comprendre chaque partie du code
- **Rotation** : faire tourner les responsabilités sur les différentes parties du système
- **Tests** : un code bien testé est plus facile à reprendre par quelqu'un qui ne le connaît pas

---

## Dimension personnelle

Le Bus Factor joue dans les deux sens. Être la seule personne à maîtriser une partie critique d'un système peut sembler une position de force, mais c'est aussi une fragilité pour le projet et parfois une pression implicite pour rester. Le vrai signe de séniorité, c'est de rendre son savoir partageable.

En tant que freelance, avoir un Bus Factor faible sur ta mission peut être un argument de mission (tu es indispensable), mais c'est un risque réel si tu pars ou si tu es indisponible.

---

## Lien avec d'autres concepts

- **Loi de Goodhart** : si on mesure le Bus Factor comme une cible, les gens documenteront pour cocher la case sans vraiment partager la connaissance
- **Méthode Mikado** : un refactoring bien graphé et documenté réduit le Bus Factor sur cette transformation
  
## Sources

- [Bus Factor: Definition, Meaning, and How to Calculate It for Software Teams \| ContributorIQ Blog](https://contributoriq.com/blog/what-is-bus-factor-how-to-calculate-measure)
- [What Is the Bus Factor, Why It Matters and How to Increase It - Swimm](https://swimm.io/learn/developer-experience/what-is-the-bus-factor-why-it-matters-and-how-to-increase-it)
- [Bus Factor \| Laws of Software Engineering](https://lawsofsoftwareengineering.com/laws/bus-factor/)
- [Bus Factor: A Human-Centered Risk Metric in the Software Supply Chain](https://www.cesarsotovalero.net/blog/bus-factor-a-human-centered-risk-metric-in-the-software-supply-chain.html)

---

## À faire

- [ ] Trier : garder / promouvoir en Note Permanente / supprimer
- [ ] Relier à "Loi de Goodhart"
- [ ] Évaluer honnêtement le Bus Factor sur ma mission actuelle
