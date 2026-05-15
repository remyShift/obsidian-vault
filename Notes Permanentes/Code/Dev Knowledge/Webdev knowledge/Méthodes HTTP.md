---
tags: [WebDevKnowledge]
---


Les méthodes HTTP sont utilisées pour interagir avec les ressources d'un serveur web dans une architecture RESTful. Voici les principales méthodes, leur rôle et leurs usages courants :

---

#### 1. GET
- **Rôle** : Récupérer des données depuis le serveur (lecture seule).
- **Caractéristiques** :
  - N'affecte pas la ressource (opération non destructive).
  - Les données sont envoyées dans l'URL.
  - Pas de corps de requête.
- **Exemple d'utilisation** : Récupérer la liste des utilisateurs, récupérer un article de blog.
  
---

#### 2. POST
- **Rôle** : Envoyer des données au serveur pour créer une nouvelle ressource.
- **Caractéristiques** :
  - Crée une nouvelle ressource sur le serveur.
  - Les données sont envoyées dans le corps de la requête.
- **Exemple d'utilisation** : Créer un nouvel utilisateur, soumettre un formulaire de contact.

---

#### 3. PUT
- **Rôle** : Mettre à jour une ressource existante ou en créer une si elle n'existe pas.
- **Caractéristiques** :
  - Remplace entièrement la ressource ciblée.
  - Utilise l'URI de la ressource à modifier.
- **Exemple d'utilisation** : Mettre à jour un profil utilisateur, remplacer un fichier sur un serveur.

---

#### 4. PATCH
- **Rôle** : Mettre à jour **partiellement** une ressource existante.
- **Caractéristiques** :
  - Modifie uniquement les champs spécifiés.
  - Plus léger que PUT lorsqu'une mise à jour partielle est nécessaire.
- **Exemple d'utilisation** : Changer uniquement l'e-mail d'un utilisateur.

---

#### 5. DELETE
- **Rôle** : Supprimer une ressource du serveur.
- **Caractéristiques** :
  - Supprime définitivement la ressource identifiée.
- **Exemple d'utilisation** : Supprimer un utilisateur ou un commentaire.

---

#### 6. OPTIONS
- **Rôle** : Demander au serveur quelles méthodes HTTP sont disponibles pour une ressource donnée.
- **Caractéristiques** :
  - Utilisé pour la négociation de capacités (découvrir quelles méthodes sont autorisées).
- **Exemple d'utilisation** : Tester si l'API permet des actions comme GET, POST, ou DELETE sur une ressource spécifique.

---

#### 7. HEAD
- **Rôle** : Similaire à GET, mais sans renvoyer le corps de la réponse (uniquement les en-têtes).
- **Caractéristiques** :
  - Utilisé pour vérifier l'existence d'une ressource ou obtenir des métadonnées.
- **Exemple d'utilisation** : Vérifier si un fichier existe avant de le télécharger.

---

### Résumé des usages typiques des méthodes HTTP :

| Méthode  | Usage                  | Effet sur les ressources |
|----------|------------------------|--------------------------|
| **GET**  | Récupérer des données   | Aucun (lecture seule)     |
| **POST** | Créer une nouvelle ressource | Modifie le serveur (création) |
| **PUT**  | Mettre à jour/Remplacer | Remplacement complet      |
| **PATCH**| Mise à jour partielle   | Modification partielle    |
| **DELETE**| Supprimer une ressource| Supprime la ressource     |
| **OPTIONS**| Découvrir les capacités| Aucun                    |
| **HEAD** | Récupérer des métadonnées | Aucun (pas de corps)     |

---

### Bonnes pratiques
- **GET** : Ne jamais utiliser pour envoyer des données sensibles (ex. mots de passe), car elles peuvent apparaître dans l'URL.
- **POST, PUT, PATCH** : Utiliser ces méthodes lorsque des modifications de ressources sont nécessaires.
- **DELETE** : S'assurer que l'opération est bien intentionnelle, car elle supprime définitivement la ressource.

Quand un service expose une API REST, un [[SDK]] peut encapsuler ces appels pour gérer automatiquement l'auth, les erreurs et la sérialisation.