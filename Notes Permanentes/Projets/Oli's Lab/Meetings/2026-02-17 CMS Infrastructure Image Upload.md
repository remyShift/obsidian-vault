---
date: 2026-02-17
type: meeting
projet: Oli's Lab
tags: [cms, payload, infrastructure, images, olis-lab]
participants: [R\u00e9my, Diego]
notion:
---

# Huddle : CMS Infrastructure & Image Upload

---

## Contexte

Huddle de clarification sur l'architecture de déploiement du CMS Payload et sur la gestion des images avant que Rémy commence à travailler dessus.

---

## Architecture des instances Payload

### Stratégie retenue : une seule instance production
- **Une instance Payload** sert à la fois Stage et Production
  - Production : lit uniquement les documents avec statut **published**
  - Stage : peut lire aussi les **drafts**
- L'instance actuelle `cms-dev` = POC uniquement, ne pas s'y fier pour la suite

### Instance de développement local
- Chaque dev travaille avec sa propre DB locale
- Pour les PR reviews : le dev fournit un **DB dump**, Diego le restaure en local pour vérifier
- Le schéma est entièrement en code → possible de supprimer la DB locale et la recréer vide depuis Payload (la structure est régénérée, les données non)
- Diego gère les déploiements manuellement pour l'instant, pas de script prévu

### Workflow de branchement
- Rémy doit créer une branche depuis celle de Diego (qui contient les changements S3 + image conversion)
- Diego va cleaner et merger sa PR rapidement, ce boilerplate servira de base de départ propre pour la suite

---

## Migrations

- Les migrations Payload fonctionnent comme Rails : elles gèrent les **changements de schéma** (rendre un champ obligatoire, changer un type de `number` à `enum`, etc.)
- **Ne pas confondre** avec les modifications de contenu (changer un titre de produit = fait via l'UI du CMS, pas une migration)
- Pour l'instant : ne pas s'en préoccuper. À garder en tête pour quand le schéma évoluera.
- Diego envoie le script de population des données à Rémy pour vérification.

---

## Images : upload et transformation

### Ce que Diego a implémenté
- S3 est connecté et fonctionnel
- Payload est configuré pour stocker **deux versions** de chaque image uploadée :
  - L'originale
  - Une version transformée dans le bon format (même pattern que la génération de thumbnails)
- **C'est la version transformée qu'on doit consommer**, pas l'originale
- Stocker les deux est acceptable : S3 coûte très peu, et supprimer l'originale serait trop complexe

### Question ouverte : tailles et focus point
- Rémy soulève : dans Payload, les tailles d'image doivent être définies dans le schéma pour que le focus point fonctionne correctement
- Si on ne définit qu'une seule taille, le focus point ne sera pas exploitable
- **À confirmer** : est-ce que Next.js peut gérer le redimensionnement côté front, ou faut-il définir plusieurs tailles dans le schéma Payload ?
- Rémy se charge de vérifier ça dans la journée

---

## Actions

- [ ] **Rémy** - Vérifier la doc Payload sur la définition des tailles d'image dans le schéma et le comportement du focus point
- [ ] **Rémy** - Créer une branche depuis celle de Diego pour continuer le développement CMS
- [ ] **Rémy** - Vérifier le script de population des données envoyé par Diego
- [ ] **Diego** - Cleaner et merger sa PR (boilerplate S3 + image conversion) pour établir la base
- [ ] **Diego + Rémy** - Confirmer l'approche finale sur l'upload d'images (tailles, focus point, consommation côté Next.js)
