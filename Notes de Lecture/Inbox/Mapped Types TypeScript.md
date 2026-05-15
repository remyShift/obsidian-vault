---
created: 2025-05-15 00:00
type: fleeting
status: to-process
tags: [inbox, typescript, mapped-types, type-system, craft, lyon-craft-2025]
sources:
  - https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
  - https://www.totaltypescript.com/concepts/mapped-type
  - https://refine.dev/blog/typescript-mapped-types/
---

# Mapped Types en TypeScript

## Principe

Un Mapped Type est un **type générique qui crée un nouveau type en itérant sur les propriétés d'un type existant**. C'est essentiellement une boucle `for...of` au niveau du système de types.

La syntaxe de base :
```typescript
type MappedType<T> = {
  [K in keyof T]: T[K]; // Pour chaque clé K de T, garder le même type
};
```

---

## Le problème qu'ils résolvent

Sans Mapped Types, pour créer une variante d'un type existant (par exemple, rendre toutes les propriétés optionnelles), on devrait redéfinir manuellement chaque propriété :

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Sans Mapped Type : duplication et désynchronisation
interface PartialUser {
  id?: number;
  name?: string;
  email?: string;
}
```

Si `User` évolue, il faut penser à mettre à jour `PartialUser`. C'est du copier-coller manuel.

---

## Syntaxe et transformations

### Rendre toutes les propriétés optionnelles

```typescript
type Partial<T> = {
  [K in keyof T]?: T[K];
};
```

### Rendre toutes les propriétés readonly

```typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

### Changer le type de toutes les propriétés

```typescript
// Transformer toutes les valeurs en boolean
type Flags<T> = {
  [K in keyof T]: boolean;
};

type UserFlags = Flags<User>;
// { id: boolean; name: boolean; email: boolean }
```

### Ajouter ou retirer des modificateurs

Le préfixe `-` retire un modificateur, `+` l'ajoute (par défaut).

```typescript
// Retirer readonly et optional d'un coup
type Mutable<T> = {
  -readonly [K in keyof T]-?: T[K];
};
```

### Remapper les clés avec `as`

```typescript
// Générer des noms de setters à partir des clés
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UserSetters = Setters<User>;
// { setId: (value: number) => void; setName: (value: string) => void; ... }
```

---

## Exemple concret : API partielle

```typescript
interface Artist {
  id: number;
  name: string;
  bio: string;
}

// Pour un PATCH, on veut permettre de ne passer que les champs à modifier
type ArtistPatch = {
  [K in keyof Artist]?: Artist[K];
};

// Maintenant si Artist évolue, ArtistPatch suit automatiquement
```

---

## Les utility types de TypeScript

TypeScript expose des Mapped Types built-in qui couvrent les cas les plus courants :

| Utility Type | Ce qu'il fait |
|---|---|
| `Partial<T>` | Toutes les propriétés optionnelles |
| `Required<T>` | Toutes les propriétés obligatoires |
| `Readonly<T>` | Toutes les propriétés en lecture seule |
| `Record<K, V>` | Crée un objet avec des clés `K` et des valeurs `V` |
| `Pick<T, K>` | Ne garde que les clés `K` de `T` |
| `Omit<T, K>` | Supprime les clés `K` de `T` |

Tous ces types sont implémentés avec des Mapped Types en interne dans la stdlib TypeScript.

---

## Ce que ça change en pratique

- Zéro duplication pour les variantes de types (patch, partial, readonly, etc.)
- Les types restent synchronisés automatiquement quand le type source évolue
- Le code est plus expressif : `Partial<User>` communique l'intention immédiatement

---

## Lien avec d'autres concepts

- Souvent combinés avec les **Conditional Types** pour des transformations plus complexes
- Utiles pour typer les **DTOs** (on peut générer un DTO depuis le type de domaine)
- Liés aux **Value Objects** : on peut créer des variantes strictement typées sans réécrire les types

---

## Ressources

- Documentation officielle TypeScript : https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
- Total TypeScript (Matt Pocock) : https://www.totaltypescript.com/concepts/mapped-type

---

## À faire

- [ ] Trier : garder / promouvoir en Note Permanente / supprimer
- [ ] Relier à "DTO" et "Value Object"
- [ ] Explorer les utility types du projet en cours qui pourraient être simplifiés avec des Mapped Types
