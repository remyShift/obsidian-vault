# TS-Seed — Design Document

## Vue d'ensemble

TS-Seed est une web app Next.js fullstack pour bootstrapper des projets TypeScript. L'utilisateur choisit des briques depuis un catalogue, configure son projet (versions, package manager, nom), et l'outil génère les fichiers dans un dossier cible.

L'outil lui-même suit une architecture hexagonale DDD. Le domaine est en TypeScript pur, sans dépendance framework, entièrement testable unitairement.

---

## Les deux bounded contexts

**`brick/`** — le moteur. Ne connaît ni TypeScript ni Express. Gère uniquement : cataloguer des briques, appliquer une brique sur un projet, résoudre les dépendances entre briques. Ce code ne change pas quand on ajoute une nouvelle brique.

**`catalog/`** — les implémentations concrètes. Contient une brique par technologie supportée. Chaque brique sait quels fichiers créer et quelles dépendances npm installer.

```
src/
  brick/
    domain/           # moteur générique, TS pur
    application/      # orchestration
    infrastructure/
      primary/        # Next.js API routes
      secondary/      # filesystem, registre in-memory

  catalog/
    express/
    typescript/
    vitest/
    ...

  shared/
    domain/           # Value Objects partagés
```

---

## Modèle de domaine

### Vocabulaire

| Terme | Rôle |
|---|---|
| `BrickSlug` | Identifiant unique d'une brique, ex: `"express"` |
| `BrickVersion` | Version choisie, ex: `"5.x"` |
| `BrickContext` | Ce que l'utilisateur configure (dossier, version, package manager...) |
| `Patch` | Ce qu'une brique produit (fichiers, dépendances, scripts) |
| `BrickDefinition` | Description d'une brique dans le catalogue (slug, versions dispo, dépendances requises) |
| `BrickBuilder` | Interface qui produit un `Patch` depuis un `BrickContext` |
| `BrickRegistry` | Port — accès au catalogue |
| `ProjectWriter` | Port — écrit le `Patch` sur le filesystem |

### BrickContext

Configuré une seule fois par l'utilisateur pour son projet :

```
folder          # dossier cible
projectName     # nom du projet
packageManager  # npm | pnpm | yarn
version         # version choisie pour la brique appliquée
```

### Patch

Ce qu'une brique retourne :

```
files        # fichiers à créer (template + destination)
dependencies # packages npm à installer (avec flag dev)
scripts      # entrées à ajouter dans package.json scripts
```

---

## Ports (frontières du domaine)

```ts
interface BrickBuilder {
  build(context: BrickContext): Patch
}

interface BrickRegistry {
  findBySlug(slug: BrickSlug): BrickDefinition | undefined
  listAll(): BrickDefinition[]
}

interface ProjectWriter {
  apply(folder: ProjectFolder, patch: Patch): void
}
```

Ces trois interfaces sont définies dans `brick/domain/`. Les implémentations concrètes sont dans `infrastructure/secondary/` et `catalog/`. Le domaine ne les connaît pas.

---

## Exemple : brique `express`

La brique Express déclare dans `catalog/express/` :

- **Versions disponibles :** `4.x`, `5.x`
- **Dépendances requises :** `typescript-core` (Express seul ne sert à rien sans TS)
- **Ce qu'elle génère :**
  - `src/server.ts` — point d'entrée avec un serveur Express minimal
  - `src/router.ts` — routeur de base
- **Dépendances npm :** `express` + `@types/express` (dev), version selon le choix
- **Scripts :** `start`, `dev`

L'application service orchestre :

```
1. L'user sélectionne "express", version "5.x", pnpm, dossier "/projects/my-api"
2. BrickApplicationService.applyBrick("express", context)
3. BrickRegistry.findBySlug("express")       → récupère la définition
4. BrickBuilder.build(context)               → produit le Patch
5. ProjectWriter.apply(folder, patch)        → écrit sur le filesystem
```

---

## Découplage Next.js

| Couche | Next.js |
|---|---|
| `brick/domain/` | Jamais |
| `brick/application/` | Jamais |
| `catalog/*/` | Jamais |
| `brick/infrastructure/primary/` | Oui — API routes uniquement |
| `brick/infrastructure/secondary/` | Non — Node.js `fs` pur |

Un test unitaire sur `ExpressBrickBuilder` n'a aucune dépendance sur Next.js, sur le filesystem, ni sur quoi que ce soit d'externe.

---

## V1 — Briques cibles

| Brique | Versions | Requiert |
|---|---|---|
| `typescript-core` | 4.x, 5.x | — |
| `eslint` | flat config | `typescript-core` |
| `vitest` | 1.x, 2.x | `typescript-core` |
| `express` | 4.x, 5.x | `typescript-core` |
| `prisma` | 5.x, 6.x | `typescript-core` |
| `docker` | — | — |
