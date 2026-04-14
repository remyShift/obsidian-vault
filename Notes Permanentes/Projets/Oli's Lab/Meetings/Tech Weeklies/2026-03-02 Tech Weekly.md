---
date: 2026-03-02
type: meeting
projet: Oli's Lab
tags:
  - tech-weekly
  - olis-lab
participants:
  - Michele
  - Diego
  - Kyle
  - Patrick
  - Lucas
  - Ante
  - Remy
notion: https://www.notion.so/olislab/Tech-Weekly-3174bf4c7fa180e6b8f4f4828f606bf8
---

# Tech Weekly - 2 mars 2026

---

## Organisation de l'équipe

### Split de focus : Next.js vs Create React App
- L'équipe se divise officiellement en deux axes de travail :
  - **Next.js (migration)** : Diego, Kyle, Rémy
  - **Create React App (maintenance, bugs, améliorations)** : Patrick, Lucas
- Patrick reste aussi sur le projet scientifique et touche la CRA pour la feature recommendation
- Kyle est **owner** du projet "Next.js Foundation"

### Notion / Process
- Michele réorganise Notion (suite à la discussion de la semaine dernière avec Kyle et Diego), pas encore terminé
- Règle PR : mettre l'ID de la tâche Notion dans le titre de la PR pour que l'automation fonctionne. Un lien direct dans la PR n'est pas possible sans être membre payant.
- Pour les cas limites : commenter avec le lien dans la PR, Michele peut ajouter manuellement.
- Kyle : onboarding considéré comme terminé.

---

## Milestones Next.js

### SEO Controls & CRUD (priorité 2 semaines)
- Objectif : pouvoir éditer meta title, meta description et autres propriétés SEO pour produits, bundles, articles, actives, brand pages
- **Deux approches en parallèle :**
  - Option 1 (prioritaire) : tout amener dans Payload CMS, qui sert à la fois Next.js et la CRA
  - Option 2 (fallback) : si Payload prend trop de temps, lire depuis MongoDB et mettre à jour les schémas backend directement
- Produits déjà couverts. Bundles à vérifier. Articles, actives, brand pages : pas encore supportés.
- Estimation : 2 jours pour étendre les schémas avant de commencer le travail SEO
- Diego briefe Patrick sur ce projet (handoff du Front-end Performance Optimization & SEO project)
- **Point de décision Make/Payload : 16 mars.** Si Payload avance bien, Make est phased out. Sinon on maintient Notion comme point d'entrée avec Make.
- D'ici là : Notion reste utilisable pour les mises à jour, avec corrections manuelles si les traductions sont écrasées (Michele prend en charge)

### Next.js Foundation (Kyle owner)
- Objectif : identifier les dépendances core à refactoriser pour Next.js, pas encore de flows visibles en prod
- Composants core doivent devenir **stateless** pour le server-side rendering
- Dépendance clé identifiée : le cart endpoint + stockage du cart en DB (au lieu du local storage uniquement)
  - Problème actuel : certains users ont le cart en DB, d'autres en local storage, avec des schémas potentiellement différents
  - Risque : flush de cart ou vérification de disponibilité complexe
- **Tests :** inclus dans la foundation, mais focalisés sur les flows critiques (pas de tests triviaux genre "le header render"). Approche end-to-end sur le checkout principalement. Kyle et Diego avaient déjà aligné sur ça.

### Milestones suivants Next.js
- **Première/deuxième semaine d'avril :** Product Display Page sur Next.js
  - Design v1.5 doit être prêt pour dev le **20 mars** (Ante)
  - Focus UI, surtout mobile. Pas de nouveaux champs majeurs.
- **Après PDP :** toutes les pages liste produits (product card grids)
  - C'est la dépendance principale pour couvrir tout le flow shop
- **Ensuite :** homepage + shop page (pas encore listées dans les milestones, Michele va structurer ça cette semaine)
- **Objectif fin avril :** le core flow (voir un produit, add to cart, checkout) vit entièrement sur Next.js avec bon SEO et SSR

---

## Checkout

### Statut
- Quasi prêt pour release du MVP cette semaine
- **Blockers pour la release guest checkout :**
  1. **Pickup points selection + MapBox rendering** : réassigné à Rémy (Diego switch sur déploiement en échange). Diego brief Rémy en 10 min après le meeting.
  2. **Analytics** : Kyle en cours, ~3 jours. Michele ne veut pas sortir sans analytics. Pas de release avant.
  3. **BigBlue availability check API route** : haute priorité, quelques heures. Problème actuel : 10 appels séparés à BigBlue pour 10 items dans le cart. À consolider en une seule route backend. Diego prend ça.
  4. **Déploiement** : Diego gère. Amplify pose des problèmes (memory outage au build). Diego va essayer une autre approche. Michele reçoit des messages AWS à ce sujet, à vérifier.
