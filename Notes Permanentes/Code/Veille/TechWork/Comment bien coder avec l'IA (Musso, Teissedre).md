---
tags:
  - CodeKnowledge
  - Veille
event: "Tech'Work"
date: 2026-06-18
speaker: Jean-Baptiste Musso, Florian Teissedre
---

## Idée brute

Bien coder avec l'IA n'est pas une question d'outil, c'est une question de discipline d'ingénieur. L'assistant a toujours besoin d'un cadre, et ce cadre tient sur trois piliers qui existaient déjà avant l'IA mais que celle-ci rend non négociables : la **spécification** (ce qu'on veut), l'**architecture** (ce dans quoi l'IA peut produire), et la **feedback loop** (ce qui valide ce qu'elle produit). Sans ces trois-là, l'IA amplifie surtout le désordre.

## Contenu clé

### Le cadre avant l'outil

Coder avec un assistant IA est une question de discipline d'ingénieur, pas de choix d'outil. L'assistant ne se débrouille bien que si on lui donne un cadre. Tout le talk consiste à décrire ce cadre.

### Pilier 1 : la spécification

- La spécification devient la pièce centrale, pendant que l'implémentation s'efface (elle devient le sous-produit jetable).
- Spécifier n'est pas nouveau : c'est précisément ce que veut dire "faire de l'ingénierie". Le travail d'ingénieur, c'est ça.
- Une spécification **n'est pas un cahier des charges**, et **spécifier n'est pas écrire un prompt ou un .md**. C'est définir précisément le comportement attendu, les contrats, les invariants.
- Mécanique sous-jacente : **le LLM ne devine pas, il échantillonne.** Il tire dans une distribution de probabilités. Plus la spécification est précise, plus l'espace des sorties possibles se contracte, et plus le modèle converge vers ce qu'on veut.
- Formule retenue : on **borne**, on n'amplifie pas. Une bonne spec borne le champ des possibles.

### Pilier 2 : l'architecture

- L'architecture détermine ce que l'assistant **peut** produire. Elle est le contenant.
- Les leviers : modularité et **bounded contexts**, contrats explicites, typage fort, éventuellement archi hexagonale.
- Point clé : tout ça existait avant l'IA, et leur absence nous ralentissait déjà. Aujourd'hui, leur absence rend carrément l'IA inefficace. L'IA ne sauve pas une archi molle, elle en révèle le coût.

### Pilier 3 : la feedback loop

- Elle couvre la validation sur laquelle l'assistant va s'appuyer pour savoir s'il a réussi.
- Question test : "qu'est-ce qu'on garde si demain tout brûle, le code ou les tests ?" Réponse : **le code est jetable, les tests sont permanents.** Les tests sont les seuls actifs qui survivent aux changements.
- Un **test est une spécification exécutable**. C'est le pont entre le pilier 1 et le pilier 3.
- Affirmation discutée du talk : "TDD avec IA = le test devient le prompt". (Voir mon désaccord plus bas.)

### Les pièges

- sauter la spécification,
- l'acceptation aveugle du code généré,
- l'absence d'évaluation, de mesure, d'observabilité.

### Outil de mesure : le framework DORA

Cité pour mesurer la performance de delivery. **DORA** (DevOps Research and Assessment, programme de recherche racheté par Google, popularisé par le livre *Accelerate*) repose sur quatre métriques clés :

- **Deployment frequency** : à quelle fréquence on livre en prod.
- **Lead time for changes** : délai entre un commit et sa mise en prod.
- **Change failure rate** : part des déploiements qui causent un incident.
- **Time to restore service** : temps pour rétablir après incident.

L'intérêt ici : sans ces mesures, on ne sait pas si l'IA améliore réellement le delivery ou si elle ajoute juste du volume.

## Mon désaccord (noté pendant le talk)

"Le test devient le prompt" : pas forcément d'accord. Un test encode un comportement attendu une fois écrit, mais l'utiliser tel quel comme prompt mélange deux rôles : la spécification (intention) et la vérification (preuve). Si le test sert de prompt, l'IA peut produire un code qui colle au test sans respecter l'intention réelle (overfitting au test, cas limites ignorés). Le test reste un excellent oracle de validation, mais il ne capture pas toujours le "pourquoi". La spec et le test sont complémentaires, pas substituables.

## Ce que ça m'évoque / liens avec ma situation

- C'est le talk le plus directement actionnable pour Oli's Lab, et le plus inconfortable : **pas de TypeScript, pas de tests.** Or les deux piliers que ce talk désigne comme indispensables à un usage sain de l'IA (typage fort, feedback loop par les tests) sont précisément ce qui manque. Conclusion brutale : utiliser l'IA intensivement sur cette codebase sans ce filet, c'est amplifier la dette, pas la résorber.
- Renforce mon réflexe "planning → architecture → implémentation" : la spec d'abord, le code (que l'IA peut générer) en dernier et comme jetable.
- Excellent matériau pour mes piliers de contenu "regard lucide sur l'IA" et "craft". L'angle "l'IA ne sauve pas une archi molle, elle en facture le coût" est un post à lui tout seul.

## Ressources

- Framework **DORA** / livre **Accelerate** (Forsgren, Humble, Kim)

## À faire

- [ ] Post : "l'IA ne sauve pas une archi molle"
- [ ] Regarder où on pourrait commencer à mesurer ne serait-ce qu'une métrique DORA chez Oli's Lab (lead time ?)
