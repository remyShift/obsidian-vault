---
tags:
  - CodeKnowledge
  - Veille
lien: https://youtu.be/Yl0q3k5HwYM?si=Yzr3Bc4xw-y0pFkm
---

## Idée brute

La dette technique c'est une pression dont l'origine est le code, qui impacte la vitesse, la compréhension, la cohérence et le bien-être des développeurs. Elle peut être contractée volontairement (et documentée) ou accidentellement (et donc invisible, donc plus dangereuse).

La clé n'est pas de l'éliminer, mais de la gérer activement, en continu, sans attendre un "freeze" de refonte.

## Contenu clé du podcast

### Les deux types de dette

- **Volontaire et consciente** : on sait qu'on prend un raccourci. On peut la documenter, la planifier, la rembourser. C'est parfois le bon choix (contraintes de temps, client sur le point de churner, apprentissage volontaire d'un junior).
- **Accidentelle** : on ne sait pas qu'on introduit de la dette. Typique du junior, ou de conditions de travail sous pression. Plus dangereuse parce que non observable dans un premier temps.

### La dette n'est pas toujours un problème

Elle le devient quand elle est inconsciente, ou quand on refuse de la regarder en face. Contracter de la dette volontairement dans le bon contexte (valider un MVP, répondre à une urgence business) est une décision d'ingénierie légitime.

Référence mentionnée : **Design Stamina Hypothesis de Martin Fowler** --> sans design, la vélocité monte vite puis décline inexorablement. Avec design, elle démarre plus lentement mais se stabilise à un niveau élevé et prévisible.

Métaphore parlante : construire les Porsches VS construire l'usine qui fabrique des Porsches.

### Gestion en continu vs freeze de refonte

Le point central du podcast : la dette technique se gère **au fil de l'eau, au quotidien**, pas par des sprints dédiés tous les 6 mois. Quand on attend trop, on tombe dans le piège du refactoring superficiel (on améliore les symptômes, pas la cause), ou de la branche de refonte qui ne merge jamais.

**Règles évoquées :**

- Boy Scout Rule (Uncle Bob, Clean Code) : laisser le code plus propre qu'on ne l'a trouvé (cf [[L'Exemplarité]])
- Ygor Bugayenko : laisser le code avec plus de tests qu'on ne l'a trouvé

### Comment gérer concrètement

1. **Ressentir le problème** - le feeling de friction dans le code est un signal valide, pas anecdotique
2. **Pause d'analyse** - 10-15 min pour identifier où est la dette, pas foncer dedans à l'aveugle
3. **Tracer un plan avec des étapes discrètes** - chaque étape indépendante, max 30 min, le programme reste fonctionnel à chaque étape
4. **Progressif et itératif** - jamais tout d'un coup

### Strangler Fig Pattern

Méthode de refonte recommandée :

- On écrit le nouveau code en parallèle de l'ancien
- Les deux coexistent
- Une fois le nouveau code couvrant les chemins visés, on supprime l'ancien
- Applicable à l'infra comme à l'applicatif
- Variante agressive : dès qu'on touche un module, on le "strangle" directement

Ce pattern fonctionne mieux quand le système est modulaire. Sur du spaghetti, trouver les frontières devient l'obstacle principal.

### Indicateurs de dette

- **Quantitatif** : croiser le "churn" (fréquence de modification git) avec la taille des fichiers --> les grosses bouboules sur ce graphique = hotspots de dette. Référence mentionnée : outil "SALT" (*à vérifier)*.
- **Qualitatif** : demander aux devs "dans quel module tu détestes travailler ?" --> les réponses convergent et sont souvent révélatrices.

### Dynamiques organisationnelles

- La dette technique est souvent présentée comme "un problème de la tech" pour que le produit ou le business s'en décharge. Faux problème : elle est souvent co-produite par des décisions non-techniques.
- Quand la communication avec le non-tech est bloquée : former une **coalition** interne (les devs qui souffrent le plus, donc les plus verbaux, donc encore mobilisables), exprimer une urgence, et si nécessaire absorber la dette en continu sans en faire un sujet de ticket ou de permission.
- Un dev qui arrive en période d'essai et accepte les mauvaises pratiques pour "faire ses preuves" intègre ces pratiques comme sa nouvelle norme. Fenêtre brisée garantie.

## Ce que ça m'évoque / liens avec ma situation

- Sur Oli's Lab : pas de tests, pas de TypeScript strict, codebase héritée --> la dette est là.
- Le point sur les **branches longues** résonne directement : toute branche qui survit plus d'un ou deux jours est déjà un signal d'alarme.
- Le **strangler pattern** est applicable progressivement, et c'est ce qu'on fait avec NextJS : on écrit le nouveau frontend en cohabitation avec l'ancien en React.
- La **frustration comme signal** : noter les endroits du code où j'éprouve de la résistance. Ce sont les candidats prioritaires.

## À faire

- [ ] Chercher la référence "SALT" et le talk sur les hotspots (probablement Sandi Metz ou une chercheuse OOP)
- [ ] Chercher le talk de Martin Fowler sur le Design Stamina Hypothesis
