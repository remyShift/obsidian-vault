---
date: 2026-03-09
type: meeting
projet: Oli's Lab
tags: [tech-weekly, olis-lab]
---

# Tech Weekly - 9 mars 2026

**Participants :** Michele, Diego, Kyle, Rémy, Patrick, Lucas, Ante
**Lien Notion :** https://www.notion.so/olislab/Tech-Weekly-31e4bf4c7fa1806cb934e03b1b8f9816

---

## Nouveaux templates Notion (projets & tâches)

Michele, Diego et Kyle ont introduit des templates mis à jour pour les projets et les tâches dans Notion.

### Template Projet
- Définition du problème et vue d'ensemble du projet
- Goals et critères de succès (définition of done)
- **Out of scope explicite** : important pour que les reviewers de PR aient le contexte
- Stratégie et approche : décisions d'architecture, notes
- Équipe : PM, lead, engineers
- Tâches liées + notes de kickoff

### Template Tâche
- Contexte de la tâche + acceptance criteria mesurables
- **Estimation de taille** : extra small, small, medium, big, pour prioriser
- Évaluation du risque et de l'impact
- Notes d'implémentation et dépendances
- Possibilité de splitter en sous-items si la tâche est grande

### Objectif global
- Plus de visibilité sur ce qui est fait et ce qui est attendu
- Permettre de reviewer des PRs avec du contexte (Notion lié à Figma, Slack, PostHog)
- Capter les décisions d'architecture pour qu'elles restent accessibles dans le temps
- Diego et Kyle disponibles pour des walkthroughs et sessions de pairing pour aider l'équipe à adopter les templates

### Roadmap & milestones
- Notion reste l'outil de gestion de projets, avec des vues supplémentaires à venir (PRs ouvertes, repriorisation)
- OKRs par quarter au-dessus des milestones pour focaliser sur des outcomes, pas des features
- **Objectif principal d'ici fin avril :** migration Next.js du core user journey (voir un produit, add to cart, checkout) avec bon SEO, SSR, réduction du loading time et des bugs

---

## Priorité urgente : Remises Brain Ray

### Contexte
- Brain Ray rebrand : tous les produits de la marque doivent passer à -30%
- Décision prise le jour même, non planifiée

### Design (Ante)
- Page produit : ancien prix barré + nouveau prix réduit + tag de remise
- Product card : même logique (tag remise, ancien prix barré, nouveau prix)
- Cart / checkout : afficher le vrai prix avec l'ancien prix et la remise visible

### Approche technique
- Option A : mettre à jour les prix directement en DB
- Option B : créer une collection externe `sales_offers` ciblant la marque, appliquée sur tous les endpoints qui lisent les produits
- Michele penche pour Option B (plus flexible pour le futur)
- Implémentation en **quick hack dans la CRA**, migration vers Next.js plus tard
- **Pas d'intégration dans le CMS** pour l'instant : attendre d'avoir une stratégie claire pour la gestion des offres à l'échelle du site
- Estimation : **1 journée**, Diego prend ça
- Michele fait les changements de trading plan et met à jour les produits en DB aujourd'hui

---

## Checkout

