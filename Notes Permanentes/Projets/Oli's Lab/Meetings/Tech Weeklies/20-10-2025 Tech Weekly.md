---
date: 2025-10-20
type: meeting
projet: Oli's Lab
tags:
  - tech-weekly
  - olis-lab
participants:
  - Michele
  - Patrick
  - Diego
  - Lucas
  - Ante
  - Remy
lien: https://www.notion.so/olislab/Tech-Weekly-2924bf4c7fa181c9b19dceabe2580a34
---

# Tech Weekly - 20 octobre 2025

---

## Avancement des projets

### Skincare Rating System V2 (Patrick)
- Patrick bloqué sur un problème de cluster MongoDB : les collections qu'il utilise localement ne sont pas dans le bon cluster (pas dans celui d'Oli's Lab)
- Solution choisie : copier les données manuellement entre clusters + re-lancer les scripts pour vérifier la cohérence
- Une fois débloqué, prochaine étape : adapter le système pour noter les produits Body Care
- Les graphiques (front) ne devraient pas prendre longtemps une fois le blocage levé

### Optimisation base de données
- Le PR de Diego (suppression des connexions inutiles à MongoDB) est mergé et déployé sur staging
- Résultat visible : le nombre de connexions actives a chuté significativement
- Contexte : le cluster avait été upgradé de M5 à M10-M20 parce qu'on approchait la limite de connexions, mais ça semblait anormal pour le trafic qu'on a
- Conclusion : on n'avait pas besoin du M10-M20 à cause du trafic, mais à cause de connexions inutiles. Diego a résolu le vrai problème.
- Stockage actuel : ~2.7 Go utilisés sur 10 Go disponibles, bien dans les limites
- Michele veut essayer de redescendre au M5 mais MongoDB ne le permet pas encore, à creuser

### UI Package & Cookie Banner (Diego)
- PR du UI package reviewée par Michele, prête à merger
- Cookie banner : design desktop terminé, **mobile manquant** à terminer aujourd'hui ou demain
- Breakpoint mobile confirmé : < 640px = full width pour la bannière
- Objectif : push en prod **mercredi**
- Après le deploy : Michele doit vérifier avec le service juridique que la bannière couvre bien les obligations légales

---

## Fonctionnalités en cours

### Intégration Google Merchant (Rémy + Diego)
- PR en cours de review, conflicts à résoudre
- La refacto ne fait pas encore la connexion Meta Merchant, mais l'architecture Adapter la rend facile à ajouter
- Objectif : mergé et déployé **cette semaine**
- Une fois mergé, Michele veut revoir avec Rémy les flows de mise à jour : quand est-ce que Google Merchant doit être notifié exactement ?

### Google Analytics & Google Tag
- Déjà fait. À tester en production avec du vrai trafic.
- Rémy a ajouté l'identification utilisateur sur PostHog (email + user ID) : fonctionne sur staging. Michele veut le vérifier aussi en prod.

### Intégration Klaviyo (Michele)
- Templates retrouvés dans Klaviyo
- Prochaine étape : créer le flow + envoyer le bon payload lors de l'événement `signup_newsletter` ou `signup_website`
- L'API Klaviyo existe déjà dans le codebase, pas besoin de refacto majeure

### Filtres & tri produits (Lucas / Rémy)
- Feature développée par Lucas, toujours sur une branche (Lucas absent/malade)
- Bugs identifiés par Michele :
  - Tri alphabétique : un produit avec un espace avant le nom passe avant "A" (problème de données dans la DB, pas du code)
  - Filtre "Oli's Lab Rating Lowest" : les bundles sans rating remontent en premier (comportement à valider ou corriger)
  - Combinaison de filtres (ex. alphabétique + rating) : comportement incohérent, semble fonctionner sur mobile mais pas desktop
  - Double bordure visuelle dans la UI du filtre
- Michele va lister tous les cas problématiques et les envoyer à Lucas. Si Lucas ne peut pas traiter, Rémy prend selon sa dispo après GA.

