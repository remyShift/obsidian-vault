---
date: 2026-04-14
type: note
projet: Oli's Lab
tags:
  - olis-lab
---

# Oli's Lab - Introduction

Oli's Lab est une plateforme e-commerce de **cosmétiques clean et scientifiques**, fondée par Olivia de Rothschild. La mission n'est pas d'être un e-commerce de plus : c'est d'être un agrégateur de cosmétiques basé sur la science, qui aide les utilisateurs à trouver ce qui est vraiment adapté à leur peau.

La différenciation centrale d'Oli's Lab, c'est la **dimension scientifique** : chaque produit est évalué selon des règles basées sur les ingrédients, et à terme, les recommandations sont personnalisées selon le profil cutané de l'utilisateur. Tout ce qui est e-commerce standard (filtres, tri, checkout) est un prérequis, pas la finalité.

---

## Équipe

| Personne    | Rôle                                                                       |
| ----------- | -------------------------------------------------------------------------- |
| **Michele** | CTO / PM, lead produit, arbitre final des décisions                        |
| **Diego**   | Tech Lead, Senior dev, architecture, code reviews, backend, infrastructure |
| **Kyle**    | Senior dev (arrivé mars 2026), owner migration Next.js Foundation          |
| **Rémy**    | Dev fullstack, CMS Payload, checkout, analytics                            |
| **Lucas**   | Dev frontend, composants UI, maintenance CRA                               |
| **Patrick** | Dev backend/scientifique, rating system, product recommendation            |
| **Ante**    | Designer, Figma, design system                                             |

---

## Stack technique

### Actuel (CRA / legacy)
- **Frontend :** Create React App (React), Jotai (state), React Query (server state)
- **Backend :** Node.js / Express, AWS Lambda (serverless)
- **Base de données :** MongoDB (via Mongoose)
- **CMS :** Notion + Make (automation) → en cours de migration vers Payload
- **Livraison :** BigBlue (logistique), Mondial Relay (points relais)
- **CRM / email :** Klaviyo
- **Analytics :** PostHog, Google Analytics, Meta Analytics
- **Infrastructure :** AWS (Lambda, S3, CloudFront, Amplify)

### Cible (migration en cours)
- **Frontend :** Next.js (App Router, SSR)
- **Backend :** API v2 (Node.js, architecture fonctionnelle, TypeScript)
- **CMS :** Payload CMS (self-hosted, code-first, S3 pour les médias)
- **Tests :** end-to-end sur les flows critiques (checkout)

---

## Philosophy produit

> Les features scientifiques priment sur les features e-commerce standard.

Oli's Lab ne veut pas copier Sephora. La valeur ajoutée est dans la science : rating des produits par ingrédients, recommandations personnalisées selon le profil peau, futur scanner de produits par IA. Toute décision technique doit être lue à travers ce prisme.

Conséquence concrète : quand il faut choisir entre finir une feature e-commerce standard et avancer sur le rating system ou la recommendation, la priorité va au scientifique.

---

## Architecture de la base de données

MongoDB avec deux namespaces logiques dans la même DB :

- **Collections e-commerce / shop** : `shop_products`, `brands`, `categories`, `subcategories`, `bundles`, `orders`, etc.
- **Collections scientifiques** : `matches`, `scores`, `scientific_ingredients`, etc.
- **Collections partagées** : `actives`, `concerns`, `ingredients`

### Règles importantes
- Ne jamais écraser un champ géré par l'automation Notion → créer un nouveau champ
- Tout nouveau script qui tourne en prod doit être approuvé par Michele et commité dans `/scripts`
- Les migrations de schéma MongoDB doivent être testées en local/staging avant la prod

---

## Process de développement

### Workflow
- **Branches :** feature branches → PR → review → merge vers `develop`
- **Stage :** déploiement automatique sur merge vers `develop`
- **Production :** déploiement via tags (convention par date), annonce dans le channel tech
- **PRs :** lier à une tâche Notion (ID dans le titre de la PR)
- **Discussions d'architecture :** dans Notion ou en réunion, pas dans les commentaires de PR

### Communication
- Stand-up quotidien via bot Dixie sur Slack (ce qu'on a fait, ce qu'on prévoit, blockers)
- Feedback produit / bugs remontés dans un projet Notion dédié
- Pour les tâches complexes : écrire le plan dans Notion et attendre validation avant de coder

### Revues de code
- Diego et Kyle font les reviews techniques
- Michele valide au niveau produit avant merge
- Toujours faire un QA pass complet sur staging avant de passer en prod

---

## Liens utiles

- Notion platform roadmap : Oli's Lab Notion
- [[Sommaire Meetings]] - toutes les réunions archivées
- [[Standards & Patterns]] - règles de code Oli's Lab
- [[Bugs & Décisions]] - bugs résolus et décisions techniques notables
- [[Chantiers/Migration CMS Payload]] - état de la migration Payload
- [[Chantiers/Migration Next.js]] - état de la migration Next.js + Checkout v2
- [[Chantiers/Event Tracking Analytics]] - architecture event tracking
- [[Migration Merchant API|Chantiers/Migration Merchant API]] - migration des API merchant + klaviyo + gestion du stock
- [[Overview|Rating Tool]] - et son fonctionnement 
