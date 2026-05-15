---
created: 2025-05-15 00:00
type: fleeting
status: to-process
tags: [inbox, management, metrics, loi-de-goodhart, craft, lyon-craft-2025]
sources:
  - https://lawsofsoftwareengineering.com/laws/goodharts-law/
  - https://axify.io/blog/goodhart-law
  - https://jellyfish.co/blog/goodharts-law-in-software-engineering
  - https://www.teksidia.com/articles/metrics--goodharts-law-in-software-development.html
---

# Loi de Goodhart

## Formulation

> "When a measure becomes a target, it ceases to be a good measure."
> - Charles Goodhart, économiste britannique

En français : **quand une mesure devient un objectif, elle cesse d'être une bonne mesure.**

---

## Origine

Formulée par l'économiste Charles Goodhart dans le contexte de la politique monétaire britannique dans les années 1970. Depuis, elle s'applique à tous les domaines qui utilisent des métriques pour piloter des comportements.

---

## Pourquoi ça arrive

Quand une métrique devient un objectif, les individus et les systèmes optimisent pour **atteindre la métrique**, pas pour atteindre le but réel que la métrique était censée mesurer. Dès que la pression (bonus, emploi, évaluation) est liée à une métrique, la créativité humaine s'applique à la gonfler plutôt qu'à résoudre le vrai problème.

L'exemple classique : **l'effet cobra en Inde**. Le gouvernement britannique colonial offrait une prime pour chaque cobra mort afin de réduire la population de serpents. Les habitants ont commencé à élever des cobras pour toucher la prime. Résultat : plus de cobras qu'avant.

---

## Exemples concrets en développement

### Story points
Objectif initial : estimer la complexité relative.
Dégradation : le management mesure la "productivité" en story points. Les développeurs gonflent leurs estimations. Les story points montent, la productivité réelle stagne.

### Coverage de tests
Objectif initial : mesurer la couverture du code par les tests.
Dégradation : l'objectif est "80% de coverage". Les devs écrivent des tests vides ou sans assertions pour atteindre le chiffre. Le coverage monte, la qualité des tests reste nulle.

### Nombre de commits / lignes de code
Objectif initial : mesurer l'activité.
Dégradation : on écrit du code verbeux et redondant pour gonfler les lignes. On crée des microfixes pour gonfler les commits.

### Tickets fermés
Objectif initial : mesurer la résolution des problèmes.
Dégradation : on ferme des tickets non résolus, ou on split un bug en 5 sous-tickets pour gonfler le nombre.

---

## Ce que ça implique pour les métriques

Une métrique est utile comme **indicateur**, pas comme **cible**. Dès qu'elle devient une cible avec des conséquences, elle se corrompt.

Quelques principes pour résister à la loi de Goodhart :
- Combiner plusieurs métriques complémentaires plutôt qu'une seule
- Lier les métriques à des **outcomes** (résultats business, satisfaction utilisateur) plutôt qu'à des outputs (lignes de code, tickets fermés)
- Ne jamais traiter une métrique comme une vérité absolue, toujours l'interpréter en contexte
- Rester vigilant sur les effets de bord quand une nouvelle métrique est introduite

---

## Application au travail en équipe

La loi de Goodhart est aussi un outil de lecture des organisations. Quand tu vois une équipe optimiser pour des chiffres au détriment du vrai travail, c'est souvent la loi de Goodhart à l'œuvre. La question à poser : quel comportement ce système de mesure est-il en train d'incentiver réellement ?

---

## À faire

- [ ] Trier : garder / promouvoir en Note Permanente / supprimer
- [ ] Relier à "Bus Factor" (deux lois liées à la gestion d'équipe)
- [ ] Réfléchir aux métriques utilisées sur la mission et lesquelles pourraient se corrompre
