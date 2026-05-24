# TS-Seed — Implementation Plan Phase 1

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le moteur complet de TS-Seed avec une première brique fonctionnelle (`typescript-core`), accessible via une API REST Next.js. Pas d'UI dans cette phase.

**Architecture:** Architecture hexagonale DDD. `brick/domain/` contient les types métier et les ports (interfaces). `brick/application/` orchestre sans logique métier. `brick/infrastructure/` contient les adaptateurs (Next.js API routes, filesystem, registre in-memory). `catalog/typescript/` contient la première implémentation concrète.

**Tech Stack:** Next.js 15 (App Router), TypeScript 5, vitest (tests unitaires), Node.js `fs` (filesystem adapter)

---

## Structure des fichiers

```
ts-seed/
  src/
    shared/domain/
      BrickSlug.ts
      BrickSlug.test.ts
      BrickVersion.ts
      BrickVersion.test.ts
      ProjectFolder.ts
      ProjectFolder.test.ts
      PackageName.ts
      PackageName.test.ts

    brick/domain/
      BrickContext.ts
      BrickDefinition.ts
      Patch.ts
      BrickBuilder.ts          # interface (port)
      BrickRegistry.ts         # interface (port)
      ProjectWriter.ts         # interface (port)
      errors/
        BrickNotFoundError.ts

    brick/application/
      BrickApplicationService.ts
      BrickApplicationService.test.ts

    brick/infrastructure/
      primary/
        container.ts           # composition root
      secondary/
        InMemoryBrickRegistry.ts
        InMemoryBrickRegistry.test.ts
        FileSystemProjectWriter.ts
        FileSystemProjectWriter.test.ts

    catalog/typescript/
      domain/
        TypescriptBrickBuilder.ts
        TypescriptBrickBuilder.test.ts
      infrastructure/primary/
        TypescriptBrickDefinition.ts

    app/api/bricks/
      route.ts                              # GET /api/bricks
      [slug]/apply/
        route.ts                            # POST /api/bricks/:slug/apply
```

---

## Task 1 : Init projet

**Files:**
- Create: `ts-seed/` (nouveau projet Next.js)
- Create: `vitest.config.ts`
- Modify: `package.json`

- [ ] **Step 1 : Créer le projet Next.js**

```bash
npx create-next-app@latest ts-seed --typescript --src-dir --app --no-tailwind --no-eslint
cd ts-seed
```

Répondre aux prompts : `No` pour tout sauf TypeScript et App Router.

- [ ] **Step 2 : Ajouter vitest**

```bash
pnpm add -D vitest @vitest/coverage-v8
```

- [ ] **Step 3 : Créer vitest.config.ts à la racine**

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
```

- [ ] **Step 4 : Ajouter les scripts de test dans package.json**

```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

- [ ] **Step 5 : Vérifier que vitest tourne**

```bash
pnpm test:run
```

Expected : `No test files found` — pas d'erreur, juste aucun test.

- [ ] **Step 6 : Commit**

```bash
git add .
git commit -m "chore: init Next.js project with vitest"
```

---

## Task 2 : Value Object BrickSlug

**Files:**
- Create: `src/shared/domain/BrickSlug.ts`
- Create: `src/shared/domain/BrickSlug.test.ts`

- [ ] **Step 1 : Écrire les tests**

```ts
// src/shared/domain/BrickSlug.test.ts
import { describe, it, expect } from 'vitest'
import { BrickSlug } from './BrickSlug'

describe('BrickSlug', () => {
  it('should create a valid slug', () => {
    expect(BrickSlug.of('typescript-core').value).toBe('typescript-core')
  })

  it('should throw for empty string', () => {
    expect(() => BrickSlug.of('')).toThrow('Invalid BrickSlug')
  })

  it('should throw for uppercase characters', () => {
    expect(() => BrickSlug.of('TypeScript')).toThrow('Invalid BrickSlug')
  })

  it('should throw for spaces', () => {
    expect(() => BrickSlug.of('my slug')).toThrow('Invalid BrickSlug')
  })

  it('should compare equality', () => {
    expect(BrickSlug.of('express').equals(BrickSlug.of('express'))).toBe(true)
    expect(BrickSlug.of('express').equals(BrickSlug.of('vitest'))).toBe(false)
  })
})
```

- [ ] **Step 2 : Vérifier que les tests échouent**

```bash
pnpm test:run
```

Expected : FAIL — `Cannot find module './BrickSlug'`

- [ ] **Step 3 : Implémenter BrickSlug**

```ts
// src/shared/domain/BrickSlug.ts
export class BrickSlug {
  private constructor(readonly value: string) {}

  static of(value: string): BrickSlug {
    if (!value || !/^[a-z][a-z0-9-]*$/.test(value)) {
      throw new Error(`Invalid BrickSlug: "${value}"`)
    }
    return new BrickSlug(value)
  }

  equals(other: BrickSlug): boolean {
    return this.value === other.value
  }
}
```

