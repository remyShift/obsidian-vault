---
tags: [SoftwareCraft, Tests]
---
Les tests de propriétés (ou PBT, Property-Based Testing) sont une approche dans laquelle on ne définit pas des exemples précis d'entrées/sorties, mais des **propriétés** : des invariants qui doivent toujours être vrais, quelle que soit l'entrée.

Le framework génère alors automatiquement des centaines ou milliers de valeurs aléatoires et vérifie que la propriété tient dans tous les cas.

L'idée centrale est de **décrire ce qui doit toujours être vrai plutôt que de lister des exemples**.

---

## Tests classiques vs tests de propriétés

| Tests classiques (example-based) | Tests de propriétés |
|---|---|
| Entrées et sorties codées en dur, comme dans les [[Tests Paramétriques]] | Entrées générées aléatoirement |
| Couvrent les cas qu'on a pensé à écrire | Couvrent des cas qu'on n'aurait pas imaginés |
| Faciles à lire et à comprendre | Nécessitent de penser en invariants |
| Maintenance manuelle des cas | Maintenance de la propriété uniquement |

Les tests de propriétés ne remplacent pas les tests classiques. Ils ajoutent une couche supplémentaire qui peut révéler des edge cases invisibles.

---

## Fonctionnement

### La boucle interne

1. Le framework génère une valeur aléatoire du type demandé
2. Il l'injecte dans le test
3. Il vérifie que la propriété tient
4. En cas d'échec, il **shrinks** (réduit) l'entrée au cas minimal qui fait échouer
5. Il rapporte ce cas minimal avec le seed utilisé pour pouvoir reproduire l'erreur

Le shrinking est clé : au lieu de trouver un tableau de 200 éléments qui casse le test, le framework trouve le plus petit tableau possible qui reproduit le bug.

### Reproductibilité

Chaque run utilise un seed. En cas d'échec, le seed est affiché pour pouvoir relancer le test exactement dans les mêmes conditions.

---

## Exemple concret (TypeScript avec fast-check)

```typescript
import { testProp, fc } from 'fast-check';

testProp(
  'reverse(reverse(arr)) === arr',
  [fc.array(fc.integer())],
  (arr) => {
    expect(arr.slice().reverse().reverse()).toEqual(arr);
  }
);
```

`fc.array(fc.integer())` dit au framework de générer des tableaux d'entiers aléatoires. Pas besoin de spécifier les valeurs.

### Autre exemple : addition commutative

```typescript
testProp(
  'add(a, b) === add(b, a)',
  [fc.integer(), fc.integer()],
  (a, b) => {
    expect(add(a, b)).toBe(add(b, a));
  }
);
```

---

## Comment penser en propriétés

C'est le défi principal. Quelques patterns courants :

- **Aller-retour** : `decode(encode(x)) === x`
- **Idempotence** : `sort(sort(arr))` donne le même résultat que `sort(arr)`
- **Invariant structurel** : `filter(arr).length <= arr.length` toujours
- **Relation entre implémentations** : une version naïve (lente mais correcte) vs une version optimisée doivent donner les mêmes résultats

---

## Outils

- JavaScript/TypeScript : **fast-check** (https://fast-check.dev)
- Python : **Hypothesis**
- Haskell : **QuickCheck** (l'original, qui a inspiré tous les autres)

---

## Ce que ça change

- Révèle des bugs dans des cas limites qu'on n'aurait jamais écrit manuellement (entiers négatifs, tableaux vides, chaînes Unicode, etc.)
- Pousse à mieux comprendre les invariants du code qu'on écrit
- Complémentaire aux tests classiques, pas un remplacement
