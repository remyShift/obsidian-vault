---
date: 2026-04-28
type: meeting
projet: Oli's Lab
tags:
  - product-feed
  - google-merchant
  - meta
  - klaviyo
  - xml
  - s3
  - cloudfront
  - olis-lab
participants:
  - Diego
  - Michele
  - Remy
lien: https://www.notion.so/olislab/Product-Catalogue-Management-3504bf4c7fa1801c9d74f539b3a350bf?pvs=189#3504bf4c7fa1801296ffdb363cc7359c
---

# Huddle : Product Catalogue Management

---

## Contexte

Réunion de cadrage sur la stratégie de gestion du catalogue produit pour les intégrations tierces. La dépréciation de la Content API de Google Merchant Center le 18 août (remplacée par Merchant API v2) est un déclencheur, mais le besoin est plus large : avoir une solution robuste pour exposer le catalogue à l'ensemble des outils marketing.

### Situation actuelle
- **Google Merchant Center** : connecté via un endpoint qui lit la base legacy. Le trigger était sur Notion, qui n'est plus utilisé, donc plus aucune mise à jour automatique.
- **Meta Catalog** : connexion manuelle via export Excel depuis Google Merchant Center. Pas automatisé.
- **Klaviyo Catalog** : pas connecté du tout.
- Les équipes marketing, notamment sur Meta, sont bloquées faute de données produit à jour.

---

## Décision principale : XML feed sur S3 + CloudFront

L'équipe a écarté l'option d'une intégration API par plateforme (trop de maintenance, pas scalable) au profit d'un **XML feed unique hébergé sur S3 avec distribution CloudFront**, qui devient la source de vérité pour toutes les intégrations tierces.

### Pourquoi ce choix
- Meta et Klaviyo peuvent lire un XML hostés (Meta supporte nativement le format Google Merchant Center)
- Un seul fichier à maintenir, consommé par les trois plateformes
- CloudFront garantit que l'URL reste stable même si le fichier est régénéré (pas besoin de mettre à jour les liens côté Meta, Klaviyo, GMC à chaque mise à jour)
- Payload CMS est déjà connecté à S3 pour les images, l'infra est en place

### Fréquence de refresh
- Google Merchant Center : configurable, minimum toutes les heures
- Klaviyo : fixe à 6 heures, non configurable
- L'équipe penche pour une génération sur chaque update produit dans Payload, ou via un bouton manuel dans le CMS

### Langues
- Un fichier XML par langue (chaque plateforme associe un feed à une langue)
- Priorité au catalogue français, mais les deux langues seront supportées dès le départ

---

## Scope

### Dans le scope
- Génération du XML feed et hébergement S3 + CloudFront
- Intégration Google Merchant Center, Meta Catalog, Klaviyo
- Support multi-langue (FR + EN)
- Gestion du statut live/offline des produits (boolean, pas de stock détaillé)

### Hors scope pour l'instant
- Architecture complète de gestion du stock
- Tracking quantité en stock (uniquement in-stock/out-of-stock suffit)
- Limites d'appels API BigBlue
- Fonctionnalité de stock holding

Note : la gestion du stock côté frontend continuera à fonctionner comme maintenant (appels directs à BigBlue au moment de l'ajout au panier).

---

## Détails techniques

### Génération du XML
- Payload comme source de vérité, génération déclenchée par un hook sur update produit ou via un bouton dans le CMS
- Le backend legacy a déjà accès au SDK BigBlue et ses controllers, potentiellement réutilisable
- Une dépendance Node.js pour l'écriture XML sera nécessaire (à confirmer côté Payload vs legacy)

### CloudFront et nommage
- Le problème : si le fichier S3 change de nom à chaque régénération, les liens configurés sur Meta/Klaviyo/GMC cassent
- Solution : CloudFront expose toujours la même URL (ex. `olis-lab-catalog.xml`) quel que soit le fichier sous-jacent, en invalidant le cache à chaque mise à jour

### Tests et sandbox
- Créer des comptes sandbox isolés sur Google Merchant Center (même approche que les analytics streams)
- Klaviyo : utiliser le compte test existant
- Meta : créer un catalogue de test dédié
- L'objectif est de valider le process et le timing d'import avant de connecter les comptes prod

---

## Actions

- [ ] **Diego + Remy** - Clarifier le format XML attendu par Google Merchant Center (structure exacte des tags)
- [ ] **Diego + Remy** - Vérifier si Klaviyo peut lire le format XML Google Merchant Center
- [ ] **Diego** - Ajouter contexte et critères d'acceptance sur la tâche API implementation, puis passer la main à Remy
- [ ] **Remy** - Implémenter l'API (génération XML + upload S3) à partir de vendredi, deadline mercredi prochain
- [ ] **Diego + Remy** - Setup S3 et CloudFront en pair (Remy en mode apprentissage sur cette partie infra)
- [ ] **Team** - Documenter le process et connecter les trois plateformes au XML feed
- [ ] **Team** - Créer les comptes sandbox Google Merchant Center pour tester l'intégration avant le go live
- [ ] **Team** - Documenter où changer le lien de lecture du feed pour la maintenance future

## Timeline

| Tâche | Début | Fin |
|---|---|---|
| Clarté format XML | Immédiat | - |
| API implementation (Payload) | Vendredi 1 mai | Mercredi 6 mai |
| Setup S3 + CloudFront | Après clarté API | - |
| Documenter + connecter les tiers | En parallèle (connexion finale après implem) | - |

Toutes les tâches sont classées must-have.
