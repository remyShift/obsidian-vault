> [!info]- Tags
> #SoftwareCraft #CleanCode #Refacto #LectureNote

# Code Smells

**Source :** Martin Fowler — *Refactoring*, Uncle Bob — *Clean Code*

Un **code smell** n'est pas un bug. C'est un signal que quelque chose dans la structure du code va rendre la maintenance plus difficile, plus risquée, plus coûteuse. Le smell est le déclencheur du refactoring.

> « A code smell is a surface indication that usually corresponds to a deeper problem in the system. » — Fowler

---

## Smells liés aux fonctions / méthodes

### Long Method
Une fonction qui fait trop de choses. Règle Uncle Bob : une fonction doit faire **une seule chose**.
- Signal : tu cherches des commentaires pour segmenter le corps → chaque segment est une fonction à extraire.
- Fix : **Extract Function**

### Long Parameter List
Plus de 2–3 paramètres = signe que les données sont mal regroupées.
- Fix : regrouper en un objet dédié (**Introduce Parameter Object**), ou remplacer par une méthode sur l'objet existant.

### Flag Argument
Passer un booléen à une fonction pour en changer le comportement.
- Signal : `processOrder(order, true)` — que veut dire `true` ?
- Fix : deux fonctions distinctes avec des noms explicites.

### Dead Code
Code commenté, fonctions jamais appelées, branches `if` impossibles.
- Fix : supprimer. Le versioning (git) existe pour retrouver ce qu'on a effacé.

### Duplicate Code
Même logique répétée à plusieurs endroits. Si la règle métier change, tu dois la changer partout — et tu en oublieras une.
- Fix : **Extract Function** + centraliser la connaissance.

---

## Smells liés aux classes

### God Class (Large Class)
Une classe qui sait tout faire. Elle accumule des responsabilités qui n'ont rien à voir entre elles.
- Violation directe du **SRP**.
- Fix : **Extract Class**, identifier des responsabilités distinctes et les séparer.

### Data Class
Une classe qui ne contient que des getters/setters, sans comportement. Elle est utilisée comme un simple conteneur de données — le comportement qui devrait lui appartenir est dispersé ailleurs.
- Fix : déplacer les opérations qui utilisent ces données dans la classe elle-même.

### Refused Bequest
Une sous-classe hérite d'une classe mère mais refuse (ignore ou lève une exception) certaines méthodes héritées.
- Violation directe du **LSP** (Liskov).
- Fix : revoir la hiérarchie d'héritage, souvent remplacer par composition ou interfaces séparées.

### Parallel Inheritance Hierarchies
À chaque fois que tu crées une sous-classe de A, tu dois aussi créer une sous-classe de B.
- Fix : fusionner ou déléguer une hiérarchie dans l'autre.

---

## Smells liés aux dépendances / relations

### Feature Envy
Une méthode est plus intéressée par les données d'une *autre* classe que par celles de la sienne.
```js
// Smell : OrderService utilise les données de Customer directement
calculateDiscount(customer) {
  return customer.loyaltyPoints * customer.tier.multiplier;
}
// Fix : cette logique appartient à Customer
```
- Fix : **Move Method** vers la classe dont les données sont utilisées.

### Inappropriate Intimacy
Deux classes se connaissent trop. L'une accède aux détails internes de l'autre.
- Fix : définir une interface claire, **Move Method/Field**, ou introduire un intermédiaire.

### Message Chains
`a.getB().getC().getD().doSomething()` — tu navigues à travers une chaîne d'objets.
- Violation de la **Loi de Déméter**.
- Fix : **Hide Delegate**, créer une méthode sur l'objet de départ qui encapsule la navigation.

### Middle Man
Une classe ne fait que déléguer — toutes ses méthodes redirigent vers une autre classe.
- Fix : **Remove Middle Man**, appeler directement la classe sous-jacente. Ou si la délégation a une raison d'être → Facade/Proxy (pattern légitime).

---

## Smells liés aux données

### Primitive Obsession
Utiliser des types primitifs (`string`, `number`) là où un objet dédié serait plus expressif.
```js
// Smell
const email = "remy@example.com"; // string brut
// Mieux
const email = new Email("remy@example.com"); // avec validation encapsulée
```
- Fix : **Replace Primitive with Object**

### Data Clumps
Certaines données apparaissent toujours ensemble (ex : `street`, `city`, `zipCode`) mais ne sont pas regroupées en objet.
- Fix : **Extract Class** → `Address`

### Magic Numbers / Magic Strings
Des valeurs littérales sans nom dans le code.
```js
if (status === 3) // que veut dire 3 ?
if (status === ORDER_STATUS.CANCELLED) // clair
```
- Fix : extraire en constante nommée.

---

## Smells liés au changement

### Divergent Change
Une classe change pour des raisons différentes à chaque modification. Tu modifies la classe pour changer la logique de pricing *et* pour changer le format d'export — deux responsabilités distinctes.
- Violation du **SRP**.
- Fix : **Extract Class**

### Shotgun Surgery
Un seul changement conceptuel t'oblige à toucher à plein de classes différentes. Inverse de Divergent Change.
- Fix : regrouper ce qui change ensemble dans la même classe (**Move Method/Field**).

---

## Smells liés aux commentaires

### Comments as Deodorant
Un commentaire qui explique ce que fait le code — le code devrait s'expliquer lui-même.
```js
// Mauvais : le commentaire compense un nommage pauvre
// multiply price by quantity
const result = p * q;

// Mieux : le code dit ce qu'il fait
const totalPrice = unitPrice * quantity;
```
- Fix : renommer, extraire une fonction bien nommée.

> Les seuls commentaires légitimes : le **pourquoi** (décision de conception), les avertissements, les TODO temporaires avec contexte.

---

## Tableau de synthèse rapide

| Smell | Cause principale | Fix principal |
|---|---|---|
| Long Method | Trop de responsabilités | Extract Function |
| God Class | Trop de responsabilités | Extract Class |
| Feature Envy | Mauvaise attribution | Move Method |
| Message Chains | Violation Déméter | Hide Delegate |
| Primitive Obsession | Manque d'abstraction | Replace Primitive with Object |
| Data Clumps | Données non regroupées | Extract Class |
| Shotgun Surgery | Couplage dispersé | Move Method/Field |
| Divergent Change | SRP violé | Extract Class |
| Magic Numbers | Manque de nommage | Constante nommée |
| Dead Code | Négligence | Supprimer |

---

## À retenir

Les smells ne demandent pas tous un refactoring immédiat. Ils **informent** une décision. La question est toujours : est-ce que corriger ce smell maintenant nous fait gagner en maintenabilité par rapport au coût de le faire ?
- Si tu touches au code concerné → règle du boy-scout, corrige en passant.
- Si tu ne touches pas → note-le, ne le laisse pas s'aggraver.
