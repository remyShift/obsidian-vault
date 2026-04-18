---
date: 2025-10-17
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
  - Andy
  - Remy
lien: https://www.notion.so/olislab/Tech-Weekly-28f4bf4c7fa181bfbd3fe56cd2ccd3b5
---

# Tech Weekly - 17 octobre 2025

---

## Architecture & processus de développement

### Responsive / breakpoints
- **Problème identifié :** l'approche actuelle est desktop-first, Tailwind est mobile-first. Les deux sont en conflit.
- 70% des utilisateurs viennent du mobile : priorité à donner au mobile dans les designs ET dans le code
- Breakpoints proposés :
  - Mobile : < 640px
  - Tablet : 640px - 1024px
  - Desktop : > 1024px
- Bug connu : à 768px exactement, plusieurs pages cassent (profile page notamment). Problème de borne d'inégalité à corriger.
- Recommandations :
  - Utiliser flexbox et grid en priorité sur `position: absolute/relative` empilés
  - Tester sur les petits mobiles et pas seulement sur grand écran plein
  - Prévoir aussi des tailles intermédiaires "non standard" (browser à 60% de la largeur, etc.)
  - Eviter les event listeners `resize` avec re-render React : préférer l'API native JS
- Michele ouvre une discussion Slack pour aligner l'équipe sur l'approche breakpoints
- Ante doit intégrer le mobile-first dans le process de design (frame intermédiaire en plus du desktop et du mobile)

### Déploiement (Diego)
- 4 workloads : 2 client-side, 2 backend
- **Stage :** déploiement continu automatique sur merge vers `develop`
- **Production :** déclenché par des tags sur un commit spécifique (convention de nommage par date)
- Hotfixes et rollbacks documentés dans le README à la racine du projet
- Objectif : au moins une push en prod par semaine
- Annonce dans le channel technique à chaque déploiement prod
- Chaque dev doit suivre les features qu'il a construites au moment où elles passent en prod

### UI Package & Ladle (Diego)
- Monorepo en place : `web app` + `server` + package `@olislab/ui`
- Package UI partagé entre les applications, utilise Tailwind + CVA pour les variants
- Ladle = Storybook minimaliste, permet de voir et documenter les composants localement (`pnpm ladle`)
- Composants déjà créés : Button (default, outline, link), Toggle Switch
- Usage : `import { Button } from '@olislab/ui'`
- **Pas encore prêt** : manque les types partagés (ex. `Product` type) pour que les composants puissent référencer les vraies interfaces
- Délai estimé : ~1 semaine pour finaliser
- Décision : Rémy peut commencer la refacto du Add-to-Bag flow localement en anticipant que les composants iront dans le UI package, sans aller jusqu'au bout tant que le package n'est pas prêt

---

## Documentation des composants

### Notion (Lucas)
- Lucas documente les composants existants dans Notion : props, tailles, où c'est utilisé, lien Figma
- Beaucoup de composants listés, documentation en cours (pas encore complète)

### Figma (Ante)
- Objectif : 1 page Figma par composant avec toutes les variantes
- Michele veut qu'on aligne les composants entre Figma et le code pour éviter les incohérences (ex. tailles de carousel différentes selon les pages)

---

## Projet scientifique (Patrick)

- 10 règles en place, chaque règle score la liste d'ingrédients d'un produit
- Les scores sont calculés par règle, avec visualisation des ingrédients contributeurs
- **Problème actuel :** quand un ingrédient est modifié (ex. reclassification actif/excipient), il faut recalculer le score de tous les produits qui le contiennent
- Patrick a créé un script ciblé : passe un `coding_id`, re-score uniquement les produits concernés (fonctionne et testé)
- Prochaine étape : exposer ces scripts en tâches Heroku pour éviter de les lancer depuis le terminal en local
- Objectif long terme : interface pour déclencher le re-scoring depuis l'app (sélection d'un ingrédient → rematch de tous les produits qui le contiennent)
- Michele veut restructurer la base de données pour utiliser des **relations** entre collections au lieu de champs dupliqués
  - Créer des collections séparées pour le projet scientifique (`scientific_products`, `scientific_ingredients`)
  - Relier les produits e-commerce aux ingrédients via `ObjectId` au lieu de stocker des strings en dur
