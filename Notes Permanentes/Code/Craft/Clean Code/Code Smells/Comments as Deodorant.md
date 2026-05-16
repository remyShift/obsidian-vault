---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
Un commentaire qui explique **ce que** fait le code plutôt que **pourquoi** une décision a été prise. Si le code a besoin d'un commentaire pour être compris, c'est le code qui est mal écrit, pas l'absence de commentaire. Cf. [[L’utilisation des commentaires]], [[L’art du nommage]].

```js
// ❌ Comments as Deodorant — les commentaires masquent un code mal nommé
function process(d) {
  // get all active users
  const u = d.filter(x => x.s === 1);

  // calculate total revenue
  let t = 0;
  for (const i of u) {
    t += i.r; // add revenue
  }

  // return average
  return t / u.length;
}
```

Supprimer les commentaires révèle le vrai problème : les noms. Les commentaires sont du déodorant sur du code qui pue.

```js
// ✅ le code s'explique lui-même
function calculateAverageRevenueForActiveUsers(users) {
  const activeUsers = users.filter(user => user.status === 'active');
  const totalRevenue = activeUsers.reduce((sum, user) => sum + user.revenue, 0);
  return totalRevenue / activeUsers.length;
}
```

Zéro commentaire, tout est lisible. La logique n'a pas changé, seulement les noms.

Le commentaire légitime, c'est l'explication du **pourquoi** : une décision contre-intuitive, une contrainte métier non évidente, un workaround avec son contexte. Pas le **quoi**.

```js
// ✅ commentaire légitime — explique une décision non évidente
// On divise par 100 parce que Stripe renvoie les montants en centimes
const amountInEuros = stripeAmount / 100;

// ✅ autre commentaire légitime — contrainte métier spécifique
// La TVA sur les cosmétiques est à 20% en France métropolitaine mais 8.5% en Outre-Mer
// Source : CGI art. 296 bis
const TAX_RATE_METROPOLITAN = 0.20;
const TAX_RATE_OVERSEAS = 0.085;
```

**Fix :** renommer variables et fonctions pour qu'elles expriment l'intention, extraire une fonction bien nommée pour chaque bloc qui avait besoin d'un commentaire de section. Cf. [[L'Extraction]], [[Le Renommage]].

**Signal d'identification :** commentaire qui commence par "// get", "// calculate", "// check", "// loop through" — tout ce qui décrit mécaniquement ce que la ligne suivante fait déjà. Retirer le commentaire et voir si le code devient opaque : si oui, c'est le code à fixer.
