---
date: 2025-12-19
type: meeting
projet: Oli's Lab
tags: [state-management, testing, audit, jotai, olis-lab]
participants: [R\u00e9my, Diego]
notion:
---

# Huddle : Deux projets - POC Tests & Audit State Flow

---

## Contexte

Court cadrage de Diego sur deux projets à mener en parallèle : un POC de tests et un audit complet de la gestion d'état de l'application.

---

## Projet 1 : POC Tests (backend + frontend)

### Objectif
Pas une suite de tests complète. Juste démontrer comment une suite de tests devrait ressembler sur ce projet.

### Approche
- Choisir le flow le plus simple possible (happy path, page facile à tester)
- Couvrir backend ET frontend
- But : avoir une référence de comment faire, pas de la couverture de test

### Qui
Rémy prend ça.

---

## Projet 2 : Audit State Flow

### Problème actuel : cart items stockés à 3 endroits
C'est l'exemple le plus flagrant mais pas le seul.

Les cart items vivent actuellement à **3 endroits différents** :
1. **Local storage** : pour les utilisateurs anonymes
2. **Base de données** : pour les utilisateurs connectés
3. **Atom Jotai** : en parallèle des deux précédents

En plus, certains composants (ex. le checkout) ont un **local state** pour les cart items qui se synchronise avec le local storage, qui se synchronise avec l'atom.

Conséquence : chaque développeur qui touche au cart doit penser à ces 3 couches simultanément. C'est une source constante de bugs et une barrière majeure à la migration Next.js.

### Note de Diego sur l'atom + local storage
Il existe une méthode Jotai `atomWithStorage` qui synchronise automatiquement un atom avec le local storage (Diego l'a utilisé pour le top banner). Ça réduirait à 2 couches (atom/localStorage + DB), mais ça ne règle pas le problème de fond.

### Vision long terme de Diego
Idéalement, tout ce qui doit être persisté passe par la **base de données**. Le composant arrive, fetch ce dont il a besoin, rend les données. Pas de prop drilling, pas de gestion de synchronisation entre plusieurs stores.

### Ce que l'audit doit produire
Pas de changement de code. Juste de la **documentation** :
- Pour chaque bout de state (cart, user, checkout, etc.) : où est-il stocké, comment est-il lu, comment est-il mis à jour, combien de composants l'utilisent
- Référence complète pour savoir "où attaquer" quand viendra le moment de refactoriser pour Next.js

### Périmètre
Tout. Pas seulement le cart. Tous les atoms Jotai, tout le local storage, tout le local state partagé via prop drilling. Diego : c'est précisément ce qui bloque la migration Next.js.

### Qui
Rémy mène aussi cet audit (en parallèle du POC tests).

---

## Actions

- [ ] **Rémy** - POC tests : créer un exemple minimal de test backend + frontend sur le flow le plus simple possible
- [ ] **Rémy** - Audit state flow : documenter tous les endroits où le state est stocké (atoms, local storage, DB, local state partagé)
- [ ] **Diego** - Reviewer et merger la PR relay points aujourd'hui ou lundi (pour permettre à Michele de faire du Q&A ce weekend)