- [ ] **Step 4 : Vérifier que les tests passent**

```bash
pnpm test:run
```

Expected : PASS — 5 tests verts

- [ ] **Step 5 : Commit**

```bash
git add src/shared/domain/BrickSlug.ts src/shared/domain/BrickSlug.test.ts
git commit -m "feat: add BrickSlug value object"
```

---

## Task 3 : Value Objects BrickVersion, ProjectFolder, PackageName

**Files:**
- Create: `src/shared/domain/BrickVersion.ts`
- Create: `src/shared/domain/BrickVersion.test.ts`
- Create: `src/shared/domain/ProjectFolder.ts`
- Create: `src/shared/domain/ProjectFolder.test.ts`
- Create: `src/shared/domain/PackageName.ts`
- Create: `src/shared/domain/PackageName.test.ts`

- [ ] **Step 1 : Écrire les tests BrickVersion**

```ts
// src/shared/domain/BrickVersion.test.ts
import { describe, it, expect } from 'vitest'
import { BrickVersion } from './BrickVersion'

describe('BrickVersion', () => {
  it('should create a valid version', () => {
    expect(BrickVersion.of('5.x').value).toBe('5.x')
  })

  it('should throw for empty string', () => {
    expect(() => BrickVersion.of('')).toThrow('BrickVersion cannot be empty')
  })

  it('should trim whitespace', () => {
    expect(BrickVersion.of('  5.x  ').value).toBe('5.x')
  })
})
```

- [ ] **Step 2 : Écrire les tests ProjectFolder**

```ts
// src/shared/domain/ProjectFolder.test.ts
import { describe, it, expect } from 'vitest'
import { ProjectFolder } from './ProjectFolder'

describe('ProjectFolder', () => {
  it('should create from an absolute path', () => {
    expect(ProjectFolder.of('/tmp/my-project').value).toBe('/tmp/my-project')
  })

  it('should throw for a relative path', () => {
    expect(() => ProjectFolder.of('relative/path')).toThrow('absolute path')
  })

  it('should throw for empty string', () => {
    expect(() => ProjectFolder.of('')).toThrow('absolute path')
  })
})
```

- [ ] **Step 3 : Écrire les tests PackageName**

```ts
// src/shared/domain/PackageName.test.ts
import { describe, it, expect } from 'vitest'
import { PackageName } from './PackageName'

describe('PackageName', () => {
  it('should create a valid package name', () => {
    expect(PackageName.of('typescript').value).toBe('typescript')
  })

  it('should accept scoped packages', () => {
    expect(PackageName.of('@types/node').value).toBe('@types/node')
  })

  it('should throw for empty string', () => {
    expect(() => PackageName.of('')).toThrow('PackageName cannot be empty')
  })
})
```

- [ ] **Step 4 : Vérifier que les tests échouent**

```bash
pnpm test:run
```

Expected : FAIL — modules introuvables

- [ ] **Step 5 : Implémenter BrickVersion**

```ts
// src/shared/domain/BrickVersion.ts
export class BrickVersion {
  private constructor(readonly value: string) {}

  static of(value: string): BrickVersion {
    if (!value.trim()) throw new Error('BrickVersion cannot be empty')
    return new BrickVersion(value.trim())
  }
}
```

- [ ] **Step 6 : Implémenter ProjectFolder**

```ts
// src/shared/domain/ProjectFolder.ts
import path from 'path'

export class ProjectFolder {
  private constructor(readonly value: string) {}

  static of(value: string): ProjectFolder {
    if (!value || !path.isAbsolute(value)) {
      throw new Error(`ProjectFolder must be an absolute path: "${value}"`)
    }
    return new ProjectFolder(value)
  }
}
```

- [ ] **Step 7 : Implémenter PackageName**

```ts
// src/shared/domain/PackageName.ts
export class PackageName {
  private constructor(readonly value: string) {}

  static of(value: string): PackageName {
    if (!value.trim()) throw new Error('PackageName cannot be empty')
    return new PackageName(value.trim())
  }
}
```

- [ ] **Step 8 : Vérifier que tous les tests passent**

```bash
pnpm test:run
```

Expected : PASS — 11 tests verts

- [ ] **Step 9 : Commit**

```bash
git add src/shared/domain/
git commit -m "feat: add BrickVersion, ProjectFolder, PackageName value objects"
```

---

## Task 4 : Types domaine et ports

**Files:**
- Create: `src/brick/domain/Patch.ts`
- Create: `src/brick/domain/BrickContext.ts`
- Create: `src/brick/domain/BrickDefinition.ts`
- Create: `src/brick/domain/BrickBuilder.ts`
- Create: `src/brick/domain/BrickRegistry.ts`
- Create: `src/brick/domain/ProjectWriter.ts`
- Create: `src/brick/domain/errors/BrickNotFoundError.ts`

