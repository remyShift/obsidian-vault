---
date: 2026-03-31
type: meeting
projet: Oli's Lab
tags: [cms, payload, sync-script, code-review, olis-lab]
participants: [R\u00e9my, Diego]
notion:
---

# Huddle : CMS Sync Script - Code Review

---

## Contexte

Session de code review entre Diego et Rémy sur le script de synchronisation Payload CMS → MongoDB legacy. Diego avait été absent et revient sur les PRs ouvertes.

---

## Décision principale : abandon du script générique

### Situation initiale
Michele avait demandé un script générique capable de syncer n'importe quelle collection Payload vers MongoDB. Rémy l'avait implémenté, mais en codant, a découvert que chaque collection a des edge cases très différents :

- **Brands** : mapping relativement simple
- **Categories** : existent dans MongoDB, mapping standard
- **Subcategories** : **n'existent pas comme collection dans MongoDB**. Elles sont stockées comme clés d'objets dans la collection `categories`. Changer le nom d'une subcategory = renommer une clé d'objet, pas update un document. Opération MongoDB spéciale (unset + set).
- **Products** : encore plus complexe, les subcategories sont hardcodées dans le document produit (pas liées à la collection categories), donc un rename de subcategory implique de retrouver tous les produits concernés et mettre à jour le champ localisé sans écraser le tableau.

### Problème du script générique
- Pour gérer les cas spéciaux, Rémy avait ajouté des `if` statements dans le controller générique
- Diego : dès qu'il y a un `if` dans une abstraction censée être générique, c'est un code smell. La collection dans le `if` devrait avoir son propre endpoint.
- Conclusion de Diego : **"je préfère dupliquer le code d'abord, abstraire seulement si nécessaire"**. Un script générique avec des cas spéciaux c'est de la sur-abstraction.

### Architecture décidée
- **CMS side (hook)** : endpoint dynamique acceptant un paramètre de collection dans la route. Ce endpoint redirige vers le bon endpoint statique côté serveur.
- **Server side (legacy backend)** : **3 routes statiques séparées**, chacune avec son propre controller dédié :
  - `/internal/sync/brands`
  - `/internal/sync/categories`
  - `/internal/sync/subcategories`
- Pas de controller générique avec des `if`. Un controller = une collection.
- `unknown` et `any` sont à bannir dans les types TypeScript. Utiliser des types génériques propres à la place.

### Feature "move subcategory" retirée du scope
- Rémy avait implémenté la possibilité de déplacer une subcategory d'une catégorie parente à une autre (ex. déplacer "Moisturizer" de Skincare vers Body Care)
- Diego : c'est une feature séparée, pas liée au script de sync. À sortir de la PR.
- Rémy : accepte, la fonctionnalité sera de toute façon moins pertinente une fois sur Next.js

---

## Point technique : draft dans Payload

### Problème découvert
- Lors du seed script, tous les documents étaient créés en `draft` même en passant `draft: false`
- Rémy a trouvé que le seul moyen de forcer le statut `published` à la création est de passer `_status: 'published'` (champ interne de Payload)

### Logique dans le catch
- Si la création échoue avec une erreur de validation (champ requis manquant, règle non respectée), Rémy veut quand même sauvegarder le document en draft
- Raison : certains documents de la legacy DB n'ont pas tous les champs requis côtés Payload. On veut les conserver dans le CMS même incomplets, marqués comme draft.
- Diego valide la logique mais note que `_status` doit être passé explicitement dans le `payload.create` plutôt qu'en variable séparée.

---

## Discussion process : PRs et planning

Diego soulève un pattern récurrent : les discussions de review dans les PRs deviennent très longues car des décisions d'architecture qui auraient dû être prises en amont se retrouvent dans les commentaires de code.

### Positions
- **Diego** : préférerait valider l'approche avant que le code soit écrit. Propose des kickoffs de 10-15 min au début de chaque tâche pour aligner sur les attentes et l'architecture.
- **Rémy** : fait déjà les documents Notion en amont, mais si personne ne les review avant qu'il commence à coder, il ne peut pas rester bloqué indéfiniment. Certains edge cases ne se découvrent qu'à l'implémentation.
- **Consensus** : le problème vient des deux côtés. Diego s'engage à syncer avec Michele pour mettre en place des stand-ups quotidiens courts. Les kickoffs de tâche à la demande restent la meilleure solution pour les tâches complexes.

---

## Statut des PRs CMS au 31 mars

- PR brands : mergée (avec Kyle)
- Seed script pour brands : à vérifier si tourné sur stage
- PRs en attente : script de sync général (à refactorer selon les décisions ci-dessus)
- PR ESLint rules : prête, déblocage après fix Prettier. Diego va la merger, elle sera utile pour les prochaines PRs.

---

## Actions

- [ ] **Rémy** - Refactorer le sync script : supprimer l'approche générique, créer 3 endpoints statiques dédiés (brands, categories, subcategories) côté server
- [ ] **Rémy** - Retirer la feature "move subcategory" de la PR actuelle (scope séparé)
- [ ] **Rémy** - Corriger la logique `_status` dans le payload.create (passer directement dans les options)
- [ ] **Rémy** - Bannir `unknown` et `any` des types TypeScript dans la PR
- [ ] **Diego** - Merger la PR ESLint rules
- [ ] **Diego** - Vérifier si le seed script brands a tourné sur stage
- [ ] **Diego** - Syncer avec Michele sur la mise en place de stand-ups quotidiens
- [ ] **Diego** - Planifier un prochain meeting pour continuer la review CMS

---

## Notes complémentaires

- Règle générale rappelée par Diego : **dupliquer d'abord, abstraire ensuite seulement si nécessaire**. Un `if` à l'intérieur d'une abstraction générique est un code smell.
- Règle sur les types : **`unknown` et `any` sont bannis**. Utiliser des génériques propres.
- Règle sur les nouvelles features dans une PR : si quelque chose n'était pas dans le scope initial et que ça implique un `if` dans une abstraction, c'est probablement une feature séparée. Valider avec Diego ou Michele avant d'implémenter.
