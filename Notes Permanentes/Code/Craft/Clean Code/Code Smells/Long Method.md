---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
Une fonction qui fait trop de choses. Plus elle est longue, plus elle cumule des responsabilités distinctes, plus elle est difficile à lire, tester et modifier. Le signal le plus fiable : tu ressens le besoin d'ajouter un commentaire pour expliquer ce que fait un bloc à l'intérieur du corps.

```js
// ❌ long method — trois responsabilités mélangées
function processOrder(order) {
  // validation
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items');
  }
  if (!order.customerId) {
    throw new Error('Order must have a customer');
  }

  // calcul du total
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  if (order.promoCode === 'WELCOME10') {
    total = total * 0.9;
  }

  // persistance
  db.save({ ...order, total, status: 'confirmed' });
  emailService.send(order.customerId, 'Order confirmed');
}
```

Chaque bloc commenté est une fonction qui attend d'exister. Le fait que tu aies besoin du commentaire pour t'y retrouver le prouve.

```js
// ✅ Extract Function — chaque fonction a une responsabilité claire
function processOrder(order) {
  validateOrder(order);
  const total = calculateTotal(order);
  saveAndNotify({ ...order, total });
}

function validateOrder(order) {
  if (!order.items?.length) throw new Error('Order must have items');
  if (!order.customerId) throw new Error('Order must have a customer');
}

function calculateTotal(order) {
  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return applyPromoCode(subtotal, order.promoCode);
}

function applyPromoCode(amount, code) {
  if (code === 'WELCOME10') return amount * 0.9;
  return amount;
}

function saveAndNotify(order) {
  db.save({ ...order, status: 'confirmed' });
  emailService.send(order.customerId, 'Order confirmed');
}
```

**Fix :** `Extract Function`. Cf. [[L'Extraction]] et [[Structurer le code]].

**Signal d'identification :** besoin de commenter un bloc, difficulté à nommer la fonction en une phrase, impossibilité de la tester sans tester dix comportements différents en même temps.