Ces fichiers sont des types et interfaces purs — pas de logique, pas de tests directs. Ils seront testés indirectement via les classes qui les utilisent.

- [ ] **Step 1 : Créer Patch.ts**

```ts
// src/brick/domain/Patch.ts
import type { PackageName } from '../../shared/domain/PackageName'

export type NpmDependency = {
  name: PackageName
  version: string
  dev: boolean
}

export type NpmScript = {
  key: string
  command: string
}

export type BrickFile = {
  destination: string
  content: string
}

export type Patch = {
  files: BrickFile[]
  dependencies: NpmDependency[]
  scripts: NpmScript[]
}
```

- [ ] **Step 2 : Créer BrickContext.ts**

```ts
// src/brick/domain/BrickContext.ts
import type { BrickVersion } from '../../shared/domain/BrickVersion'
import type { ProjectFolder } from '../../shared/domain/ProjectFolder'

export type BrickContext = {
  folder: ProjectFolder
  projectName: string
  packageManager: 'npm' | 'pnpm' | 'yarn'
  version: BrickVersion
}
```

- [ ] **Step 3 : Créer BrickBuilder.ts**

```ts
// src/brick/domain/BrickBuilder.ts
import type { BrickContext } from './BrickContext'
import type { Patch } from './Patch'

export interface BrickBuilder {
  build(context: BrickContext): Patch
}
```

- [ ] **Step 4 : Créer BrickDefinition.ts**

```ts
// src/brick/domain/BrickDefinition.ts
import type { BrickSlug } from '../../shared/domain/BrickSlug'
import type { BrickVersion } from '../../shared/domain/BrickVersion'
import type { BrickBuilder } from './BrickBuilder'

export type BrickDefinition = {
  slug: BrickSlug
  name: string
  description: string
  availableVersions: BrickVersion[]
  requiredBricks: BrickSlug[]
  builder: BrickBuilder
}
```

- [ ] **Step 5 : Créer BrickRegistry.ts**

```ts
// src/brick/domain/BrickRegistry.ts
import type { BrickSlug } from '../../shared/domain/BrickSlug'
import type { BrickDefinition } from './BrickDefinition'

export interface BrickRegistry {
  findBySlug(slug: BrickSlug): BrickDefinition | undefined
  listAll(): BrickDefinition[]
}
```

- [ ] **Step 6 : Créer ProjectWriter.ts**

```ts
// src/brick/domain/ProjectWriter.ts
import type { ProjectFolder } from '../../shared/domain/ProjectFolder'
import type { Patch } from './Patch'

export interface ProjectWriter {
  apply(folder: ProjectFolder, patch: Patch): void
}
```

- [ ] **Step 7 : Créer BrickNotFoundError.ts**

```ts
// src/brick/domain/errors/BrickNotFoundError.ts
import type { BrickSlug } from '../../../shared/domain/BrickSlug'

export class BrickNotFoundError extends Error {
  constructor(slug: BrickSlug) {
    super(`Brick not found: "${slug.value}"`)
    this.name = 'BrickNotFoundError'
  }
}
```

- [ ] **Step 8 : Vérifier que les tests existants passent toujours**

```bash
pnpm test:run
```

Expected : PASS — 11 tests verts, aucune régression

- [ ] **Step 9 : Commit**

```bash
git add src/brick/domain/
git commit -m "feat: add brick domain types and ports"
```

---

## Task 5 : BrickApplicationService

**Files:**
- Create: `src/brick/application/BrickApplicationService.ts`
- Create: `src/brick/application/BrickApplicationService.test.ts`

- [ ] **Step 1 : Écrire les tests**

