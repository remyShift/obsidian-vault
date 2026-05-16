---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
Passer un booléen à une fonction pour modifier son comportement. C'est une violation de SRP cachée dans la signature : la fonction fait deux choses selon la valeur du flag, ce qui signifie qu'elle devrait être deux fonctions. Cf. [[Les Principes SOLID]].

```js
// ❌ flag argument — que fait `true` ici ?
processOrder(order, true);

// Pour comprendre, il faut aller lire l'implémentation
function processOrder(order, sendEmail) {
  // ... logique ...
  if (sendEmail) {
    emailService.send(order.customerId, 'Order confirmed');
  }
}
```

L'appelant ne peut pas comprendre ce que fait `true` sans lire la définition. Et la fonction gère deux comportements distincts dans un seul corps.

```js
// ✅ deux fonctions aux noms explicites
processOrder(order);
processOrderAndNotify(order);

function processOrder(order) {
  // logique pure de traitement
}

function processOrderAndNotify(order) {
  processOrder(order);
  emailService.send(order.customerId, 'Order confirmed');
}
```

Cas particulier : si le comportement varie massivement selon le flag, avec des logiques qui divergent dès le début de la fonction, c'est encore plus urgent de séparer. Si la variation est légère (juste un `if` en fin de fonction), la séparation reste préférable mais le smell est moins critique.

**Fix :** remplacer par deux fonctions nommées explicitement, ou si le comportement est plus complexe, envisager le pattern [[Design Patterns Behavioral|Strategy]].

**Signal d'identification :** appel avec `true` ou `false` sans contexte lisible, `if (flag)` dans le corps de la fonction qui change un comportement entier.
