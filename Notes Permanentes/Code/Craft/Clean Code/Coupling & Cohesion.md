---
tags: [SoftwareCraft, CleanCode]
---

Couplage et cohésion sont le **socle sur lequel [[Les Principes SOLID|SOLID]] repose**. Comprendre ces deux concepts, c'est comprendre pourquoi SOLID existe.

---

## Cohésion

> La cohésion mesure à quel point les éléments **à l'intérieur** d'un module appartiennent ensemble.

Une classe est **fortement cohésive** si tout ce qu'elle contient sert le même objectif, la même responsabilité. En pratique : forte cohésion = une seule raison de changer (SRP).

Signes de faible cohésion :
- Noms de classe vagues : `Manager`, `Helper`, `Utils` sans qualifier quoi
- Classe avec beaucoup de méthodes sans lien entre elles
- Fichier qui grossit sans raison claire

---

## Couplage

> Le couplage mesure le degré de **dépendance entre modules**.

Deux classes sont **fortement couplées** si une modification dans l'une oblige à modifier l'autre. Faible couplage = les modules peuvent changer indépendamment.

Signes de fort couplage :
- Modifier une classe casse des tests dans d'autres classes non liées
- Impossible de tester une classe sans instancier 5 autres
- Beaucoup d'imports en haut d'un fichier
- Message chains (cf. [[Loi de Déméter]])

---

## La tension entre les deux

L'objectif est toujours :
- **Forte cohésion** à l'intérieur d'un module
- **Faible couplage** entre les modules

Ces deux objectifs se renforcent mutuellement. Une classe qui fait trop de choses (faible cohésion) finit toujours par être couplée à trop d'autres classes.

---

## Types de couplage (du pire au meilleur)

| Type | Description |
|---|---|
| **Content coupling** | Un module modifie directement les données internes d'un autre |
| **Common coupling** | Deux modules partagent une variable globale |
| **Control coupling** | Un module contrôle le flux d'un autre via un flag |
| **Stamp coupling** | On passe un objet entier alors qu'on n'a besoin que d'un champ |
| **Data coupling** | On passe uniquement les données nécessaires — idéal |

Réduire le couplage ne signifie pas supprimer toutes les dépendances — [[Dépendance sans Couplage]] précise exactement cette distinction.

---

## Lien avec SOLID

| SOLID | Rôle |
|---|---|
| **SRP** | Définit la bonne granularité de cohésion |
| **OCP** | Faible couplage permet d'étendre sans modifier |
| **LSP** | Cohésion de la hiérarchie d'héritage |
| **ISP** | Interfaces petites et cohésives évitent le couplage inutile |
| **DIP** | L'injection de dépendance est la technique principale pour réduire le couplage |