```ts
// src/brick/application/BrickApplicationService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrickApplicationService } from './BrickApplicationService'
import { BrickSlug } from '../../shared/domain/BrickSlug'
import { BrickVersion } from '../../shared/domain/BrickVersion'
import { ProjectFolder } from '../../shared/domain/ProjectFolder'
import { BrickNotFoundError } from '../domain/errors/BrickNotFoundError'
import type { BrickRegistry } from '../domain/BrickRegistry'
import type { ProjectWriter } from '../domain/ProjectWriter'
import type { BrickContext } from '../domain/BrickContext'
import type { BrickDefinition } from '../domain/BrickDefinition'
import type { Patch } from '../domain/Patch'

const emptyPatch: Patch = { files: [], dependencies: [], scripts: [] }

const mockDefinition: BrickDefinition = {
  slug: BrickSlug.of('typescript-core'),
  name: 'TypeScript Core',
  description: 'Test brick',
  availableVersions: [BrickVersion.of('5.x')],
  requiredBricks: [],
  builder: { build: () => emptyPatch },
}

const mockRegistry: BrickRegistry = {
  findBySlug: (slug) =>
    slug.equals(BrickSlug.of('typescript-core')) ? mockDefinition : undefined,
  listAll: () => [mockDefinition],
}

const context: BrickContext = {
  folder: ProjectFolder.of('/tmp/test-project'),
  projectName: 'test-project',
  packageManager: 'pnpm',
  version: BrickVersion.of('5.x'),
}

describe('BrickApplicationService', () => {
  let writer: ProjectWriter

  beforeEach(() => {
    writer = { apply: vi.fn() }
  })

  it('should list all bricks', () => {
    const service = new BrickApplicationService(mockRegistry, writer)
    const bricks = service.listBricks()
    expect(bricks).toHaveLength(1)
    expect(bricks[0].slug.value).toBe('typescript-core')
  })

  it('should apply a brick and call writer', () => {
    const service = new BrickApplicationService(mockRegistry, writer)
    service.applyBrick(BrickSlug.of('typescript-core'), context)
    expect(writer.apply).toHaveBeenCalledWith(context.folder, emptyPatch)
  })

  it('should throw BrickNotFoundError for unknown slug', () => {
    const service = new BrickApplicationService(mockRegistry, writer)
    expect(() =>
      service.applyBrick(BrickSlug.of('unknown-brick'), context)
    ).toThrow(BrickNotFoundError)
  })

  it('should throw BrickNotFoundError with the slug in the message', () => {
    const service = new BrickApplicationService(mockRegistry, writer)
    expect(() =>
      service.applyBrick(BrickSlug.of('unknown-brick'), context)
    ).toThrow('unknown-brick')
  })
})
```

- [ ] **Step 2 : Vérifier que les tests échouent**

```bash
pnpm test:run
```

Expected : FAIL — `Cannot find module './BrickApplicationService'`

- [ ] **Step 3 : Implémenter BrickApplicationService**

```ts
// src/brick/application/BrickApplicationService.ts
import type { BrickSlug } from '../../shared/domain/BrickSlug'
import type { BrickContext } from '../domain/BrickContext'
import type { BrickDefinition } from '../domain/BrickDefinition'
import type { BrickRegistry } from '../domain/BrickRegistry'
import type { ProjectWriter } from '../domain/ProjectWriter'
import { BrickNotFoundError } from '../domain/errors/BrickNotFoundError'

export class BrickApplicationService {
  constructor(
    private readonly registry: BrickRegistry,
    private readonly writer: ProjectWriter,
  ) {}

  listBricks(): BrickDefinition[] {
    return this.registry.listAll()
  }

  applyBrick(slug: BrickSlug, context: BrickContext): void {
    const definition = this.registry.findBySlug(slug)
    if (!definition) throw new BrickNotFoundError(slug)
    const patch = definition.builder.build(context)
    this.writer.apply(context.folder, patch)
  }
}
```

- [ ] **Step 4 : Vérifier que les tests passent**

```bash
pnpm test:run
```

Expected : PASS — 15 tests verts

- [ ] **Step 5 : Commit**

```bash
git add src/brick/application/
git commit -m "feat: add BrickApplicationService"
```

---

## Task 6 : InMemoryBrickRegistry

**Files:**
- Create: `src/brick/infrastructure/secondary/InMemoryBrickRegistry.ts`
- Create: `src/brick/infrastructure/secondary/InMemoryBrickRegistry.test.ts`

- [ ] **Step 1 : Écrire les tests**

```ts
// src/brick/infrastructure/secondary/InMemoryBrickRegistry.test.ts
import { describe, it, expect } from 'vitest'
import { InMemoryBrickRegistry } from './InMemoryBrickRegistry'
import { BrickSlug } from '../../../shared/domain/BrickSlug'
import { BrickVersion } from '../../../shared/domain/BrickVersion'
import type { BrickDefinition } from '../../domain/BrickDefinition'

const makeDefinition = (slug: string): BrickDefinition => ({
  slug: BrickSlug.of(slug),
  name: slug,
  description: 'test',
  availableVersions: [BrickVersion.of('1.x')],
  requiredBricks: [],
  builder: { build: () => ({ files: [], dependencies: [], scripts: [] }) },
})

describe('InMemoryBrickRegistry', () => {
  it('should find a brick by slug', () => {
    const registry = new InMemoryBrickRegistry([makeDefinition('typescript-core')])
    const found = registry.findBySlug(BrickSlug.of('typescript-core'))
    expect(found?.slug.value).toBe('typescript-core')
  })

  it('should return undefined for unknown slug', () => {
    const registry = new InMemoryBrickRegistry([makeDefinition('typescript-core')])
    expect(registry.findBySlug(BrickSlug.of('unknown'))).toBeUndefined()
  })

  it('should list all registered bricks', () => {
    const registry = new InMemoryBrickRegistry([
      makeDefinition('typescript-core'),
      makeDefinition('express'),
    ])
    expect(registry.listAll()).toHaveLength(2)
  })

  it('should return empty list when no bricks registered', () => {
    const registry = new InMemoryBrickRegistry([])
    expect(registry.listAll()).toHaveLength(0)
  })
})
```