- À terme : le projet scientifique doit pouvoir rater ~9 000 produits scrapés, pas seulement les produits du shop

---

## E-commerce

### Add-to-Bag flow (Rémy)
- **Fix livré :** suppression du double modal (mini-modal de confirmation + cart). Maintenant un seul cart s'affiche directement.
- Reste à faire : nettoyer le mélange entre l'ancien modal et le nouveau composant cart
- **Problème de flickering :** à chaque `add_to_bag`, on re-fetch le stock, ce qui crée un effet de clignotement
  - Solution discutée : mettre en cache le stock côté client après le premier fetch, ne re-vérifier qu'au checkout
  - Désactiver les boutons +/- pendant le chargement pour éviter les clics multiples qui se battent
  - Ajouter un spinner sur le bouton + un léger délai artificiel (0.5s) pour que l'UX soit perçue comme fluide
  - Implémenter avec `useQuery` pour ne jamais passer par un état `undefined` (pas de flickering)

### Gestion du stock
- Actuellement : pas de concept de "hold" de stock, tout le monde peut ajouter le même article en simultané
- En production, Michele a ajouté une marge de sécurité (stock réel - 1) pour éviter la rupture, mais c'est un contournement
- Proposition discutée : lors du premier `add_to_bag`, réserver temporairement 2 unités supplémentaires avec un token en cache/cookie + fenêtre de temps (2 min). Si non utilisées, on release.
- Consensus : ne pas over-engineer maintenant. Priorité = cacher le stock localement + re-vérifier au checkout. Reste à creuser (BigBlue a probablement de la doc sur ce sujet).
- Feature future envisagée : afficher "plus que 3 en stock" pour créer un sentiment d'urgence

### Google Merchant
- Intégration existante mais peu appelée en production (presque aucun appel constaté sur le dernier mois)
- L'update Google Merchant devrait se déclencher :
  - Création ou édition d'un produit
  - Passage en rupture de stock (via BigBlue)
  - À la fin d'une commande (déjà partiellement en place)
- Michele ne veut pas que Google Merchant soit couplé au serveur web principal : à découpler dans un service ou Lambda à part
- Architecture discutée : pattern Adapter par merchant (Google, Meta, etc.) + appels parallèles asynchrones
- Sujet à approfondir dans une prochaine session

---

## Actions

- [ ] **Michele** - Ouvrir discussion Slack sur l'approche breakpoints (mobile-first Tailwind)
- [ ] **Ante** - Adopter le mobile-first dans les designs, ajouter un frame intermédiaire
- [ ] **Diego** - Finaliser le UI package (types partagés, composants) dans la semaine
- [ ] **Lucas** - Continuer la documentation des composants Notion + compléter les liens Figma
- [ ] **Ante** - Créer 1 page Figma par composant avec toutes les variantes
- [ ] **Patrick** - Améliorer les scripts de re-scoring (plus ciblés, moins de rechargement global)
- [ ] **Michele** - Mettre en place les tâches Heroku pour les scripts de Patrick
- [ ] **Michele** - Restructurer les schémas de base de données (relations ingrédients/produits)
- [ ] **Rémy** - Finaliser le nettoyage du Add-to-Bag flow + implémenter le caching stock avec useQuery
- [ ] **Rémy** - Travailler sur l'intégration Klaviyo (signup) + réfléchir à l'architecture events (GA, PostHog, etc.)
- [x] **Rémy** - Corriger le texte "free delivery" dans la barre de progression du cart
- [ ] **Michele** - Montrer à Ante comment tester une feature branch avec le nouveau setup (pnpm)

---

## Notes complémentaires

- Le bag lui-même a un bug : appuyer plusieurs fois vite sur +/- peut faire revenir à une valeur antérieure. À investiguer.
- À chaque déploiement prod : Diego ou Michele annonce dans le channel technique, les devs concernés doivent être dispo pour surveiller leurs features
- Ante peut maintenant checkout des branches, lancer le projet et tester (Diego doit lui montrer le nouveau setup avec pnpm)
