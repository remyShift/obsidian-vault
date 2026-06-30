---
tags: [SoftwareCraft, DesignPatterns, Behavioral]
---

Passer une requête à travers une **chaîne de gestionnaires**. Chaque maillon décide de traiter la requête ou de la passer au suivant. Découple l'émetteur de la requête de ses traiteurs.

```js
class Handler {
  setNext(handler) {
    this.next = handler;
    return handler; // permet le chaînage : auth.setNext(rateLimit).setNext(route)
  }

  handle(request) {
    if (this.next) return this.next.handle(request);
    return null;
  }
}

class AuthMiddleware extends Handler {
  handle(request) {
    if (!request.token) return { status: 401, error: 'Unauthorized' };
    return super.handle(request); // passe au suivant
  }
}

class RateLimitMiddleware extends Handler {
  handle(request) {
    if (this.isRateLimited(request.ip)) return { status: 429, error: 'Too Many Requests' };
    return super.handle(request);
  }
}

class RouteHandler extends Handler {
  handle(request) {
    return { status: 200, body: 'OK' };
  }
}

// Composition de la chaîne
const auth = new AuthMiddleware();
const rateLimit = new RateLimitMiddleware();
const route = new RouteHandler();

auth.setNext(rateLimit).setNext(route);

const response = auth.handle(request);
```

## En JavaScript — Express est un Chain of Responsibility

```js
app.use(authMiddleware);
app.use(rateLimitMiddleware);
app.get('/orders', orderHandler);
```

C'est exactement le même pattern. `next()` = `super.handle(request)`. Comprendre Chain of Responsibility, c'est comprendre le coeur d'Express.

## Signal d'usage

- Pipelines de traitement : validation, transformation, autorisation
- Plusieurs règles à appliquer en séquence avec possibilité de court-circuit
- Quand la liste des traiteurs peut varier selon le contexte

## Erreur classique

Chaînes trop longues sans visibilité sur l'ordre. Documenter l'ordre des middlewares et le rendre explicite, surtout quand les dépendances entre maillons existent (auth avant rate limit, pas l'inverse).

---

- [[Design Patterns Behavioral]] — vue d'ensemble des patterns behavioral
