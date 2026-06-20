---
tags:
  - CodeKnowledge
  - Veille
event: "Tech'Work"
date: 2026-06-18
speaker: Yoan Thirion
book: "The Programmer's Brain (Felienne Hermans)"
---

## Idée brute

On passe l'essentiel de notre temps de dev à lire et comprendre du code, pas à l'écrire. Or notre cerveau a des limites mesurables (mémoire à court terme et mémoire de travail très petites et saturables). Comprendre ces limites permet d'adopter des techniques concrètes pour lire du code difficile sans se noyer, et surtout d'écrire du code "chunkable", c'est-à-dire facile à regrouper en blocs logiques pour le cerveau du lecteur suivant. Le talk met un socle scientifique sous un ressenti que la communauté craft avait déjà : le code s'écrit pour des humains.

Source : le livre **The Programmer's Brain** de **Dr Felienne Hermans**.

## Contenu clé

### Les trois mémoires en jeu

Quand une information arrive, elle traverse plusieurs processus cognitifs : elle entre, passe à travers des filtres, transite par la mémoire à court terme, puis par la mémoire de travail, qui pioche à la fois dans la MCT et dans la mémoire à long terme.

- **MCT (mémoire à court terme)** : stocke temporairement. Limite de durée (~30 s) et limite de taille (~7 slots, +/- 2, la loi de Miller). Sature très vite selon la qualité du code lu (noms de variables, de méthodes).
- **MLT (mémoire à long terme)** : notre base de connaissances. Ce qu'on y a stocké détermine ce qu'on est capable de comprendre vite. Les patterns, les idiomes, le métier vivent ici.
- **MDT (mémoire de travail)** : c'est elle qui relie les deux pour raisonner sur un problème donné. Elle est limitée comme la MCT, mais en plus elle est mobilisée sur un problème actif, donc elle sature encore plus vite. **Sa capacité saturée = la charge cognitive.**

Lire du code, c'est exactement ça : la MCT garde les noms, la MLT donne les connaissances, la MDT fait le lien.

### Pourquoi se concentrer sur la lecture

