# Tech Weekly - 26 janvier 2026

**Participants :** Michele, Diego, Lucas, Rémy, Patrick
**Lien Notion :** https://www.notion.so/olislab/Tech-Weekly-2f44bf4c7fa180ef89dad53508715174

---

## Migration catégories et sous-catégories

### Problème
- Les produits et bundles contiennent encore les anciens labels de catégories/sous-catégories
- Risque : si on met à jour une image ou un contenu via l'automation Notion, l'automation écrase les catégories avec des traductions incorrectes

### Situation actuelle
- Les traductions actuelles ont été corrigées manuellement la semaine dernière (suite à l'appel avec Louis)
- La liste de nouveaux labels fournie par Cindy et Louis n'est PAS encore implémentée : Rémy préfère attendre la nouvelle structure de collections pour le faire en un seul endroit et limiter les risques d'erreur

### Plan de migration (en 3 étapes)
1. **Peupler les nouvelles collections** `categories` et `subcategories` dans MongoDB
   - Rémy a un script avec un objet "hierarchy" qui évite les doublons et gère les traductions proprement
   - Chaque produit sera lié à une sous-catégorie, la catégorie est déduite de la sous-catégorie
2. **Validation par l'équipe produit**
   - Exporter depuis MongoDB un CSV avec : SKU, titre produit, catégorie EN, catégorie FR, sous-catégorie EN, sous-catégorie FR
   - Passer le CSV en revue avec Cindy, Louis et Suze
3. **Mettre à jour tous les endroits qui lisent les catégories**
   - Pages produit, recherche, filtres du menu, bundles
   - La navbar/menu sera le cas d'usage réel pour tester la lecture des nouvelles collections

### Gestion de la période de transition
- MongoDB gère les changements de schéma session par session : les 25 utilisateurs connectés au moment du deploy ne verront aucune disruption
- Stratégie : peupler la base d'abord, déployer la nouvelle logique de lecture ensuite. Zéro downtime.
- L'automation Notion continuera d'écrire dans les anciens champs, mais on lira uniquement les nouveaux. Pas de conflit tant qu'on n'ajoute pas de nouvelles catégories.
- Si une nouvelle catégorie doit être ajoutée pendant la transition : l'ajouter directement dans la nouvelle collection (plus simple que de passer par Notion + automation + traduction)

### Bundles
- Bug identifié : l'automation bundles utilisait des types différents de ceux des produits pour les catégories/sous-catégories côté Notion
- Solution décidée : calculer les catégories d'un bundle à partir des produits qu'il contient (unique sur les sous-catégories des produits du bundle), puis les stocker en les recalculant à chaque création/update
- Bundles traités en phase 2, après les produits
- Statut actuel : traductions bundles correctes en Notion (fix manuel la semaine dernière)

### Automation Notion / CMS
- Idée discutée : ajouter un flag "update images only" ou "update content without translation" dans Make pour éviter le retraitement inutile des traductions à chaque update d'image
- Décision : pas d'investissement supplémentaire sur l'automation Notion si le projet CMS démarre bientôt. À réévaluer selon la décision sur le CMS cette semaine.

---

## Navbar et menu

- Lucas a commencé la partie UI
- Rémy prend le relais pour la logique et l'intégration, y compris la recherche
- Ce projet servira de vrai cas d'usage pour lire les catégories/sous-catégories depuis les nouvelles collections
- Rémy reste focus sur le chantier catégories/sous-catégories encore une semaine avant de basculer sur la navbar

---

## Checkout et feature flags (Diego)

- Diego travaille sur les corrections du checkout et des feature flags
- Question ouverte : les questions du quiz sont-elles sous feature flag ?
  - Si non, les utilisateurs ne verront pas le survey PostHog lié au feature flag
  - Patrick doit vérifier. Si besoin : wrapper toutes les questions du quiz sous le même feature flag
- Feature flag sur la page collection : confirmé en place
- Michele veut ajouter un quick survey PostHog sur le flux quiz pour collecter du feedback, lié au feature flag

---

## Projet scientifique : fin des scripts manuels (Patrick)

### Problème
- Cindy fait des modifications dans staging (ajout/suppression de fonctions sur des produits) qui impactent le scoring
- Patrick doit relancer des scripts manuellement à chaque fois pour recalculer

### Solution proposée
- Créer des endpoints dans l'app scientifique pour déclencher le scoring depuis une interface, sans script
- Interface possible : Retool ou AppSmith connecté à MongoDB, avec des boutons qui appellent les endpoints
- Fonctionnalités cibles :
  - Lancer le scoring en batch
  - Sélectionner un ingrédient et rescorer tous les produits qui le contiennent
  - CRUD propre pour éditer les ingrédients et leurs fonctions

### Nouvelle règle : aucun script en production
- **Règle officielle :** aucun script ne doit être lancé en production sans approbation explicite de Michele ou communication dans le channel tech
- Si un script doit absolument être lancé : le committer dans un dossier `/scripts` du repo concerné (web app ou scientific) pour avoir un historique de ce qui a été lancé, par qui, et quelle version
- L'idée de sauvegarder l'état pré-script pour rollback a été rejetée : trop lourd à maintenir, la DB va grossir

---

## Inconsistances Notion vs base de données (actifs)

### Constat
- Après le script de la semaine dernière (introduction du statut "published" sur les collections), Michele a découvert des écarts significatifs entre Notion et la DB
- Exemple : actifs = ~170 entrées dans Notion, ~130 en base. 40 de différence.
- Cause probable : des items ont été ajoutés à Notion mais l'automation ne les a jamais envoyés en base

### Risque actuel
- Si un item est édité dans Notion, il repasse en statut "offline" par défaut (le champ est offline par défaut dans Notion)
- Pour les actifs, le risque est limité car ils ne sont pas encore fortement utilisés côté web. Pour les produits, une seule différence serait critique.

### Décision
- Ne pas construire une intégration Make/Notion complexe maintenant si la migration CMS est à quelques semaines
- Rémy et Michele exportent les deux listes (Notion + DB) et les comparent pour identifier les entrées manquantes
- Cindy sera consultée sur les actifs manquants
- Sujet à reprendre lors de la migration CMS

### Besoin long terme identifié
- Même après le CMS, il faudra un mécanisme de **bulk update / bulk reset** : Suze travaille régulièrement sur des exports CSV pour analyser les produits et voudra repousser les changements en base
- Pas résolu maintenant, mais à anticiper dans la conception du CMS

---

## Feature "Recommended For Me" (Patrick)

### Loading screen
- Patrick a ajouté un état de chargement dans le bouton de soumission du formulaire
- Problème de wording : "saving results" peut être confus car les utilisateurs non connectés voient aussi "save my analysis"
- **Solution décidée :** utiliser "Submitting the form" suivi de "Computing your products" / "Finding products" à l'ouverture de la page de recommandations

### Bugs identifiés
- Certains produits ne remontent pas dans les recommandations pour des raisons inconnues
- Michele va créer des tickets séparés pour chaque problème identifié

### Scripts Python (Diego)
- Diego peut écrire des scripts Python pour calculer les scores en ~1 heure
- Seuil d'âge actuel : 25 ans (un seul seuil)

---

## Actions

- [ ] **Rémy** - PR pour ajouter des checks sur les endpoints produit et bundle (ne pas retraduire si traduction déjà existante)
- [ ] **Rémy** - Peupler les nouvelles collections `categories` et `subcategories` dans MongoDB
- [ ] **Rémy** - Créer le CSV d'export (SKU, titre, catégorie EN/FR, sous-catégorie EN/FR) pour validation par Cindy/Louis/Suze
- [ ] **Rémy** - Mettre à jour tous les endroits qui lisent catégories/sous-catégories (search, menu, filtres, bundles)
- [ ] **Rémy** - Continuer la navbar/menu encore une semaine (intégration logique + search)
- [ ] **Rémy + Michele** - Exporter et comparer les listes Notion vs DB pour les actifs, identifier les écarts
- [ ] **Diego** - Finaliser les corrections checkout et feature flags, notifier l'équipe quand prêt pour les tests
- [ ] **Diego** - Créer les scripts Python pour les calculs produits (seuil d'âge : 25 ans)
- [ ] **Patrick** - Vérifier si les questions du quiz sont sous feature flag, wrapper si besoin
- [ ] **Patrick** - Développer les endpoints pour le scoring scientifique (batch scoring, rescore par ingrédient)
- [ ] **Patrick** - Finaliser le loading screen avec le wording "Submitting the form" / "Computing your products"
- [ ] **Michele** - Appel demain sur les mises à jour de pages
- [ ] **Michele** - Créer des tickets séparés pour les problèmes de recommandations identifiés
- [ ] **Toute l'équipe** - Reviewer le flow de recommandation de produits sur staging
- [ ] **Cindy** - Être consultée sur les écarts d'actifs entre Notion et la DB

---

## Notes complémentaires

- La question d'un **bulk update/reset** de la base de données sera un besoin récurrent, avec ou sans CMS : à anticiper dans la conception
- L'automation Notion et la DB sont désynchronisées sur plusieurs collections (actifs confirmés, autres à vérifier). Le CMS doit résoudre ce problème structurellement.
- Règle de prod rappelée : tout script lancé en production doit être approuvé par Michele et committé dans le repo