### Statut
- Quasi terminé, dernier QA pass fait par Diego et Kyle ce matin
- Quelques petits raffinements identifiés, réglés dans la journée
- CI en place (environ 1h pour configurer l'instance de production)
- Feature flags implémentés
- **Objectif : publier aujourd'hui** avec le checkout anonyme (guest checkout)
- Les updates pour les utilisateurs connectés peuvent être pausées cette semaine pour laisser la priorité aux bugs cart et aux remises Brain Ray

---

## Bugs cart / état de navigation

### Problèmes constatés
- Après un achat, les items restent visibles dans le cart même si la commande est passée
- Le cart affiche des items qui ne sont plus dans le local storage
- Refresh = cart vide
- Ajouter un nouveau produit = cart mis à jour avec seulement le nouveau produit (les anciens disparus)
- Problème lié à la gestion d'état dans la navbar

### Plan d'investigation
- Kyle lead l'investigation avec Rémy et Lucas
- Tester plusieurs scénarios : achat avec items dans le cart, redirect success page, user anonyme vs connecté
- Hypothèse : le cart est stocké dans un état supplémentaire qui se désynchronise
- Estimation de correction : **jusqu'à 2 jours au pire**

---

## CMS (Payload)

### Statut
- Rémy a un script fonctionnel pour importer les données depuis MongoDB vers le CMS (produits et marques)
- PRs ouvertes mais pas encore mergées
- PR manquante : hook pour synchroniser les données CMS vers MongoDB (à ouvrir juste après le meeting)
- Le CMS n'est pas encore lu en production en attendant la solution d'hébergement

### Hébergement
- Le CMS tourne encore sur Lightsail, à migrer en dehors en priorité car certaines instances lisent déjà depuis là
- Diego prend ça en priorité cette semaine (avec les remises Brain Ray)

### Images
- Rémy lit les images originales au lieu des versions optimisées depuis Payload
- Payload génère deux versions (originale + optimisée), Rémy doit prendre la bonne depuis la collection media
- Possibilité de lire directement depuis S3 grâce au path fourni par Payload, sans passer par Payload lui-même : nécessite d'activer une distribution supplémentaire

---

## Navbar & performance

### Liens cassés
- Des liens cassés persistent dans la navbar, toujours à corriger

### Performance CRA (collection / lister pages)
- Kyle a signalé que les pages de collection sur la CRA sont très lentes
- Plusieurs requêtes potentiellement responsables, à investiguer
- Beaucoup d'assets dans `/public` qui devraient être sur S3

### Assets S3
- Michele peut uploader manuellement les assets sur S3 en attendant
- Contrainte : les assets doivent être dans le bucket stage ET prod pour fonctionner des deux côtés
- Diego pourra regarder si on peut désactiver le moteur d'images actuel (utilisé uniquement pour les petits cercles / avatars)

### Search navbar
- Lucas a des changements sur la navbar liés à la recherche, prêts pour review par **mercredi**
- Kyle review ça

---

## SEO (Patrick)
- Patrick a terminé la plupart du travail SEO
- D'autres PRs sont prêtes pour review
- Plus qu'une dernière tâche restante

---

## Actions

- [x] **Diego + Kyle** - Dernier QA pass et publication du checkout aujourd'hui
- [ ] **Diego** - Implémenter les remises Brain Ray (estimation 1 jour)
- [ ] **Diego** - Héberger le CMS hors de Lightsail
- [ ] **Kyle** - Investiguer les bugs navbar / état du cart avec Rémy et Lucas
- [ ] **Kyle** - Reviewer les changements navbar/search de Lucas d'ici mercredi
- [ ] **Rémy + Lucas** - Tester les différents scénarios cart/checkout (edge cases)
- [ ] **Rémy** - Ouvrir la PR pour le hook de sync CMS vers MongoDB (après le meeting)
- [ ] **Rémy** - Corriger la lecture des images (optimisées, pas originales)
- [ ] **Michele** - Changer le trading plan et mettre à jour les produits Brain Ray en DB aujourd'hui
- [ ] **Michele** - Ajouter les bugs navbar dans Notion + créer les vues de management
- [ ] **Michele** - Uploader les assets du dossier `/public` vers S3
- [ ] **Patrick** - Continuer le SEO (autres PRs prêtes pour review)
- [ ] **Toute l'équipe** - QA passes complets sur toutes les branches avant la production

---

## Notes complémentaires

- Le checkout anonyme part en prod aujourd'hui si le polish est validé
- Code quality reminder : plus de bugs couverts pendant le développement, QA non-négociable sur les branches et staging avant chaque prod
- Michele crée une vue Notion des PRs ouvertes pour faciliter la repriorisation, potentiellement une courte session de synchro demain pour valider
