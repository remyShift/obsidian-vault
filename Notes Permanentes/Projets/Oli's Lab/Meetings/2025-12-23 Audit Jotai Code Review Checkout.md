---
date: 2025-12-23
type: meeting
projet: Oli's Lab
tags: [code-review, state-management, jotai, refactoring, olis-lab]
participants: [R\u00e9my, Diego]
notion:
---

# Huddle : Audit Jotai & Code Review PR Checkout/Mapbox

---

## Contexte

Longue session en deux temps : Rémy présente son audit des atoms Jotai dans la CRA, puis Diego review les PRs en cours (checkout/Mapbox). Rémy part en vacances du 24 au 31 décembre.

---

## Partie 1 : Audit Jotai

Rémy a fait un audit complet des atoms Jotai de l'application, catégorisés par niveau d'urgence.

### Problèmes identifiés

**Sécurité critique :**
- `paymentAtom` : expose en clair les données de carte bancaire (numéro, expiry, CVC). À corriger.

**Atoms utilisés dans un seul composant (quick wins → local state) :**
- Plusieurs atoms qui n'ont aucune raison d'être globaux. Les convertir en `useState` local.

**Atoms dupliqués :**
- Un atom `selectShippingService` existe en double dans deux fichiers store avec le même nom. L'un des deux n'est utilisé que dans un seul fichier.

**Atom avec type trop large :**
- Un atom utilise `string` au lieu d'un union type. En pratique il ne peut être que `'favorites'` ou `'voucher'`. À typer correctement.

**Atom lié à la navbar dans le category filter :**
- La navbar visibility est set depuis `categoryFilter`, ce qui est conceptuellement bizarre. Rémy propose de l'extraire dans un hook dédié. Bug probable : en cliquant sur certains filtres la navbar disparaît puis réapparaît. À investiguer dans une PR séparée (orange dans le tableau de Rémy).

**Atoms du skin profile questionnaire form :**
- Feature accessible uniquement via URL directe, non exposée dans l'UI. Patrick veut la conserver comme base pour sa feature. L'état devrait être local au formulaire plutôt que global. À laisser en l'état pour l'instant, la feature sera recoded.

**Global loading atom (interceptor) :**
- Diego : anti-pattern. Le loading state devrait être local à chaque composant qui fait un appel API (`if (isLoading) return <Skeleton />`). Double bénéfice : état explicite dans le contexte du composant + le type de la réponse n'est jamais `undefined` après le check.
- À garder comme refacto future.

### Plan en deux PRs

- **PR 1 : dead code** - atoms inutilisés ou clairement à supprimer
- **PR 2 : quick wins** - atoms utilisés dans un seul composant → conversion en local state

### Audits complémentaires à faire
- **Local storage** : identifier tous les usages, documenter
- **React Query** : Diego a utilisé React Query pour le GWP. Rémy doit faire le même type d'audit pour identifier les mauvais usages ou les cas où React Query devrait remplacer un atom.

---

## Partie 2 : Code Review PR Mapbox / Checkout

### Hook `useMap` - abstraction trop fine
- `useMap` ne fait que créer un `ref` et passer des props. Diego : 5-6 lignes, pas besoin d'un hook pour ça.
- Règle générale rappelée par Diego : **un hook justifie son existence s'il abstrait de la business logic complexe ou s'il est fortement partagé**. Wrapper 2 lignes dans un hook pour la "lisibilité" crée de la mémoire browser supplémentaire sans gain réel.
- Garder le `useRef` dans le composant `MapView` directement.

### `queueMicrotask` 
- Utilisé pour éviter le flickering lors de clics rapides pendant la Q&A. Diego : hacky mais acceptable si ça fonctionne. Rémy peut le garder, aucun utilisateur ne cliquera aussi vite.

### Animation Framer Motion → CSS
- Rémy pense pouvoir remplacer l'animation actuelle (Framer Motion) par des keyframes CSS simples.
- Diego : si c'est simple en CSS, faire CSS. Si c'est dur, valider avec Michele si l'animation est vraiment requise en tant que spécification produit.
- Rémy va essayer CSS d'abord.

### Mapbox style token (Ante account)
- Le token de style Mapbox custom est lié au compte Ante. Si on change de designer, on perd le style.
- À migrer sur un compte Oli's Lab. Rémy recheck avec Ante.

### `canProceed` hook
- Logique : si le relay point n'est pas confirmé, l'utilisateur ne peut pas avancer au paiement. Partagé entre desktop et mobile checkout.
- Diego comprend le besoin mais questionne l'implémentation. Rémy garde pour l'instant, la logique justifie le hook dans ce cas.

### Scroll to bottom sur mobile (relay point)
- Sur mobile, le bouton de confirmation du relay point et le bouton "aller au paiement" se superposent. Solution : scroll automatique vers le bas au clic sur un relay point.
- Diego : hacky mais acceptable.

### `useEffect` dependencies
- Diego : attention aux `useEffect` avec des listes de dépendances complexes. Privilégier les constantes simples ou restructurer la logique quand c'est possible.

### Article sync bug
- Diego a identifié que `generateStats` reçoit un item unique mais attend un array. Ne bloque pas, mais explique potentiellement des silent failures sur le sync d'articles.
- Le vrai problème : beaucoup de `console.error` dans le frontend que personne ne voit. À remplacer par `Sentry.captureException()` pour avoir les erreurs dans le channel PostHog alerts Slack.

---

## Règles et principes rappelés

- **Abstraction** : ne pas abstraire moins de 10 lignes sauf si la logique est complexe ou fortement partagée. Trop d'abstractions = surcharge mémoire browser + perte de traçabilité dans le debug.
- **`console.log` en frontend** : personne ne voit ça hors Q&A. Utiliser `Sentry.captureException()` pour les erreurs qui comptent.
- **Prettier local** : ne fonctionne pas en dehors du package UI (plugin manquant dans le contexte des autres apps). Husky/lint-staged au commit fonctionne pour tout le monde. Diego investigate.

---

## Actions

- [ ] **Rémy** - PR 1 : dead code atoms (inutilisés, à supprimer)
- [ ] **Rémy** - PR 2 : quick wins atoms (un seul composant → local state)
- [ ] **Rémy** - Audit local storage + React Query (documenter les usages)
- [ ] **Rémy** - Corriger le `paymentAtom` (ne pas stocker les données de carte en clair)
- [ ] **Rémy** - Tester le remplacement Framer Motion → CSS keyframes sur l'animation relay point
- [ ] **Rémy** - Checker avec Ante le token Mapbox style et migrer vers compte Oli's Lab
- [ ] **Rémy** - Refactorer `useMap` : sortir le `useRef` dans `MapView` directement
- [ ] **Diego** - Investiguer le bug Prettier en dehors du package UI
