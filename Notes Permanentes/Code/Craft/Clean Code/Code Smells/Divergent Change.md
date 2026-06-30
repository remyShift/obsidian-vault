---
tags: [SoftwareCraft, CleanCode, Refactoring]
---

Une classe qui change pour plusieurs raisons distinctes. À chaque sprint, des modifications la touchent pour des motifs complètement différents. C'est la violation la plus directe du SRP : une classe devrait avoir une seule raison de changer. Cf. [[Les Principes SOLID]].

```js
// ❌ Divergent Change — User change quand la logique auth change,
// quand le profil change, quand les préférences UI changent, quand la facturation change
class User {
  // auth
  hashPassword(password) { /* ... */ }
  generateResetToken() { /* ... */ }
  validateSession(token) { /* ... */ }

  // profil
  updateBio(bio) { /* ... */ }
  uploadAvatar(file) { /* ... */ }

  // préférences
  setTheme(theme) { /* ... */ }
  setNotificationSettings(settings) { /* ... */ }

  // facturation
  addPaymentMethod(card) { /* ... */ }
  getInvoices() { /* ... */ }
}
```

Chaque groupe de méthodes évolue indépendamment. L'équipe auth modifie `User` sans rapport avec l'équipe produit qui modifie aussi `User`. Résultat : conflits git, risques de régression, classe impossible à tester unitairement.

```js
// ✅ chaque classe a une raison de changer
class AuthService {
  hashPassword(password) { /* ... */ }
  generateResetToken(userId) { /* ... */ }
  validateSession(token) { /* ... */ }
}

class UserProfile {
  updateBio(userId, bio) { /* ... */ }
  uploadAvatar(userId, file) { /* ... */ }
}

class UserPreferences {
  setTheme(userId, theme) { /* ... */ }
  setNotificationSettings(userId, settings) { /* ... */ }
}

class BillingService {
  addPaymentMethod(userId, card) { /* ... */ }
  getInvoices(userId) { /* ... */ }
}
```

Le test mental : si tu décrivais les raisons pour lesquelles cette classe pourrait changer, combien en comptes-tu ? Plus d'une = Divergent Change.

La différence avec [[Shotgun Surgery]] : Divergent Change, c'est une classe qui change pour trop de raisons. Shotgun Surgery, c'est une raison de changer qui force à modifier trop de classes. Les deux sont des violations du SRP mais dans des directions opposées.

**Fix :** `Extract Class` pour chaque responsabilité distincte identifiée.

**Signal d'identification :** classe que plusieurs équipes ou features touchent régulièrement, modifications successives de la classe pour des bugs ou features sans rapport, classe dont tu ne peux pas expliquer la responsabilité en une phrase.
