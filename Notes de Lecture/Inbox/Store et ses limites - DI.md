---
tags:
---

# Store et ses limites - vers l'injection de dépendances

## À quoi sert un Store

Un Store (Redux, Zustand, NgRx, Pinia...) est avant tout une manière de **centraliser l'état dans un seul endroit**. Vision améliorée des variables globales du passé.

Cas d'usage légitimes :
- Passer des propriétés à un composant sans traverser toute la hiérarchie (prop drilling)
- Partager un état mutable entre plusieurs composants
- Opérations avec cycle de vie global : thème, login, utilisateur connecté
- Partager des mises à jour en temps réel
- Synchroniser une app sur plusieurs onglets

Avantages réels : DevTools, réactivité, état partagé observable.

---

## Le problème : le Store abusé

Le Store est souvent mal utilisé comme couche de logique métier, pas juste comme adaptateur d'état.

Le raisonnement qui mène à l'abus :
> "Le domaine doit être testable en isolation des composants. Le Store est facile à tester en isolation. Donc je mets le domaine dans le Store."

Résultat : le domaine se retrouve **prisonnier du Store**. Toute opération passe par la cérémonie `dispatch / action / reducer`, même là où un simple appel de fonction suffirait. Le Store devient l'intermédiaire incontournable entre les composants et le domaine, au lieu d'être un simple adaptateur d'état.

Un domaine riche peut très bien gérer sa propre logique en pur TypeScript, sans aucun framework store.

---

## Le vrai besoin derrière : l'inversion de dépendance

Ce qu'on cherche réellement avec cette approche c'est l'**inversion de dépendance** : découpler les composants des implémentations concrètes pour pouvoir tester, substituer, isoler.

Utiliser un Store pour faire de l'injection de dépendances, c'est overkill.

---

## Les limites des outils de DI natifs

Les trois frameworks principaux proposent des outils de DI, mais chacun a ses limites :
- **React** : nesting de contextes, typing complexe
- **Vue** : null checks, typage imprécis
- **Angular** : lazy loading (tout est instancié même si pas utilisé)

Des librairies comme **Piqure** résolvent ces problèmes en étant **agnostiques du framework**.

---

## Alternatives au Store pour la gestion d'état et la réactivité

Le Store n'est pas la seule option :
- **Signals** : réactivité fine-grained, natif dans Angular et Vue, expérimental React
- **RxJS / pattern Observable** : flux asynchrones, bien adapté aux apps complexes
- **TanStack Query** : gestion du state serveur (fetch, cache, synchronisation)
- **Domaine immuable + bus d'événements natif** : zéro dépendance, le domaine gère son propre état et émet des événements

Chaque approche a ses trade-offs. L'idée : choisir l'outil adapté au problème plutôt qu'un outil unique qui fait tout.

---

## Ce que ça change en architecture front

- Le Store reste utile pour ce qu'il fait bien : état partagé, réactivité, DevTools
- Le domaine n'a pas à dépendre du Store pour exister
- L'injection de dépendances est le vrai mécanisme pour découpler composants et implémentations
- Un Store isolé du rendering est plus simple à tester - mais ce n'est pas une raison suffisante pour y mettre toute la logique métier

---

## Lien avec d'autres concepts

- **Dépendance sans Couplage** : même problématique, appliquée au front
- **CQRS** : le pattern dispatch/action/reducer du Store ressemble à une implémentation naïve de CQRS - mais sans la rigueur de séparation des responsabilités
- **DTO** : les payloads d'actions Redux sont des formes de DTOs

---

## À faire

- [ ] Trier : garder / promouvoir en Note Permanente / supprimer
- [ ] Relier à "Dépendance sans Couplage", "CQRS"
- [ ] Explorer Piqure pour comprendre l'approche DI agnostique framework
- [ ] Identifier sur la mission les endroits où un Store est utilisé pour de la logique métier