- [ ] **Step 2 : Vérifier que les tests échouent**

```bash
pnpm test:run
```

Expected : FAIL — `Cannot find module './InMemoryBrickRegistry'`

- [ ] **Step 3 : Implémenter InMemoryBrickRegistry**

```ts
// src/brick/infrastructure/secondary/InMemoryBrickRegistry.ts
import type { BrickSlug } from '../../../shared/domain/BrickSlug'
import type { BrickDefinition } from '../../domain/BrickDefinition'
import type { BrickRegistry } from '../../domain/BrickRegistry'

export class InMemoryBrickRegistry implements BrickRegistry {
  private readonly bricks: Map<string, BrickDefinition>

  constructor(definitions: BrickDefinition[]) {
    this.bricks = new Map(definitions.map((d) => [d.slug.value, d]))
  }

  findBySlug(slug: BrickSlug): BrickDefinition | undefined {
    return this.bricks.get(slug.value)
  }

  listAll(): BrickDefinition[] {
    return Array.from(this.bricks.values())
  }
}
```

- [ ] **Step 4 : Vérifier que les tests passent**

```bash
pnpm test:run
```

Expected : PASS — 19 tests verts

- [ ] **Step 5 : Commit**

```bash
git add src/brick/infrastructure/secondary/InMemoryBrickRegistry.ts src/brick/infrastructure/secondary/InMemoryBrickRegistry.test.ts
git commit -m "feat: add InMemoryBrickRegistry adapter"
```

---

## Task 7 : FileSystemProjectWriter

**Files:**
- Create: `src/brick/infrastructure/secondary/FileSystemProjectWriter.ts`
- Create: `src/brick/infrastructure/secondary/FileSystemProjectWriter.test.ts`

- [ ] **Step 1 : Écrire les tests**

```ts
// src/brick/infrastructure/secondary/FileSystemProjectWriter.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { FileSystemProjectWriter } from './FileSystemProjectWriter'
import { ProjectFolder } from '../../../shared/domain/ProjectFolder'
import { PackageName } from '../../../shared/domain/PackageName'
import fs from 'fs'
import path from 'path'
import os from 'os'
import type { Patch } from '../../domain/Patch'

describe('FileSystemProjectWriter', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-seed-test-'))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  it('should write a file to the project folder', () => {
    const writer = new FileSystemProjectWriter()
    const patch: Patch = {
      files: [{ destination: 'tsconfig.json', content: '{"strict":true}' }],
      dependencies: [],
      scripts: [],
    }
    writer.apply(ProjectFolder.of(tmpDir), patch)
    const written = fs.readFileSync(path.join(tmpDir, 'tsconfig.json'), 'utf-8')
    expect(written).toBe('{"strict":true}')
  })

  it('should create nested directories for files', () => {
    const writer = new FileSystemProjectWriter()
    const patch: Patch = {
      files: [{ destination: 'src/domain/MyEntity.ts', content: 'export {}' }],
      dependencies: [],
      scripts: [],
    }
    writer.apply(ProjectFolder.of(tmpDir), patch)
    expect(fs.existsSync(path.join(tmpDir, 'src/domain/MyEntity.ts'))).toBe(true)
  })

  it('should create package.json with dev dependencies', () => {
    const writer = new FileSystemProjectWriter()
    const patch: Patch = {
      files: [],
      dependencies: [
        { name: PackageName.of('typescript'), version: '^5.0.0', dev: true },
      ],
      scripts: [],
    }
    writer.apply(ProjectFolder.of(tmpDir), patch)
    const pkg = JSON.parse(fs.readFileSync(path.join(tmpDir, 'package.json'), 'utf-8'))
    expect(pkg.devDependencies['typescript']).toBe('^5.0.0')
  })

  it('should create package.json with scripts', () => {
    const writer = new FileSystemProjectWriter()
    const patch: Patch = {
      files: [],
      dependencies: [],
      scripts: [{ key: 'typecheck', command: 'tsc --noEmit' }],
    }
    writer.apply(ProjectFolder.of(tmpDir), patch)
    const pkg = JSON.parse(fs.readFileSync(path.join(tmpDir, 'package.json'), 'utf-8'))
    expect(pkg.scripts['typecheck']).toBe('tsc --noEmit')
  })

  it('should merge into an existing package.json without overwriting it', () => {
    const existingPkg = { name: 'my-app', version: '1.0.0', scripts: { start: 'node index.js' } }
    fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify(existingPkg))
    const writer = new FileSystemProjectWriter()
    const patch: Patch = {
      files: [],
      dependencies: [],
      scripts: [{ key: 'typecheck', command: 'tsc --noEmit' }],
    }
    writer.apply(ProjectFolder.of(tmpDir), patch)
    const pkg = JSON.parse(fs.readFileSync(path.join(tmpDir, 'package.json'), 'utf-8'))
    expect(pkg.name).toBe('my-app')
    expect(pkg.scripts['start']).toBe('node index.js')
    expect(pkg.scripts['typecheck']).toBe('tsc --noEmit')
  })
})
```

