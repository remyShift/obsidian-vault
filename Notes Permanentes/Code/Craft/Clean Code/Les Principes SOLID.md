> [!info]- Tags
> #SoftwareCraft #CleanCode 

Les principes **SOLID** sont cinq bonnes pratiques en **programmation orientée objet** qui visent à rendre le code plus **maintenable**, **flexible** et **facile à faire évoluer**.

Ces cinq principes sont une formalisation de deux concepts fondamentaux : [[Coupling & Cohesion|couplage faible et cohésion forte]]. Comprendre SOLID sans comprendre ces deux concepts, c'est apprendre les règles sans comprendre pourquoi elles existent.

## **S** – Single Responsibility Principle (SRP)  

**Une classe ne doit avoir qu'une seule raison de changer.**  
- Autrement dit, une classe doit avoir une **responsabilité unique** : elle ne doit s'occuper que d'un seul aspect du programme.

✅ Avantages :  
- Code plus clair, plus modulaire  
- Meilleure testabilité  
- Faible couplage

💥 Mauvais exemple :  
Une classe `Invoice` qui calcule le total **et** envoie un email.  
➡️ Séparer en `InvoiceCalculator` et `InvoiceMailer`.

## **O** – Open/Closed Principle (OCP)  

**Le code doit être ouvert à l'extension, mais fermé à la modification.**  
- On doit pouvoir **ajouter** de nouvelles fonctionnalités sans modifier le code existant.

✅ Utilise :  
- L'héritage  
- Les interfaces ou abstractions  
- Le polymorphisme

💥 Mauvais exemple :  
Un `PaymentProcessor` avec une `if` pour chaque type de paiement.  
	➡️ Mieux : créer une interface `PaymentMethod` et des classes `CreditCard`, `PayPal`, etc.

## **L** – Liskov Substitution Principle (LSP)  

**Les sous-classes doivent pouvoir être utilisées à la place de leur classe mère sans bug.**  
-  Si une classe `B` hérite de `A`, elle ne doit pas **casser le comportement** attendu.

💥 Mauvais exemple :  
Une classe `Bird` avec `fly()` et une sous-classe `Penguin` qui lance une erreur sur `fly()`.  
➡️ Refactoriser avec des classes séparées : `FlyingBird`, `NonFlyingBird`.

## **I** – Interface Segregation Principle (ISP)  

**Les clients ne doivent pas dépendre d'interfaces qu'ils n'utilisent pas.**  
-  Mieux vaut **plusieurs petites interfaces spécifiques** qu'une grosse interface générale.

💥 Mauvais exemple :  
Une interface `Worker` avec `work()` et `eat()`.  
	➡️ Séparer en `Workable`, `Eatable`.

## **D** – Dependency Inversion Principle (DIP)  

**Les modules de haut niveau ne doivent pas dépendre de modules de bas niveau, mais d'abstractions.**  
- Inverser les dépendances pour **découpler** les classes concrètes.
- En pratique, ne pas naviguer à travers des chaînes d'objets — cf. [[Loi de Déméter]].

✅ Utilise :  
- Les interfaces  
- L'injection de dépendances

💥 Mauvais exemple :  
Une classe `OrderService` crée directement une instance de `MySQLDatabase`.  
➡️ Mieux : dépendre d'une interface `Database` injectée depuis l'extérieur.

### 📌 Résumé mnémotechnique

| Lettre | Nom                   | Résumé rapide                                     |
| ------ | --------------------- | ------------------------------------------------- |
| S      | Single Responsibility | Une seule responsabilité par classe               |
| O      | Open/Closed           | Extensible sans modifier                          |
| L      | Liskov Substitution   | Une sous-classe doit respecter le contrat parent  |
| I      | Interface Segregation | Petites interfaces spécifiques                    |
| D      | Dependency Inversion  | Dépendre d'abstractions, pas de classes concrètes |

💡 **Astuce :** appliquer SOLID ne signifie pas sur-ingénierie. C'est un guide, pas une règle rigide.
