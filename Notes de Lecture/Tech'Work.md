## Keynote ouverture

- L'autonomie n'est pas l'absence de cadre, c'est un cadre qui permet d'agir sans peur.
- Une équipe qui sait apprécier ce qui fonctionne est plus capable de parler de ce qui fonctionne pas.

---

## Workshop : Clean archigonale

- archi au croisement de l'architecture hexagonale / clean archi

---

## Talk : Le software craftmanship s'est il perdu sur le chemin de l'excellence ? (Edouard Cattez)

- Origine du talk —> lyon craft d'il y a 2ans une fille qui a dit que pour faire du craft faut faire du TDD

- suite à ça un post linkedin (avec la même accroche que le titre du talk où il dénonce un peu ça et le fait que les gens délaisse les soft skills dans le craft) —> et se prends une shitstorm de la part de la communauté craft linkedin qui montre son côté très hautain

- Plusieurs problèmes :
	- faire que de la technique et pas du produit,
	- communication et egofull / humain,
- L'excellence est vu comme un coût 
	- est ce que la pratique est vraiment bonne ou est ce que c'est ce qui découle de la pratique qui est important
	- Pour vendre ces bonnes pratiques plutôt qu'axer l'argumentaire sur la technique il faut changer d'angle

- l'écoute / re formulation / courage de dire non / négociation 

- Problème qui arrive avec l'IA —> dette cognitive à retardement

- NB : a check from scratch to craft
- NB : pas ultra fan du talk overall

---

## Talk : Coder sans se noyer dans la complexité (Yoan Thirion)

- Comprendre comment fonctionne notre cerveau, partage de techniques et pratiques qui permettent de devenir meilleur que ça soit sur la lecture et sur l'écriture de code.
- Talk vient d'un livre : Programmers Brain de Dr Felienne Hermans

- Dans notre cerveau on a différents processus cognitifs
	- 1/ l'information qui rentre dans le cerveau
	- 2/ cette infos va passer à travers des filtres
	- 3/ cette info va transiter par la mémoire à court terme (MCT)
	- 4/ puis elle va passer par la mémoire de travail (MDT)
	- 5/ pour travailler cette mémoire de travail elle pas piocher dans la MCT et aussi dans notre mémoire à long terme (MLT)
	- Il se passe un peu pareil quand on lit du code :
		- la MCT pour stocker des noms de méthodes / variables
		- la MLT pour accéder à notre connaissance
		- la MDT pour lier un peu les 2
	- Les informations de notre MLT dépendent de ce qu'on y a stocké

- Comment s'améliorer pour lire du code ?
	- Pourquoi c'est important ?
		- Les recherches montrent qu'on passe 60% de notre temps à lire / comprendre du Code plutôt qu'à l'écrire
		- Donc s'améliorer en lecture aide à être plus productif dans l'idée 
		- et qu'est ce que l'IA amplifie ? justement la lecture de code, ça devient plus intensif, ainsi que le temps qu'on y passe
	- Pourquoi c'est difficile de lire du code ?
		- MCT a une limite de temps (~30s), limite de taille juste quelques slots disponible (~ 7, +/- 2)
		- MCT qui surcharge vite selon la qualité du code
		- Surpasser ces limites : expérience de De Groot
			- mets en avant chunking theory —> mémoire segmenté en chunks, regroupés de manière logique
	- Comment écrire du code chunkable du coup ? (segmenté en groupe logique)
		- Revenir aux fondamentaux —> Design patterns
		- Écrire des commentaires (de haut niveau, pas de bas niveau) —> ajoute de l'information et du contexte donc aide à créer des chunks, les commentaires de bas niveau vont surcharger la mémoire à court terme
		- La MDT est en soit limitee de la même manière que la MCT, mais appliqué sur un problème donc sature plus vite, la capacité de la MDT = charge cognitive
		- Technique 1 : refactoring temporaire pour réduire la charge cognitive
			- refactoring temporaire pour comprendre le code avec par exemple les outils de refactos automatisé 
			- ce qui est facile à lire / comprendre dépend de nos connaissances préalables et donc de notre MLT et il n'y a donc pas de honte à transformer le code dans quelques choses de plus familier pour mieux le comprendre 
		- Technique 2 : le graph de dépendances
			- Tracer des lignes entre les occurrences d'une même variable
			- Permet de comprendre ou les données sont utilisé, les mutations, l'arbre de choix …
		- Technique 3 : state table
			- Un tableau d'état qui se concentre sur les valeurs des variables et leur changement
		- Technique 4 : stratégie de compréhension de texte appliqué au code
			- comme de l'analyse de texte 
			- activating / determining importance / visualizing / questioning / inferring / monitoring
			- reproductible sur du code
		- Technique 5 : AI assistant
			- TW : modulo les hallucinations 
			- challenger le résultat
