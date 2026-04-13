> [!info]- Tags
> #LangagesDeProgs #CheatSheet #TypeScript

# 🧠 Fiche de révision TypeScript

TypeScript est un **sur-ensemble typé de JavaScript**. Cela signifie que tout code JavaScript valide est aussi un code TypeScript valide, mais TypeScript ajoute en plus un système de types statiques. Contrairement à JavaScript qui est un langage faiblement typé et interprété, TypeScript permet de **détecter les erreurs de types dès la phase de compilation**, avant même d’exécuter le code.

Grâce à ce typage statique, TypeScript améliore la **maintenabilité**, la **robustesse** et la **lisibilité** du code, surtout dans les projets de grande taille. En résumé, TypeScript te permet d’écrire du JavaScript plus sûr et plus clair, avec des outils d’aide au développement comme l’autocomplétion et la vérification des types, tout en restant compatible avec l’écosystème JavaScript existant.

## 1. Bases du Typage

### Types primitifs

```ts
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let nul: null = null;
let undef: undefined = undefined;
```

**NB :** On peut annoter une variable avec un type précis pour garantir son contenu, par ex :
```ts
let age: number = 30;
```
### Types complexes

#### Tableaux :

```ts
let arr: number[] = [1, 2, 3];
let arr2: Array<string> = ["a", "b"];
```
#### Tuples (taille fixe) :
- Un tableau avec un nombre fixe d’éléments de types différents.
```ts
let tuple: [string, number] = ["age", 30];
```
#### Enumérations :
- Permettent de définir un ensemble de valeurs constantes nommées.
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
let dir: Direction = Direction.Up;
```

## 2. Typage avancé
### Interfaces & Types

- **`interface`** sert principalement à décrire la forme d’un objet ou la signature d’une fonction.
```ts
interface User {   name: string;   age: number; }
```

- **`type`** est plus général, on peut définir un alias pour un type primitif, un union, une intersection, un objet, une fonction, etc.
```ts
type User = {   name: string;   age: number; };  type ID = string | number;`
```

### Union & Intersection

- **Union :** Un type qui peut être plusieurs types possibles, par exemple `string | number` signifie que la valeur peut être soit un string, soit un number.
- **Intersection :** Combine plusieurs types en un seul qui doit respecter toutes les contraintes.

```ts
type A = { a: string };
type B = { b: number };

type AB = A & B;  // intersection : a et b
type AU = A | B;  // union : a ou b
```
### Literal Types

```ts
type Direction = "up" | "down" | "left" | "right";
let move: Direction = "up";
```

## 3. Fonctions & Typage

Les paramètres et le retour d’une fonction peuvent être typés pour éviter les erreurs.
- Les paramètres peuvent être optionnels (`?`) ou avoir une valeur par défaut.
### Fonction typée simple

```ts
function add(a: number, b: number): number {
  return a + b;
}
```
### Fonctions fléchées

```ts
const greet = (name: string): string => Hello ${name}
```
### Paramètres optionnels et par défaut

```ts
function log(msg: string, userId?: number) { /* ... */ }
function multiply(a: number, b = 1): number { return a * b; }
```

### Rest parameters

```ts
function sum(...nums: number[]): number {
  return nums.reduce((acc, val) => acc + val, 0);
}
```
## 4. Classes & Types orientés objet

TypeScript ajoute un typage aux classes JS, avec propriétés, méthodes et accès via modificateurs (`public`, `private`).

```ts
class Person {
  name: string;
  private age: number; // accessible seulement dans la classe

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hi, I'm ${this.name}`;
  }
}
```

### Héritage

```ts
class Employee extends Person {
  salary: number;
  constructor(name: string, age: number, salary: number) {
    super(name, age);
    this.salary = salary;
  }
}
```

## 5. Types utilitaires

- `Partial<T>` : tous les champs optionnels
- `Required<T>` : tous les champs obligatoires
- `Readonly<T>` : champs en lecture seule
- `Record<K,T>` : objet avec clés K et valeurs T
- `Pick<T, K>` : sélection de clés
- `Omit<T, K>` : exclusion de clés

```ts
interface User { id: number; name: string; age?: number }
const partialUser: Partial<User> = { name: "John" };
const readonlyUser: Readonly<User> = { id: 1, name: "Jane" };
```

## 6. Génériques

Permettent d’écrire du code réutilisable en fonction de types variables, pour des fonctions ou classes.
### Fonction générique

```ts
function identity<T>(arg: T): T {
  return arg;
}
let output = identity<string>("hello");
```

### Interface générique

```ts
interface ApiResponse<T> {
  data: T;
  error?: string;
}
```

## 7. Types conditionnels & avancés
### Types conditionnels

```ts
type IsString<T> = T extends string ? true : false;
type A = IsString<number>; // false
type B = IsString<string>; // true
```
### Type mapping

```ts
type Nullable<T> = {
  [P in keyof T]: T[P] | null
};
```
## 8. Assertions & Guards
### Assertion de type
- Forcent le compilateur à traiter une valeur comme un certain type (attention à ne pas abuser).
```ts
let someValue: unknown = "hello";
let strLength: number = (someValue as string).length;
```

### Type guards

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

if (isString(someValue)) {
  console.log(someValue.length); // OK
}
```
## 9. Modules & Import/Export

TypeScript supporte l’import/export de fichiers pour organiser le code, avec typage garanti.
```ts
// export
export interface User { ... }
export const PI = 3.14;

// import
import { User, PI } from "./models";
```

## 10. Configuration tsconfig.json

- `strict` : mode strict
- `noImplicitAny` : interdit le any implicite
- `target` : version JS ciblée
- `module` : système de module (esnext, commonjs)
- `outDir` : dossier de sortie compilé
## 11. Erreurs courantes

- Ne pas typer les variables → any implicite
- Mauvaise utilisation des types optionnels (undefined vs null)
- Mutation des types readonly
- Confusion entre interface et type
- Oublier d’ajouter un return dans une fonction typée
- Ne pas utiliser les strictNullChecks
- Ignorer les warnings de compilation
## 12. Questions d’entretien fréquentes

- Différence entre interface et type ?
	- `interface` décrit la forme d’un objet, `type` peut combiner unions, intersections, primitives,
- Quand utiliser un type générique ?
- C’est quoi une union, une intersection ?
- Comment typer un objet complexe imbriqué ?
- Comment gérer les valeurs null et undefined ?
- Explique les types conditionnels.
- Explique l’inférence de type.
- Comment faire un type optionnel ?

## ✅ Résumé

- TypeScript ajoute un typage statique puissant à JS.
- Interfaces & types structurent le code.
- Génériques & utilitaires permettent la réutilisation.
- Types conditionnels & guards renforcent la sécurité.
- Toujours configurer strictement tsconfig.json.
