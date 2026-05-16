---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
La même logique existe à plusieurs endroits dans le code. Quand la règle métier derrière change, il faut la modifier partout, et on en oublie toujours une. C'est une bombe à retardement.

```js
// ❌ duplicate code — la règle de calcul de TVA existe deux fois
function getOrderTotal(order) {
  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.2; // TVA 20%
  return subtotal + tax;
}

function getInvoiceTotal(invoice) {
  const subtotal = invoice.lines.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);
  const tax = subtotal * 0.2; // TVA 20%
  return subtotal + tax;
}
```

Si la TVA passe à 21%, tu dois changer deux endroits. Si tu en rates un, le système est incohérent et tu ne le sauras peut-être pas avant qu'un client se plaigne.

```js
// ✅ logique centralisée, appelée depuis les deux endroits
function applyTax(amount, rate = 0.2) {
  return amount * (1 + rate);
}

function getOrderTotal(order) {
  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return applyTax(subtotal);
}

function getInvoiceTotal(invoice) {
  const subtotal = invoice.lines.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);
  return applyTax(subtotal);
}
```

Le duplicate code n'est pas toujours une copie exacte. Parfois c'est la même intention exprimée différemment, ou la même séquence d'opérations dans un ordre légèrement différent. C'est plus difficile à repérer mais tout aussi problématique.

**Fix :** `Extract Function` pour centraliser la logique commune. Si la duplication est entre classes, `Extract Class` ou `Move Method`. Cf. [[L'Extraction]].

**Signal d'identification :** `Ctrl+F` sur un bout de logique et tu trouves plusieurs occurrences, modification d'une règle métier qui t'oblige à chercher "tous les endroits où", tests qui reproduisent la même setup.
