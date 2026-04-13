> [!info]- Tags
> #SoftwareCraft #CleanCode

Écrire du code simple et pas superflus le fera tendre vers du code compréhensible par tous. Le code ne doit pas être plus dur à comprendre que la fonction métier dont il s’occupe.

**Acronyme to keep in mind :**
- **KISS :** **K**eep **I**t **S**imple and **S**tupid —> code doit être simple et pas plus compliqué que nécessaire
- **YAGNI :** **Y**ou **A**in’t **G**onna **N**eed **I**t —> ne pas écrire du code superflus au risque qu’il ne serve jamais
- **DRY :** **D**on’t **R**epeat **Y**ourself —> ne pas se répéter, éviter la duplication
	- Quel est la nature de la connaissance transmise par notre code ? Si c’est une connaissance métier on évite la duplication car les connaissances métiers ne devraient apparaître qu’une fois

Le TDD est un bon point de départ nous permettant justement d'éviter d’écrire du code simple et pas superflu.

Mais le fait d’écrire du code simple est plus facile à dire qu’à faire c’est pourquoi *Kent Beck* a définis *Four Rules of Simple Design*.
- 1. Le code doit être fonctionnel et **passer les tests**, sans tests le fonctionnement attendu de notre code reste flou et l’objectif métier risque de ne pas être atteint. Si on sait pas ce qu’on doit faire comment on peut prétendre avoir réussi à le faire —> les tests apporte le cadre pour palier à ça. Permets aussi d’appréhender au mieux le changement.
- 2. Lorsqu’on programme on se doit de **révéler l’intention** et être clair pour une meilleure compréhension. On écrit avant tout pour que ça soit lu, lorsqu’on lit on cherche ce que l’auteur cherchait à faire. Le nommage est un point clé pour transmettre l’intention.
- 3. **Éviter la duplication** afin de n’exprimer qu’une seule fois la règle métier. Duplication de ligne de code ≠ duplication de la connaissance dans le code. Ce qui permets que si une connaissance change alors les impacts seront limiter à 1 seul endroit de notre code —> permets une meilleur maintienbilité.
- 4. L’essentiel est d’être **petit**, tout ce qui n’entre pas dans les règles précédentes devrait être éliminé. On supprime ce qui ne sert pas et on ne va pas au delà de l’objectif du métier.

Néanmoins, si on suit les règles du TDD (qui si on suit la rigueur imposé par le clean code et le théorème des vitres réparées est un must do lorsqu’on écrit du code) on peut réduire les 4 règles précédentes à seulement 2 :
- **Améliorer le nommage**,
- **Réduire la duplication**

Écrire du code simple permets notamment d’exprimer d’une manière plus claire l’intention. On cherche à expliquer ce qu’on veut faire et pourquoi on le fait plutôt que le comment. Pour y arriver on va chercher à suivre 3 principes à savoir :
- [[L’art du nommage]],
- [[Structurer le code]],
- [[L’utilisation des commentaires]]