- [ ] **Step 2 : Vérifier que les tests échouent**

```bash
pnpm test:run
```

Expected : FAIL — `Cannot find module './FileSystemProjectWriter'`

- [ ] **Step 3 : Implémenter FileSystemProjectWriter**

```ts
// src/brick/infrastructure/secondary/FileSystemProjectWriter.ts
import fs from 'fs'
import path from 'path'
import type { ProjectFolder } from '../../../shared/domain/ProjectFolder'
import type { Patch } from '../../domain/Patch'
import type { ProjectWriter } from '../../domain/ProjectWriter'

export class FileSystemProjectWriter implements ProjectWriter {
  apply(folder: ProjectFolder, patch: Patch): void {
    this.writeFiles(folder.value, patch)
    this.updatePackageJson(folder.value, patch)
  }

  private writeFiles(folderPath: string, patch: Patch): void {
    for (const file of patch.files) {
      const fullPath = path.join(folderPath, file.destination)
      fs.mkdirSync(path.dirname(fullPath), { recursive: true })
      fs.writeFileSync(fullPath, file.content, 'utf-8')
    }
  }

  private updatePackageJson(folderPath: string, patch: Patch): void {
    const pkgPath = path.join(folderPath, 'package.json')
    const existing = fs.existsSync(pkgPath)
      ? (JSON.parse(fs.readFileSync(pkgPath, 'utf-8')) as Record<string, unknown>)
      : {}

    const deps = (existing.dependencies as Record<string, string>) ?? {}
    const devDeps = (existing.devDependencies as Record<string, string>) ?? {}
    const scripts = (existing.scripts as Record<string, string>) ?? {}

    for (const dep of patch.dependencies) {
      if (dep.dev) devDeps[dep.name.value] = dep.version
      else deps[dep.name.value] = dep.version
    }
    for (const script of patch.scripts) {
      scripts[script.key] = script.command
    }

    const updated = {
      ...existing,
      ...(Object.keys(deps).length ? { dependencies: deps } : {}),
      ...(Object.keys(devDeps).length ? { devDependencies: devDeps } : {}),
      ...(Object.keys(scripts).length ? { scripts } : {}),
    }

    fs.mkdirSync(folderPath, { recursive: true })
    fs.writeFileSync(pkgPath, JSON.stringify(updated, null, 2), 'utf-8')
  }
}
```

- [ ] **Step 4 : Vérifier que les tests passent**

```bash
pnpm test:run
```

Expected : PASS — 24 tests verts

- [ ] **Step 5 : Commit**

```bash
git add src/brick/infrastructure/secondary/FileSystemProjectWriter.ts src/brick/infrastructure/secondary/FileSystemProjectWriter.test.ts
git commit -m "feat: add FileSystemProjectWriter adapter"
```

---

## Task 8 : Première brique — TypescriptBrickBuilder

**Files:**
- Create: `src/catalog/typescript/domain/TypescriptBrickBuilder.ts`
- Create: `src/catalog/typescript/domain/TypescriptBrickBuilder.test.ts`

- [ ] **Step 1 : Écrire les tests**

```ts
// src/catalog/typescript/domain/TypescriptBrickBuilder.test.ts
import { describe, it, expect } from 'vitest'
import { TypescriptBrickBuilder } from './TypescriptBrickBuilder'
import { BrickVersion } from '../../../shared/domain/BrickVersion'
import { ProjectFolder } from '../../../shared/domain/ProjectFolder'
import type { BrickContext } from '../../../brick/domain/BrickContext'

const makeContext = (version: string): BrickContext => ({
  folder: ProjectFolder.of('/tmp/test'),
  projectName: 'my-app',
  packageManager: 'pnpm',
  version: BrickVersion.of(version),
})

describe('TypescriptBrickBuilder', () => {
  it('should install typescript ^5.0.0 for version 5.x', () => {
    const patch = new TypescriptBrickBuilder().build(makeContext('5.x'))
    const tsDep = patch.dependencies.find((d) => d.name.value === 'typescript')
    expect(tsDep?.version).toBe('^5.0.0')
    expect(tsDep?.dev).toBe(true)
  })

  it('should install typescript ^4.9.0 for version 4.x', () => {
    const patch = new TypescriptBrickBuilder().build(makeContext('4.x'))
    const tsDep = patch.dependencies.find((d) => d.name.value === 'typescript')
    expect(tsDep?.version).toBe('^4.9.0')
  })

  it('should generate a tsconfig.json file', () => {
    const patch = new TypescriptBrickBuilder().build(makeContext('5.x'))
    expect(patch.files.some((f) => f.destination === 'tsconfig.json')).toBe(true)
  })

  it('should generate an eslint.config.js file', () => {
    const patch = new TypescriptBrickBuilder().build(makeContext('5.x'))
    expect(patch.files.some((f) => f.destination === 'eslint.config.js')).toBe(true)
  })

  it('should include a typecheck script', () => {
    const patch = new TypescriptBrickBuilder().build(makeContext('5.x'))
    expect(patch.scripts.some((s) => s.key === 'typecheck')).toBe(true)
  })

  it('should mark all dependencies as dev', () => {
    const patch = new TypescriptBrickBuilder().build(makeContext('5.x'))
    expect(patch.dependencies.every((d) => d.dev)).toBe(true)
  })
})
```

