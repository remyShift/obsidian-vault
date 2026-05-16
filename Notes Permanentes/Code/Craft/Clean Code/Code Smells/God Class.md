---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
Une classe qui concentre trop de responsabilités : elle connaît trop de choses, fait trop de choses, et tout le monde dépend d'elle. Violation directe du SRP. Cf. [[Les Principes SOLID]].

```js
// ❌ God Class — UserManager gère l'auth, la validation, l'email, la BDD
class UserManager {
  validateEmail(email) { /* ... */ }
  hashPassword(password) { /* ... */ }
  saveToDatabase(user) { /* ... */ }
  sendWelcomeEmail(user) { /* ... */ }
  generateAuthToken(user) { /* ... */ }
  checkPermissions(user, resource) { /* ... */ }
  updateLastLogin(userId) { /* ... */ }
  deleteAccount(userId) { /* ... */ }
}
```

La God Class attire continuellement du code nouveau parce que "c'est là que tout est déjà". Elle grossit sans jamais naturellement se diviser. Résultat : personne n'ose la toucher, les tests sont impossibles à isoler, et tout changement a des effets de bord imprévisibles.

```js
// ✅ responsabilités séparées en classes cohérentes
class UserValidator {
  validateEmail(email) { /* ... */ }
  validatePassword(password) { /* ... */ }
}

class UserRepository {
  save(user) { /* ... */ }
  delete(userId) { /* ... */ }
  updateLastLogin(userId) { /* ... */ }
}

class AuthService {
  hashPassword(password) { /* ... */ }
  generateToken(user) { /* ... */ }
}

class UserNotificationService {
  sendWelcomeEmail(user) { /* ... */ }
}

class PermissionService {
  check(user, resource) { /* ... */ }
}
```

Chaque classe a une raison de changer, et une seule. Quand l'envoi d'email change, seul `UserNotificationService` est touché.

**Fix :** `Extract Class` — identifier les groupes de méthodes qui travaillent sur les mêmes données ou servent le même but, et les sortir dans leur propre classe.

**Signal d'identification :** classe avec plus de 200-300 lignes, classe dont le nom contient "Manager", "Handler", "Utils", "Service" sans qualifier clairement ce qu'elle fait, classe qui importe une dizaine de dépendances différentes.
