---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
Des valeurs littérales numériques ou textuelles utilisées directement dans le code sans être nommées. Le lecteur ne peut pas savoir ce que représente `0.2`, `86400`, ou `'ROLE_ADMIN'` sans lire le contexte ou fouiller la doc.

```js
// ❌ Magic Numbers et Magic Strings — que veulent dire ces valeurs ?
function calculateTotal(price, userType) {
  if (userType === 'premium') {
    return price * 0.85;
  }
  if (price > 1000) {
    return price * 0.95;
  }
  return price;
}

setTimeout(() => session.expire(), 86400000);
```

Trois problèmes. `0.85` : c'est quoi exactement ? Un discount de 15% ? Une taxe ? `86400000` : c'est combien de jours ? Et si tu veux changer le timeout, tu le retrouves comment parmi toutes les occurrences de nombres dans le projet ?

```js
// ✅ constantes nommées — le nom documente l'intention
const PREMIUM_DISCOUNT_RATE = 0.85;
const BULK_ORDER_DISCOUNT_RATE = 0.95;
const BULK_ORDER_THRESHOLD = 1000;
const SESSION_TIMEOUT_MS = 24 * 60 * 60 * 1000; // 24h exprimées de manière lisible

const USER_TYPES = {
  PREMIUM: 'premium',
  STANDARD: 'standard',
};

function calculateTotal(price, userType) {
  if (userType === USER_TYPES.PREMIUM) {
    return price * PREMIUM_DISCOUNT_RATE;
  }
  if (price > BULK_ORDER_THRESHOLD) {
    return price * BULK_ORDER_DISCOUNT_RATE;
  }
  return price;
}

setTimeout(() => session.expire(), SESSION_TIMEOUT_MS);
```

La constante nommée fait trois choses à la fois : elle documente l'intention, elle centralise la valeur (un seul endroit à changer), et elle rend les recherches possibles dans le projet.

Note : certains nombres sont suffisamment universels pour ne pas avoir besoin d'un nom (`0`, `1`, `-1`, `100` dans un contexte de pourcentage). Le critère : est-ce que la valeur a une signification spécifique dans le domaine ? Si oui, elle mérite un nom.

**Fix :** extraire en constante nommée. Si la valeur représente un concept métier, envisager un [[Value Object]] ou une enum.

**Signal d'identification :** nombre ou string littéral dans une condition ou un calcul, même valeur littérale à plusieurs endroits du code, valeur dont tu ne peux pas expliquer la signification en lisant la ligne seule.