- Les recherches montrent qu'on passe environ **60% de notre temps à lire et comprendre du code**, pas à l'écrire. S'améliorer en lecture, c'est donc améliorer directement sa productivité.
- L'IA amplifie précisément ça : elle déplace l'effort vers la lecture et la revue de code, qui devient plus intensive et chronophage. La compétence "lire vite et juste" devient encore plus rentable. (À relier à la dette cognitive pointée dans [[Le software craftmanship s'est-il perdu (Edouard Cattez)]].)

### Pourquoi c'est difficile, et la théorie du chunking

La MCT déborde dès que le code est dense ou mal nommé. Comment la dépasser ? Par le **chunking** : la mémoire segmente l'information en blocs (chunks) regroupés de façon logique, et raisonne sur les blocs plutôt que sur chaque élément.

L'expérience fondatrice est celle de **De Groot** sur les joueurs d'échecs : les experts ne mémorisent pas mieux des positions aléatoires, mais ils mémorisent beaucoup mieux des positions de partie réelle, parce qu'ils les voient comme des chunks (des configurations connues) et non comme des pièces isolées. L'expertise, c'est avoir beaucoup de chunks en MLT.

### Comment écrire du code "chunkable"

- **Revenir aux fondamentaux : les design patterns.** Un pattern reconnu est un chunk prêt à l'emploi pour le lecteur. Il lit "Strategy" et charge tout le bloc d'un coup.
- **Écrire des commentaires de haut niveau, pas de bas niveau.** Les commentaires de haut niveau ajoutent du contexte et aident à créer des chunks. Les commentaires de bas niveau (qui paraphrasent la ligne) surchargent inutilement la MCT.

### Techniques pour lire du code difficile

1. **Refactoring temporaire pour réduire la charge cognitive.** Transformer le code (renommages, extractions via les outils de refacto automatisés) juste pour le comprendre. Ce qui est facile à lire dépend de nos connaissances préalables, donc de notre MLT : il n'y a aucune honte à rendre le code plus familier pour le comprendre, quitte à jeter ensuite la transformation.
2. **Le graphe de dépendances.** Tracer des lignes entre les occurrences d'une même variable. Ça révèle où la donnée est utilisée, ses mutations, l'arbre de décision.
3. **La state table (table d'état).** Un tableau qui suit les valeurs des variables et leurs changements au fil de l'exécution.
4. **Stratégies de compréhension de texte appliquées au code.** Traiter le code comme un texte à analyser : activating, determining importance, visualizing, questioning, inferring, monitoring. Ces stratégies de lecture sont reproductibles sur du code.
5. **L'assistant IA**, modulo les hallucinations : utile pour expliquer un bout de code, mais il faut systématiquement challenger le résultat.

### Comment écrire du code plus lisible

Le levier principal : **le nommage.** Mieux nommer, avec un accès au métier, via l'**Ubiquitous Language** du DDD (le même vocabulaire entre code et domaine).

Pourquoi se focaliser sur le nommage :

- une grande partie du code, c'est du nommage,
- c'est ce qui génère le plus de discussions en revue de PR,
- un bon nom peut être défini de façon presque syntaxique (cf les travaux de **Simon Butler** sur la qualité des identifiants).

### Les code smells et les linguistic antipatterns

Les code smells ajoutent de la charge cognitive et, à la longue, saturent la MCT. Cas emblématique : les **Linguistic Antipatterns**, ces écarts entre ce qu'un nom annonce et ce que le code fait :

- des méthodes qui font plus que ce qu'elles disent,
- des méthodes qui disent plus que ce qu'elles font,
- des méthodes qui font l'opposé de ce qu'elles disent,
- des identifiants qui indiquent le contraire de ce qu'ils contiennent.

Chiffres cités suite aux travaux de **Venera Arnaoudova** (Linguistic Antipatterns) :

- ~11% des setters retournent une valeur,
- ~2,5% des méthodes ont un nom décrivant l'opposé de leur comportement,
- ~64% des identifiants commençant par `is` ne sont pas des booléens.

### Comment s'en prémunir

- les avoir en MLT et les travailler (katas, coding dojo),
- automatiser leur détection (par exemple avec **ArchUnit** pour faire respecter des règles d'architecture/nommage par des tests),
- "y a pas de mal à se faire du bien" : se donner les moyens de lire confortablement.

## À retenir

- Le travail de Felienne Hermans, c'est mettre une validation scientifique sur un feeling de la communauté craft.
- **Le code est écrit pour les humains, pas pour les machines** (sinon on écrirait encore en assembleur). Tout le reste découle de là.

## Ce que ça m'évoque / liens avec ma situation

- Le chiffre des 60% de temps en lecture justifie à lui seul d'investir dans le nommage et le chunking sur la codebase Oli's Lab, héritée et dense.
- L'absence de TypeScript chez Oli's Lab a un coût cognitif direct : sans typage, la MLT ne peut pas s'appuyer sur des contrats, donc la MCT porte plus de charge à chaque lecture. C'est un argument concret, pas idéologique, pour pousser TS.
- La technique du refactoring temporaire est immédiatement applicable quand je tombe sur un module Payload/React que je ne comprends pas : renommer/extraire pour comprendre, puis décider quoi garder.
- Lien fort avec mon problème d'inférence de types Payload : la fonction générique combinant narrowing et validation runtime, c'est exactement créer un chunk réutilisable qui décharge la MDT à chaque usage.

## Ressources

- Livre : **The Programmer's Brain**, Felienne Hermans
- Livre : **Working Effectively with Legacy Code**, Michael Feathers (techniques de refacto sur code legacy)
- Catalogue : refactoring.com/catalog (Martin Fowler)
- Outil : **ArchUnit** (tests d'architecture / règles de nommage)
- Recherche : **Venera Arnaoudova**, Linguistic Antipatterns
- Recherche : **Simon Butler**, qualité des identifiants
