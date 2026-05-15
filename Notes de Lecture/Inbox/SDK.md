---
tags:
---
## Définition

Un SDK (Software Development Kit) est un ensemble d'outils, de bibliothèques, de documentation et d'exemples fournis par un service ou une plateforme pour permettre aux développeurs de l'intégrer plus facilement dans leur propre code.

---

## SDK vs API

La distinction est importante et souvent floue :

| | API | SDK |
|---|---|---|
| Nature | Contrat d'interface (endpoints, formats) | Implémentation prête à l'emploi |
| Utilisation | Appels HTTP directs | Import d'une librairie dans le code |
| Abstraction | Basse | Haute |
| Exemple | `POST /v1/messages` | `anthropic.messages.create(...)` |

**L'API est le contrat. Le SDK est la couche d'abstraction au-dessus de ce contrat.**

Un SDK wrappe une API. Il gère pour toi : l'authentification, la sérialisation/désérialisation, la gestion des erreurs, la pagination, le retry, les types TypeScript... Tout ce que tu aurais à coder si tu appelais l'API à la main.

---

## Exemple concret

### Appel API direct (sans SDK)

```typescript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Bonjour' }],
  }),
});

const data = await response.json();
```

### Avec le SDK Anthropic

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic(); // API key récupérée automatiquement

const message = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Bonjour' }],
});
```

Le SDK gère l'auth, les headers, les erreurs HTTP, les types TypeScript, la gestion des streams, etc.

---

## Ce qu'un bon SDK fournit

- **Types** : autocomplétion et vérification statique dans l'IDE
- **Gestion des erreurs** : exceptions typées plutôt que des status codes bruts
- **Auth** : abstraction des mécanismes d'authentification
- **Retry** : logique de retry automatique sur les erreurs transitoires
- **Pagination** : helpers pour itérer sur des résultats paginés
- **Versioning** : compatibilité maintenue entre les versions du SDK et de l'API
- **Exemples et documentation** : souvent inclus ou liés

---

## Quand utiliser un SDK vs appeler l'API directement

**Utiliser le SDK** si :
- Il en existe un maintenu officiellement pour ton langage
- La logique d'intégration est récurrente ou complexe
- Tu veux les types TypeScript sans les écrire toi-même

**Appeler l'API directement** si :
- Pas de SDK disponible pour ton langage
- L'intégration est ponctuelle et très simple
- Tu as besoin d'un contrôle fin que le SDK n'offre pas
- Le SDK ajoute trop de dépendances pour ce que tu en fais

---

## Ce que ça change en pratique

Intégrer un service tiers via son SDK plutôt qu'en appelant directement l'API réduit significativement le code de plomberie, améliore la maintenabilité, et évite les erreurs d'intégration courantes (mauvais headers, mauvaise sérialisation, erreurs non gérées).

---

## Lien avec d'autres concepts

- **DTO** : les types retournés par un SDK sont des formes de DTOs
- **API** : un SDK est une couche au-dessus d'une API