- Comment écrire du code plus lisible ?
	- Mieux nommer, accès métier, Ubiquitous Language from DDD
	- Pourquoi se focaliser sur le nommage ?
		- une grande partie du code = du nommage
		- ça crée beaucoup de discussion en review de pr 
		- un bon nom peut être définis de manière syntaxique cf Simon Butler
	- Code smells : ajoutent beaucoup de charge cognitive et surcharge à la longue notre mémoire à court terme 
		- Exemple : Linguistic Anti Pattern
			- des méthodes qui en font plus que ce qu'elles disent
			- des méthodes qui en disent plus que ce qu'elles font
			- des méthodes qui font l'opposé de ce qu'elles disent
			- identifiant qui indique le contraire de ce que l'entité contient
		- Trouvaille scientifique de Anna Widova (à confirmer le nom) :
			- 11% des setters retourne une valeur
			- 2,5% ???
			- 75% ???
		- Comment s'en prémunir ?
			- les avoir dans notre MLT, et les travailler (katas, coding dojo..)
			- automatiser leur détection (avec archUnit par exemple)
			- Y a pas de mal à se faire du bien
- Au final les travaux de ce Dr c'est mettre un avis scientifique sur un feeling de la communauté craft
- Le code est écrit pour les humains pas pour les machines (sinon on écrirait encore en assembleur)
- Ressource : Working Effectively with legacy codes qui donne des techniques de refactos 

refactoring.com/catalog

---

## Talk : Comment bien coder avec l'IA ? (Jean Baptiste Musso, Florian Teissedre)

- Coder avec un assistant IA est une question de discipline d'ingénieur et pas une question d'outil
	- L'assistant a forcément besoin de cadre

- Spécification
	- Pièce centrale tandis que l'implémentation s'efface
	- Spécifier n'est pas nouveau c'est ça faire de l'ingénierie
	- Une spécification n'est pas un cahier des charges
	- c'est la le travail d'ingénieur
	- le LLM ne devine pas, il échantillonne
		- spécifications précise = l'espace se contracte et le LLM converge
	- Spécifier ≠ écrire un prompt / un .md …
	- bornée, pas amplifiée, bornée
- Architecture
	- Détermine ce que l'assistant peut produire
	- Modularité et bounded context 
	- contrats explicites
	- typage fort 
	- archi hexa ?
	- tout ça existait avant l'IA et leur absence nous ralentissait aujourd'hui ça rends leur absence rend l'IA inefficace 
- Feedback Loop
	- Couvre la validation sur laquelle se basera l'assistant
	- qu'est ce qu'on garde si demains tout brûle le code ou les tests ?
	- Le code est jetable, les tests sont permanents
	- Les tests sont les seuls actifs qui survit aux changements 
	- Un test est une spécification exécutable
	- TDD avec IA = le test devient le prompt (??? avis perso —> pas forcément d'accord avec ça)
- Les pièges
	- skip la spécification 
	- acceptation aveugle
	- pas d'évaluation / de mesure / d'observabilité

- Outil de mesure : Dora framework de google

---

## Talk : Pimp my shell (Julien Wittouck)

- Shell doit être lisible, portable d'une machine à l'autre, efficace et performant  et enfin doit être joli
- Tool :
	- Ghostty : émulateur de terminal performant (rendu assisté par GPU)
	- Shell = fish : autosuggestions, complétions, scripting simple, historique des commandes
	- Nerd font : JetBrains Mono
		- Ligature
		- Emojis et symboles
	- Surchargé avec des outils boosté : des binaires qui vont remplacer les binaires existant de l'os
		- cat —> batcat : coloration syntaxique, numéros de ligne, peut servir de pager aussi
		- ls —> lsd : couleurs, icônes par type de fichier
		- cd —> zoxide : navigation intelligente par fréquence 
		- find —> fd : recherche de fichiers rapide et intuitive
	- Prompt qui affiche des infos selon notre répertoire : starship
		- prompt cross shell 
		- infos de contexte branche git + statut / version runtime / …
		- très configurable (thèmes, modules…)
	- Splash screen lors du démarrage : Splash Board
		- splash screen customisable,
		- config globale
		- config par répertoire
		- widgets : git, météo, calendrier, horloge, infos système …
		- big text animé, thèmes (catpuccin), layout flex …
	- Mise : runtimes, variables d'env, tâches 
		- config global
		- config par répertoire 
		- config au projet
		- activation auto au cd 
	- Fnox : secrets montés dans l'env
		- stockage dans un fichier chiffré 
		- ref de secrets d'un vault, secrets manager cloud
		- configuration fnox.toml
		- activation auto au cd 
	- Chez Moi : permets d'avoir ses dotfiles root syncro sur git de ce que je comprends 
		- permets de transposer sa config d'une machine à l'autre
	- Gum : scripts interractif : style, spinner, confirm, chose …
		- utile dans des alias git
		- gum pager 
		- gimoji : cherche et copier des gitmoji depuis le terminal

---

### Free mind

- SoCrates FR (group craft)
- Gen AI France (group Lyon)
- Open telemetry 
- Graphana
- Congruence 