### Gift with Purchase (GWP) (Diego)
- Feature critique : doit être **live le 10 novembre**
- Diego a déjà tout mappé, estime ~1 jour de dev
- Uniquement front-end a priori, pas de gros changements DB
- Sera le premier test concret du système de **feature flags**
- Plan :
  - Prêt pour staging **vendredi 31 octobre**
  - Déployé en prod avec feature flag **le 5 novembre**
  - Tests internes (liste d'IPs ou d'utilisateurs ciblés) avant ouverture générale le 10
- **Prérequis :** l'identification des utilisateurs (email via PostHog/distinct ID) doit fonctionner correctement en prod avant de pouvoir cibler des users pour le flag

---

## Architecture & base de données

### Refactoring des schémas DB (Michele + Diego)
- Objectif : retravailler les noms et la structure des collections d'ici fin de semaine prochaine
- Problèmes actuels :
  - Collections inutilisées (à archiver, pas supprimer)
  - Naming incohérent : certaines collections préfixées `shop_`, d'autres `notion_`, d'autres rien
  - `ingredients` ne correspond pas à ce qu'on attend d'une collection d'ingrédients
- Direction : séparer clairement les collections en deux namespaces :
  - Collections **scientifiques** : pour le projet de rating
  - Collections **web/e-commerce** : pour la boutique
  - Collections **partagées** : ex. ingrédients référencés des deux côtés
- Michele va créer un projet dédié "DB Schemas" pour documenter et proposer la nouvelle structure

### Collections de catégories (Michele)
- Aujourd'hui, les catégories (Skincare, Body Care, Tools & Accessories) et sous-catégories sont des strings embarquées dans les produits
- Plan : créer des collections `categories` et potentiellement `subcategories` dans MongoDB
- Les produits référenceront la sous-catégorie par ObjectId, la catégorie sera déduite de la sous-catégorie
- Bénéfice : pouvoir filtrer les catégories vides (pas de produits associés) côté front
- Problème constaté : il existe un produit "fantôme" dans Body Care (sans nom, sans marque) probablement issu du scraping scientifique qui s'est retrouvé dans les collections shop. À nettoyer.
- Michele va rédiger une proposition et la soumettre à l'équipe avant d'implémenter

---

## Deploy du jour

- Deploy en prod prévu **cet après-midi** (Diego + Michele)
- Ce qui part :
  - UI package (cookie banner desktop)
  - Google Merchant refacto (si PR mergée à temps)
  - Potentiellement d'autres PRs reviewées ce matin
- Objectif : 2 déploiements par semaine pour limiter la taille des rollbacks

---

## Actions

- [ ] **Patrick** - Résoudre le problème de cluster, migrer les données, relancer les scripts, finir les graphiques
- [ ] **Patrick** - Adapter le système de rating pour Body Care une fois Skincare V2 terminé
- [ ] **Michele** - Créer le projet "DB Schemas" et documenter la nouvelle structure proposée
- [ ] **Michele + Diego** - Refactoring des schémas DB d'ici fin de semaine prochaine
- [ ] **Michele** - Vérifier avec le service juridique les obligations liées à la cookie banner
- [ ] **Diego** - Finir le design mobile de la cookie banner (aujourd'hui/demain)
- [ ] **Michele** - Travailler sur le flow Klaviyo (signup newsletter)
- [ ] **Michele** - Lister les bugs filtres/tri et envoyer à Lucas
- [ ] **Lucas / Rémy** - Corriger les bugs du feature filtres/tri (selon dispo)
- [ ] **Diego** - Implémenter le Gift with Purchase (GWP), prêt pour staging le 31/10
- [ ] **Michele + Diego** - Mettre en place les feature flags (prérequis pour GWP le 10/11)
- [ ] **Rémy** - Résoudre les conflicts sur la PR Google Merchant et finaliser
- [ ] **Michele + Diego** - Deploy en production cet après-midi

---

## Notes complémentaires

- Les gros PRs sont identifiés comme un problème (ex. filtres/tri, GWP) : l'équipe veut découper en sous-tâches et merger plus fréquemment
- Pour les feature flags : besoin que l'identification utilisateur en prod soit fiable (distinct ID PostHog lié à l'email) avant de pouvoir cibler des users
- Michele veut planifier une autre réunion en fin de semaine pour présenter les prochaines étapes