- [ ] **Step 2 : Vérifier que les tests échouent**

```bash
pnpm test:run
```

Expected : FAIL — `Cannot find module './TypescriptBrickBuilder'`

- [ ] **Step 3 : Implémenter TypescriptBrickBuilder**

```ts
// src/catalog/typescript/domain/TypescriptBrickBuilder.ts
import { PackageName } from '../../../shared/domain/PackageName'
import type { BrickBuilder } from '../../../brick/domain/BrickBuilder'
import type { BrickContext } from '../../../brick/domain/BrickContext'
import type { Patch } from '../../../brick/domain/Patch'

export class TypescriptBrickBuilder implements BrickBuilder {
  build(context: BrickContext): Patch {
    const tsVersion = context.version.value === '5.x' ? '^5.0.0' : '^4.9.0'

    return {
      files: [
        {
          destination: 'tsconfig.json',
          content: JSON.stringify(
            {
              extends: '@tsconfig/recommended/tsconfig.json',
              compilerOptions: { outDir: 'dist' },
            },
            null,
            2,
          ),
        },
        {
          destination: 'eslint.config.js',
          content: [
            "import eslint from '@eslint/js'",
            "import tseslint from 'typescript-eslint'",
            '',
            'export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended)',
            '',
          ].join('\n'),
        },
      ],
      dependencies: [
        { name: PackageName.of('typescript'), version: tsVersion, dev: true },
        { name: PackageName.of('@types/node'), version: '^20.0.0', dev: true },
        { name: PackageName.of('tsx'), version: '^4.0.0', dev: true },
        { name: PackageName.of('@tsconfig/recommended'), version: '^1.0.0', dev: true },
        { name: PackageName.of('eslint'), version: '^9.0.0', dev: true },
        { name: PackageName.of('@eslint/js'), version: '^9.0.0', dev: true },
        { name: PackageName.of('typescript-eslint'), version: '^8.0.0', dev: true },
      ],
      scripts: [
        { key: 'typecheck', command: 'tsc --noEmit' },
        { key: 'lint', command: 'eslint .' },
      ],
    }
  }
}
```

- [ ] **Step 4 : Vérifier que les tests passent**

```bash
pnpm test:run
```

Expected : PASS — 30 tests verts

- [ ] **Step 5 : Commit**

```bash
git add src/catalog/typescript/
git commit -m "feat: add TypescriptBrickBuilder — first catalog brick"
```

---

## Task 9 : BrickDefinition et composition root

**Files:**
- Create: `src/catalog/typescript/infrastructure/primary/TypescriptBrickDefinition.ts`
- Create: `src/brick/infrastructure/primary/container.ts`

Pas de tests sur ces fichiers : le container est du câblage pur, testé end-to-end via les API routes.

- [ ] **Step 1 : Créer TypescriptBrickDefinition**

```ts
// src/catalog/typescript/infrastructure/primary/TypescriptBrickDefinition.ts
import { BrickSlug } from '../../../../shared/domain/BrickSlug'
import { BrickVersion } from '../../../../shared/domain/BrickVersion'
import { TypescriptBrickBuilder } from '../../domain/TypescriptBrickBuilder'
import type { BrickDefinition } from '../../../../brick/domain/BrickDefinition'

export const typescriptBrickDefinition: BrickDefinition = {
  slug: BrickSlug.of('typescript-core'),
  name: 'TypeScript Core',
  description: 'Sets up TypeScript with tsconfig, eslint, and tsx',
  availableVersions: [BrickVersion.of('5.x'), BrickVersion.of('4.x')],
  requiredBricks: [],
  builder: new TypescriptBrickBuilder(),
}
```

- [ ] **Step 2 : Créer le container (composition root)**

