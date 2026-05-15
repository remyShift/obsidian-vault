---
tags: [SoftwareCraft, Tests]
---
Un test paramétrique est un test qui exécute la même logique plusieurs fois avec des données d'entrée différentes. Au lieu de dupliquer le même test pour chaque cas, on définit une structure unique qui accepte des paramètres et on lui passe un tableau de jeux de données.

L'idée centrale est de **séparer la structure du test de ses données**.

---

## Le problème qu'ils résolvent

Sans tests paramétriques, tester une même fonction sur plusieurs cas ressemble à ça :

```typescript
it('additionne 1 + 1', () => expect(add(1, 1)).toBe(2));
it('additionne 2 + 3', () => expect(add(2, 3)).toBe(5));
it('additionne 0 + 0', () => expect(add(0, 0)).toBe(0));
it('additionne -1 + 1', () => expect(add(-1, 1)).toBe(0));
```

C'est du copier-coller pur. Si la logique du test change, il faut modifier chaque occurrence. On viole le principe DRY, on rend la maintenance coûteuse, et on masque la structure réelle de ce qui est testé.

---

## Fonctionnement

La structure est la même dans la plupart des frameworks de test. On définit un tableau de cas, et le runner crée automatiquement un test par entrée.

### Exemple en TypeScript (Vitest / Jest)

```typescript
describe('add()', () => {
  it.each([
    [1, 1, 2],
    [2, 3, 5],
    [0, 0, 0],
    [-1, 1, 0],
  ])('add(%i, %i) === %i', (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });
});
```

Chaque ligne du tableau devient un cas de test indépendant dans le rapport d'exécution.

### Avec des objets nommés (plus lisible)

```typescript
it.each([
  { a: 1, b: 1, expected: 2, label: 'cas normal' },
  { a: -1, b: 1, expected: 0, label: 'négatif et positif' },
])('$label : add($a, $b) === $expected', ({ a, b, expected }) => {
  expect(add(a, b)).toBe(expected);
});
```

---

## Quand les utiliser

À utiliser quand :
- On teste la même fonction ou logique pour plusieurs valeurs d'entrée
- L'assertion est identique pour tous les cas (seules les données changent)
- On commence à copier-coller des tests existants

À ne pas utiliser quand :
- Les cas sont tellement différents qu'ils méritent des tests distincts avec des noms explicites
- La logique d'assertion change d'un cas à l'autre

---

## Ce que ça change

- Code de test plus court, plus lisible
- Ajout d'un nouveau cas = ajouter une ligne dans le tableau
- Le rapport de test montre clairement quel jeu de données a échoué

Ils couvrent uniquement les cas qu'on a pensé à définir, les [[Tests de Propriétés]] complètent cette approche en générant automatiquement des valeurs aléatoires pour trouver des cas qu'on n'aurait pas imaginés.
