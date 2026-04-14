---
tags: [SoftwareCraft, CleanCode]
---

Écrire du code simple et pas superflu le fera tendre vers du code compréhensible par tous. Le code ne doit pas être plus dur à comprendre que la fonction métier dont il s'occupe.

**Acronyme to keep in mind :**
- **KISS :** **K**eep **I**t **S**imple and **S**tupid —> code doit être simple et pas plus compliqué que nécessaire
- **YAGNI :** **Y**ou **A**in't **G**onna **N**eed **I**t —> ne pas écrire du code superflu au risque qu'il ne serve jamais
- **DRY :** **D**on't **R**epeat **Y**ourself —> ne pas se répéter, éviter la duplication
	- Quelle est la nature de la connaissance transmise par notre code ? Si c'est une connaissance métier on évite la duplication car les connaissances métiers ne devraient apparaître qu'une fois

Le TDD est un bon point de départ pour justement écrire du code simple et pas superflu. Voir [[TDD Outside-In vs Inside-Out]] pour choisir l'approche adaptée selon le contexte.

Mais le fait d'écrire du code simple est plus facile à dire qu'à faire c'est pourquoi *Kent Beck* a défini les *Four Rules of Simple Design*.
- 1. Le code doit être fonctionnel et **passer les tests**, sans tests le fonctionnement attendu de notre code reste flou et l'objectif métier risque de ne pas être atteint. Si on ne sait pas ce qu'on doit faire comment peut-on prétendre avoir réussi à le faire —> les tests apportent le cadre pour pallier à ça. Permet aussi d'appréhender au mieux le changement.
- 2. Lorsqu'on programme on se doit de **révéler l'intention** et être clair pour une meilleure compréhension. On écrit avant tout pour que ça soit lu, lorsqu'on lit on cherche ce que l'auteur cherchait à faire. Le nommage est un point clé pour transmettre l'intention.
- 3. **Éviter la duplication** afin de n'exprimer qu'une seule fois la règle métier. Duplication de ligne de code ≠ duplication de la connaissance dans le code. Ce qui permet que si une connaissance change alors les impacts seront limités à 1 seul endroit de notre code —> permet une meilleure maintenabilité.
- 4. L'essentiel est d'être **petit**, tout ce qui n'entre pas dans les règles précédentes devrait être éliminé. On supprime ce qui ne sert pas et on ne va pas au-delà de l'objectif du métier.

Néanmoins, si on suit les règles du TDD on peut réduire les 4 règles précédentes à seulement 2 :
- **Améliorer le nommage**,
- **Réduire la duplication**

Écrire du code simple permet notamment d'exprimer d'une manière plus claire l'intention. On cherche à expliquer ce qu'on veut faire et pourquoi on le fait plutôt que le comment. Pour y arriver on va chercher à suivre 3 principes à savoir :
- [[L'art du nommage]],
- [[Structurer le code]],
- [[L'utilisation des commentaires]]