```ts
// src/brick/infrastructure/primary/container.ts
import { BrickApplicationService } from '../../application/BrickApplicationService'
import { InMemoryBrickRegistry } from '../secondary/InMemoryBrickRegistry'
import { FileSystemProjectWriter } from '../secondary/FileSystemProjectWriter'
import { typescriptBrickDefinition } from '../../../catalog/typescript/infrastructure/primary/TypescriptBrickDefinition'

const registry = new InMemoryBrickRegistry([typescriptBrickDefinition])
const writer = new FileSystemProjectWriter()

export const brickService = new BrickApplicationService(registry, writer)
```

- [ ] **Step 3 : Vérifier que les tests existants passent**

```bash
pnpm test:run
```

Expected : PASS — 30 tests verts, aucune régression

- [ ] **Step 4 : Commit**

```bash
git add src/catalog/typescript/infrastructure/ src/brick/infrastructure/primary/container.ts
git commit -m "feat: wire TypescriptBrickDefinition into composition root"
```

---

## Task 10 : API Routes Next.js

**Files:**
- Create: `src/app/api/bricks/route.ts`
- Create: `src/app/api/bricks/[slug]/apply/route.ts`

- [ ] **Step 1 : Créer GET /api/bricks**

```ts
// src/app/api/bricks/route.ts
import { NextResponse } from 'next/server'
import { brickService } from '../../../brick/infrastructure/primary/container'

export function GET() {
  const bricks = brickService.listBricks()
  return NextResponse.json(
    bricks.map((b) => ({
      slug: b.slug.value,
      name: b.name,
      description: b.description,
      availableVersions: b.availableVersions.map((v) => v.value),
      requiredBricks: b.requiredBricks.map((s) => s.value),
    })),
  )
}
```

- [ ] **Step 2 : Créer POST /api/bricks/[slug]/apply**

```ts
// src/app/api/bricks/[slug]/apply/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { brickService } from '../../../../../brick/infrastructure/primary/container'
import { BrickSlug } from '../../../../../shared/domain/BrickSlug'
import { BrickVersion } from '../../../../../shared/domain/BrickVersion'
import { ProjectFolder } from '../../../../../shared/domain/ProjectFolder'
import { BrickNotFoundError } from '../../../../../brick/domain/errors/BrickNotFoundError'
import type { BrickContext } from '../../../../../brick/domain/BrickContext'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug: slugParam } = await params
    const body = await request.json() as {
      folder: string
      projectName: string
      packageManager: 'npm' | 'pnpm' | 'yarn'
      version: string
    }
    const slug = BrickSlug.of(slugParam)
    const context: BrickContext = {
      folder: ProjectFolder.of(body.folder),
      projectName: body.projectName,
      packageManager: body.packageManager,
      version: BrickVersion.of(body.version),
    }
    brickService.applyBrick(slug, context)
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof BrickNotFoundError) {
      return NextResponse.json({ error: (error as Error).message }, { status: 404 })
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid request' },
      { status: 400 },
    )
  }
}
```

- [ ] **Step 3 : Démarrer l'app et tester les routes manuellement**

```bash
pnpm dev
```

Dans un autre terminal :

```bash
# Lister les briques disponibles
curl http://localhost:3000/api/bricks

# Expected :
# [{"slug":"typescript-core","name":"TypeScript Core","availableVersions":["5.x","4.x"],...}]

# Appliquer la brique typescript-core
curl -X POST http://localhost:3000/api/bricks/typescript-core/apply \
  -H "Content-Type: application/json" \
  -d '{"folder":"/tmp/my-ts-project","projectName":"my-app","packageManager":"pnpm","version":"5.x"}'

# Expected : {"success":true}

# Vérifier les fichiers générés
ls /tmp/my-ts-project
# Expected : tsconfig.json  eslint.config.js  package.json

cat /tmp/my-ts-project/package.json
# Expected : devDependencies avec typescript ^5.0.0, scripts typecheck et lint
```

- [ ] **Step 4 : Vérifier que les tests unitaires passent toujours**

```bash
pnpm test:run
```

Expected : PASS — 30 tests verts

- [ ] **Step 5 : Commit**

```bash
git add src/app/api/
git commit -m "feat: add Next.js API routes for brick catalogue and apply"
```

---

## Résultat de la phase 1

À la fin de ce plan, l'outil :
- Expose `GET /api/bricks` qui retourne le catalogue (1 brique pour l'instant)
- Expose `POST /api/bricks/:slug/apply` qui génère les fichiers dans un dossier cible
- Est entièrement testé au niveau domaine/application/adapters (30 tests unitaires)
- Next.js est isolé dans `infrastructure/primary/` — le domaine n'en sait rien
- Ajouter une nouvelle brique = créer un `BrickBuilder` dans `catalog/` + l'enregistrer dans `container.ts`
