> [!info]- Tags
> #SoftwareCraft #CleanCode #LectureNote

# Coupling & Cohesion

**Source :** Uncle Bob — *Clean Code*, Larry Constantine (origine du concept)

Ces deux concepts sont le **socle sur lequel SOLID repose**. Comprendre couplage et cohésion, c'est comprendre pourquoi SOLID existe.

---

## Cohésion

> La cohésion mesure à quel point les éléments **à l'intérieur** d'un module appartiennent ensemble.

Une classe/module est **fortement cohésif** si tout ce qu'il contient sert le même objectif, la même responsabilité.

```js
// ❌ Faible cohésion — UserManager fait trop de choses non liées
class UserManager {
  createUser(data) { ... }
  sendWelcomeEmail(user) { ... }
  exportUsersToCSV() { ... }
  calculateUserScore(user) { ... }
}

// ✅ Forte cohésion — chaque classe a un seul axe de changement
class UserRepository { createUser(data) { ... } }
class UserMailer { sendWelcomeEmail(user) { ... } }
class UserExporter { exportToCSV(users) { ... } }
class UserScoring { calculateScore(user) { ... } }
```

**Règle :** forte cohésion = chaque classe/module n'a **qu'une seule raison de changer** (SRP).

---

## Couplage

> Le couplage mesure le degré de **dépendance entre modules**.

Deux classes sont **fortement couplées** si une modification dans l'une oblige à modifier l'autre.

```js
// ❌ Fort couplage — OrderService dépend d'une implémentation concrète
class OrderService {
  constructor() {
    this.db = new MySQLDatabase(); // dépendance directe à MySQL
  }
}

// ✅ Faible couplage — dépend d'une abstraction
class OrderService {
  constructor(db) { // injection de dépendance
    this.db = db; // peu importe que ce soit MySQL, Postgres, un mock de test...
  }
}
```

**Règle :** faible couplage = les modules peuvent **changer indépendamment** les uns des autres.

---

## La tension entre les deux

L'objectif est toujours :
- **Forte cohésion** à l'intérieur d'un module
- **Faible couplage** entre les modules

Ces deux objectifs se renforcent mutuellement. Une classe qui fait trop de choses (faible cohésion) finit toujours par être couplée à trop d'autres classes.

---

## Types de couplage (du pire au meilleur)

| Type | Description | Exemple |
|---|---|---|
| **Content coupling** | Un module modifie directement les données internes d'un autre | Accès direct aux attributs privés |
| **Common coupling** | Deux modules partagent une variable globale | `global.config` modifié partout |
| **Control coupling** | Un module contrôle le flux d'un autre via un flag | `processOrder(order, true)` |
| **Stamp coupling** | On passe un objet entier alors qu'on n'a besoin que d'un champ | `getUsername(user)` au lieu de `getUsername(name)` |
| **Data coupling** | On passe uniquement les données nécessaires | Idéal — paramètres simples et précis |

Du pire (content) au meilleur (data) — on cherche à descendre dans ce tableau.

---

## Lien avec SOLID

| SOLID | Cohésion / Couplage |
|---|---|
| **SRP** | Définit la bonne granularité de cohésion |
| **OCP** | Faible couplage permet d'étendre sans modifier |
| **LSP** | Cohésion de la hiérarchie d'héritage |
| **ISP** | Interfaces petites et cohésives évitent le couplage inutile |
| **DIP** | L'injection de dépendance est *la* technique principale pour réduire le couplage |

---

## Métriques pratiques pour évaluer

**Signes de faible cohésion :**
- Noms de classe vagues : `Manager`, `Helper`, `Utils`, `Service` (sans qualifier quoi)
- Classe avec beaucoup de méthodes sans lien entre elles
- Fichier qui grossit sans raison claire

**Signes de fort couplage :**
- Modifier une classe casse des tests dans d'autres classes non liées
- Impossible de tester une classe sans instancier 5 autres
- Beaucoup d'imports en haut d'un fichier
- Message chains (Loi de Déméter)

---

## À retenir

Couplage et cohésion sont **deux faces de la même pièce**. Tu les évalues à chaque fois que tu crées une classe, que tu décides où mettre une méthode, ou que tu refactores. Si une modification te fait toucher à beaucoup d'endroits → couplage trop fort. Si une classe te semble fourre-tout → cohésion trop faible.
