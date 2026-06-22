## Roadmap

### Phase 0 : hygiène (pas du TDD, ~15 min)

- Renommer `src/calc.test.ts` en `src/Brick.test.ts` (résidu du template "calc"). - `package.json` : nom `seed4t`, description, author, license, repo.
  - **Ajouter un linter/formatter maintenant, pas "plus tard"** (le "on ajoutera plus tard" est un red flag).

### Phase 1 : solidifier le domaine pur (aucun I/O, toujours pas de hexagone)

- Séquence de tests rouges. Chacun avec la pression de conception qu'il crée :
	- **T1 - Dédup catalogue.**
		- Décommente le test existant.
		- Piège : `build()` renvoie des `CatalogBrick`, pas des `Brick`, donc le test commenté est faux tel quel. Le corriger t'apprend quelque chose sur ton modèle (compare les bricks, pas les wrappers).
	- **T2 - Dédup au Cart.**
		- `cart.add("a"); cart.add("a")` donne `[a]`.
		- Force un check d'existence dans `Cart.add`.
	- **T3 - Dépendances multiples.**
		- A dépend de B **et** C. add A donne [A,B,C].
		- **Gros refactor du modèle** : `dependant: Brick | null` devient `dependencies: string[]` (par nom, voir décisions).
	- **T4 — Dépendances transitives.**
		- A→B→C. add A donne [A,B,C]. Le Cart ne peut plus lire les deps directes, il doit **résoudre le graphe** via le catalogue.
		- Émergence d'un concept domaine pur (`DependencyResolver` ou méthode dédiée).
		- Toujours en mémoire, pas un port.
	- **T5 — Dédup transitive (diamant).**
		- A→B, A→C, B→D, C→D. add A donne [A,B,C,D] (D une fois).
		- Force un set de visités pendant le parcours.
	- **T6 — Cycle.**
		- A→B→A. Décision : erreur explicite ou [A,B] sans boucle infinie.
		- Force la détection de cycle.
	- **T7 — Remove conscient des deps.**
		- Règle produit à trancher (voir décisions ouvertes).
		- Fin de Phase 1 : domaine complet, graphe résolu/dédupliqué/sans cycle, testé à 100% **sans aucun fake** (rien d'extérieur). C'est le signe que le domaine est sain.

### Phase 2 : émergence du PREMIER port (résolution de version)

- **T8 — Version par défaut = "latest".**
	- `createBrick("Express")` sans version doit obtenir la dernière version.
	- Elle vit **dehors** (registry npm), le domaine ne peut pas la calculer.
	- **Moment hexagonal n°1.** Le domaine définit un port : ```ts interface VersionResolver { latest(brickName: string): Version; } ```
	- En test, fake en mémoire : `new InMemoryVersionResolver({ Express: "5.2.1" })`, injecté par constructeur/paramètre.
		- Le test reste rapide et déterministe.
	- L'adapter réel (HTTP vers registry.npmjs.org) n'existe pas encore et ne sera **pas** testé en unitaire : c'est un adapter, testé en intégration plus tard, ou pas du tout (code fin de mapping).
- **T9 (optionnel) — Résolution de range** (`^5.0.0` vers la version compatible la plus haute).
	- Étend le même port, même fake.

### Phase 3 : émergence du SECOND port (sortie de la recette)

- **T10 — Produire la recette.**
	- D'un Cart résolu vers un value object `Recipe` (liste bricks + versions résolues, prêt à devenir un package.json).
	- Pur, pas de port, juste une transformation.
- **T11 — Émettre la recette.** **Moment hexagonal n°2.**
	- Port de sortie : ```ts interface RecipeWriter { write(recipe: Recipe): void; } ``` Fake `InMemoryRecipeWriter` qui capture ce qui est écrit, tu assertes dessus.
	- Adapters réels plus tard : `FileSystemRecipeWriter` (package.json), `JsonStdoutRecipeWriter`.
	- À ce stade l'hexagone existe : domaine pur au centre, deux ports (`VersionResolver` entrée, `RecipeWriter` sortie), fakes en test, adapters réels en périphérie.

### Phase 4 : le refactor structurel (déplacer les fichiers)

- **Seulement maintenant**, avec 2 ports concrets, la structure hexagonale a du sens : ``` src/ domain/ Brick, Recipe, Catalog, Cart, DependencyResolver (pur, zéro import externe) ports/ VersionResolver, RecipeWriter (interfaces) adapters/ npm/ (NpmVersionResolver), fs/ (FileSystemRecipeWriter), in-memory/ (fakes) app/ le use case qui câble : prend un Cart, résout, écrit index.ts composition root : instancie les adapters réels et lance ```
- **Règle de dépendance** : `domain` n'importe jamais `adapters`. `domain` peut importer `ports`. `adapters` implémente `ports`. `index.ts` est le seul endroit qui connaît tout et câble.
- Filet automatique recommandé : **dependency-cruiser** (ou eslint-plugin-boundaries) qui fait **échouer le build** si `domain/` importe un adapter ou `fs`/`http`.
	- Ça empêche la dette d'archi de revenir, exactement le genre de garde-fou craft qui vaut le coup.

## Décisions ouvertes (à trancher quand le test arrive, jamais avant)

- **Stockage des deps** : par nom (`string[]`) plutôt que par référence `Brick`.
	- Le catalogue est la source de vérité, ça évite les références dupliquées et les soucis d'égalité.
- **Règle de `remove`** : GC des orphelins (retire les deps que plus rien n'utilise) **ou** interdiction si une autre brick en dépend (erreur).
	- À encoder dans T7.
- **Comportement sur cycle** (T6) : erreur explicite vs ignorer en s'arrêtant. - **"latest"** : vrai registry npm ou table figée pour le kata. Le fake suffit longtemps.
