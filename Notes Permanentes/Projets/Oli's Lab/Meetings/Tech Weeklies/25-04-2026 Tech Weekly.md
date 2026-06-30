---
date: 2026-04-25
type: meeting
projet: "Oli's Lab"
tags:
  - tech-weekly
  - olis-lab
participants:
  - Michele
  - Kyle
  - Patrick
  - Lucas
  - Remy
lien: https://www.notion.so/olislab/Tech-Weekly-32c4bf4c7fa1806eab9dd46768c54ed1?pvs=189#32c4bf4c7fa1803e8990f19166f597fb
---

## Tech Weekly - 25 avril 2026

---

### Dashboard & gestion des tâches

- Michele a mis à jour la vue dashboard : progression des projets, workload par développeur, PRs à review groupées par priorité
- Vue "drill-down" disponible depuis le dashboard pour voir les tâches d'un projet spécifique
- **Bonne pratique rappelée :** ajouter une due date quand on commence à travailler sur une tâche, pas forcément à la création

---

### Event Tracking & Analytics

#### Statut critique

- Le tracking des événements du core user journey (view item, add to bag, checkout, purchase) doit fonctionner correctement sur **PostHog, Google Analytics et Meta** simultanément
- Raison : les campagnes Meta et GA ont besoin de leurs données propres pour monitorer les dépenses. PostHog seul ne suffit pas.
- **Deadline : fin avril** — le core user journey migre vers Next.js, le tracking doit être en place avant

#### Apple Pay - bug tracking

- Toujours pas résolu : le GA session ID et le client ID (stockés en cookies) ne sont pas correctement passés au serveur lors d'un paiement Apple Pay
- Deux approches testées (direct analytics + service-based tag passing) : les deux bloquées
- Hypothèse : l'utilisation des cookies pour passer ces IDs du client au serveur est peut-être la vraie source du problème
- Michele et Kyle doivent se retrouver pour avancer sur le fix
- Pour tester Apple Pay : nécessite de déployer la branche sur stage à chaque changement. Contournement possible via GitHub Actions + squash final des commits

#### Checkout v2

- Bloqué tant que les analytics events ne passent pas correctement

#### Plan pour les events

- Michele va auditer tous les events cette semaine et vérifier qu'ils passent bien sur Meta et GA, et que stage/prod ne se chevauchent pas (fix déjà fait côté GA, pas encore côté Meta)
- Approche hybride envisagée pour le purchase event : logique v2 sur l'API Next.js, méthode actuelle conservée sur le legacy jusqu'à la transition complète
- À terme : un service centralisé côté back-end qui dispatche les events vers tous les providers (GA, Meta, Klaviyo…)

#### Action items

- [ ] @Michele : auditer les gaps d'event tracking (bag, checkout, purchase) sur GA et Meta
- [ ] @Michele : se retrouver avec @Kyle sur le fix Apple Pay
- [ ] @Michele : vérifier que les events stage et prod ne se chevauchent pas sur Meta

---

### Migration CMS vers Payload

#### Statut

- Plusieurs PRs en attente de merge : brands collection, bridge script, products collection, schema associé
- @Remy : refactoring du seed script fait, retrait du champ images en attente de clarification sur la media collection

#### Dépendances Next.js

- La migration de la **product display page** vers Next.js (prochaine grosse feature) dépend directement du merge des PRs products et media management
- @Kyle a rappelé l'importance de prioriser ces PRs en conséquence

#### Priorisation des PRs CMS

- @Remy doit trier les PRs CMS par ordre de dépendance dans Notion et ajouter les priorités (brands → bridge brands → products → bridge products)

#### Bridge script

- Actuellement custom pour brands et products
- Discussion sur une abstraction possible : une infrastructure de base commune + mapping custom par collection
- Idée : si pas besoin de mapping, on prend les clés/valeurs telles quelles ; si mapping nécessaire, on le passe en paramètre
- **Cas particulier : categories et subcategories** — structure très atypique dans le legacy (subcategories hardcodées, pas de collection dédiée) → nécessitera un mapping très custom, voire un script séparé
- Objectif final : chaque collection Payload doit pouvoir mettre à jour MongoDB en sens inverse, de manière fiable et sans ambiguïté

#### Media management

- Toujours bloquée sur la définition des tailles d'images
- Pensée résolue mais à re-confirmer → réunion à planifier (@Remy + @Michele + @Diego)

#### Tests CMS

- Tâche créée pour explorer les tests d'intégration Payload : admin UI, hooks (URL building, validation slug, unicité des subcategories)
- Payload fournit des tests par défaut dans son setup de base

#### Action items

- [ ] @Remy : trier les PRs CMS par ordre de dépendance et ajouter les priorités
- [ ] @Remy, @Michele, @Diego : réunion pour définir les tailles d'images (media collection)

---

### Refactoring Product Recommendation

- 2 PRs en review : séparation de l'enum skin type, page dédiée pour le flow de formulaire (suggestion de Diego)
- Reste à faire :
  - Automatiser les skin concerns dans le formulaire (actuellement hardcodés)
  - Corrections de wording front-end (à valider avec Antje)

#### Action items

- [ ] @Patrick : automatiser les skin concerns dans le formulaire de recommandation

---

### Scoring Ingredient List (nouvelle feature)

- Feature : l'utilisateur colle une liste INCI et reçoit un score
- Découpée en petites PRs : matching back-end (en review), matching front-end (à faire), scoring logic (à faire)
- Stratégie : créer des PRs depuis des PRs pour ne pas attendre les approvals, mais merger dans l'ordre
- **Deadline cible : mercredi prochain** (Diego absent cette semaine)
- @Patrick à ajouter comme reviewer sur la PR optimization frontend

#### Action items

- [ ] @Patrick : PR matching front-end + scoring logic (INCI score)
- [ ] @Patrick : ajouter @Kyle et @Michele comme reviewers sur la PR optimization frontend

---

### Performance & Optimisation

- @Lucas : audit terminé sur les requêtes de la page "Shop All" — document de performance créé
- @Lucas : nettoyage des assets publics terminé :
  - Images identifiées en cours d'utilisation
  - Images inutilisées retirées du `/public` sans erreur de build
  - Plan : uploader les images (brands, activities, pages) vers S3, ne conserver dans le repo que les SVGs (icons, nombres, custom fonts)
- Tâche SEO créée : batch update des meta titles et descriptions des articles

#### Action items

- [ ] @Lucas : finir le setup Linter sur le projet Next.js (UI components)
- [ ] @Lucas : fix du blur du bouton "Shop Oil" sur Safari + lier la PR à la tâche

---

### Rétrospective

- @Kyle doit planifier une rétrospective vers la fin de la semaine via un template FigJam

#### Action items

- [ ] @Kyle : planifier la rétrospective de fin de semaine (FigJam)
