---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
Code commenté, fonctions jamais appelées, branches inaccessibles, variables jamais lues. Ce code encombre la lecture, génère des questions ("pourquoi c'est là ? est-ce que j'ai le droit de le supprimer ?"), et n'apporte rien.

```js
// ❌ dead code — que des questions sans réponses
function calculateDiscount(order) {
  // ancien système de promo, à remettre si besoin ?
  // if (order.promoCode) {
  //   return applyLegacyPromo(order);
  // }

  return order.total * 0.9;
}

// fonction plus appelée depuis le refacto de mars
function applyLegacyPromo(order) {
  return order.total - 15;
}
```

Le code commenté est particulièrement insidieux : il laisse croire qu'il pourrait servir, mais sans contexte ni date, personne ne sait si c'est vrai. Il vieillit, se désynchronise du code réel, et finit par être pire qu'une absence.

```js
// ✅ supprimé proprement
function calculateDiscount(order) {
  return order.total * 0.9;
}
```

Git conserve l'historique. Si ce code avait de la valeur, il est retrouvable. La peur de perdre du code est le seul argument pour le garder commenté, et c'est un mauvais argument.

**Fix :** supprimer. Pas commenter, pas mettre dans un fichier "archive", supprimer.

**Signal d'identification :** code commenté avec un "// à remettre si..." ou sans explication, fonctions qui n'apparaissent dans aucun appel du projet, variables déclarées et jamais lues (ton linter devrait te signaler ça).