- Full page loaders : UI, quick, non bloquant pour MVP.
- Map design tokens : Michele doit les ajouter au compte Oli's Lab (Ante a les designs). Non bloquant pour MVP, priorité basse.

---

## CMS (Payload)

- Catégories et sous-catégories shop migrées dans le CMS, déployées sur Lightsail (phase exploratoire)
- Prochaine étape : déploiement production avec stage lisant depuis live + fallback Lightsail
- SEO dans Payload : feature à explorer (tab SEO dans la doc, gestion par locale)
- Rémy doit ajouter les tâches déploiement et SEO dans le projet CMS
- Notion reste point d'entrée pendant la transition

---

## Event Tracking / Purchase Event

- Problème : on veut tracker le `logistic_order_id` côté analytics et PostHog pour un meilleur suivi des transactions
- Avant : l'event était capturé au moment du redirect de la success page (juste après confirmation paiement), donc le `logistic_order_id` était disponible
- Maintenant (post refacto Rémy) : l'event est capturé au moment du clic, donc on a l'order ID interne mais pas le `logistic_order_id`. Et on perd les informations sur les items du cart.
- **Trade-off identifié :** soit on a le `logistic_order_id`, soit on a les items du cart. Pas les deux dans le contexte actuel.
- Question ouverte : faut-il tracker les events transactionnels côté backend plutôt que frontend ? Les events transactionnels doivent refléter la vérité (une commande confirmée mais pas finalisée ne doit pas apparaître comme une vente).
- **Call demain** : Diego, Rémy, Kyle pour décider de l'approche. Kyle supervisera ce projet.

---

## Autres projets

### Publishing status sur les collections
- Terminé et hookup : si un article passe offline, il est offline. Michele confirme.

### QA Product Recommendation (Patrick)
- Patrick a vérifié tous les tickets. Quasi tout est fait.
- Patrick doit faire un dernier passage : déplacer les tickets terminés ou non pertinents, ne laisser que ce qui est actif.
- Michele et Patrick font une session QA produit (pas revue de code) après le meeting.

### QA Search (Lucas)
- Tickets ouverts, Ante en a ajouté. Lucas va regarder aujourd'hui.
- Lucas doit ajouter des acceptance criteria et un plan rough dans les tâches.

### Skin type translations (Rémy)
- Seuls les icônes manquent. Rémy avait oublié, peut le faire demain.

### Scientific tasks (Patrick)
- Chaque semaine / chaque vendredi : avancer le projet sur la semaine courante dans Notion.

---

## Actions

- [ ] **Michele** - Finir la réorganisation Notion (suite discussion Kyle + Diego)
- [ ] **Michele** - Finir la mise en place de tous les outils (paiement, etc.)
- [ ] **Michele** - Ajouter le lien milestone + éditer platform roadmap après le meeting
- [ ] **Michele** - Valider le design PDP par le 20 mars avec Ante
- [ ] **Michele** - Ajouter les design tokens Map au compte Oli's Lab
- [ ] **Michele** - Vérifier les messages AWS sur l'activation Amplify
- [ ] **Diego** - Essayer une autre approche pour le déploiement Amplify
- [ ] **Diego** - Handoff à Patrick sur le projet Front-end Performance Optimization & SEO
- [ ] **Diego** - Créer la route API backend pour le BigBlue availability check (haute priorité, quelques heures)
- [ ] **Diego** - Gérer le déploiement checkout
- [ ] **Rémy** - Compléter pickup points selection + MapBox rendering pour le checkout
- [ ] **Rémy** - Ajouter tâches déploiement et SEO dans le projet CMS
- [ ] **Rémy** - Finir les icônes skin type translations demain
- [ ] **Kyle** - Gérer les analytics pour le guest checkout (~3 jours)
- [ ] **Kyle** - Superviser le projet event tracking / purchase event
- [ ] **Patrick** - Passer en revue et nettoyer le projet QA product recommendation
- [ ] **Patrick** - Avancer le projet scientific tasks sur la semaine courante
- [ ] **Lucas** - Ajouter acceptance criteria + plan rough sur les tâches QA search
- [ ] **Diego + Rémy** - Pair 10 min sur les relay points après le meeting
- [ ] **Michele + Patrick** - Session QA product recommendation après le meeting
- [ ] **Diego + Rémy + Kyle** - Call demain sur event tracking et implémentation purchase event

---

## Notes complémentaires

- Kyle est officiellement intégré à l'équipe (onboarding terminé). Il prend ownership du projet Next.js Foundation.
- Le split CRA / Next.js est un vrai changement d'organisation : à partir de maintenant, Rémy est principalement sur Next.js, pas sur la CRA.
- Point de décision clé le **16 mars** : Make/Notion ou Payload pour le contenu. En fonction de l'avancement de Payload.
