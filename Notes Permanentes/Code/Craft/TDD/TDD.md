---
tags: [SoftwareCraft, Tests, TDD]
---

TDD = Test Driven Development 
- Technique efficace pour développer des fonctionnalités complexes et permet de réduire les peurs et frustrations de par le cadre qu'il apporte

## Principes et étapes :

- TDD = écrire le test avant le code —> fixer l'objectif et définir le comportement attendu
	- Permet d'écrire le moins de code pour satisfaire un objectif 
		- Moins de code = + de maintenabilité

### Les 3 règles fondamentales : 

**1/** Écrire un test qui échoue avant d'écrire du code de production

**2/** Ne pas écrire plus de tests que nécessaire pour échouer ou ne pas compiler

**3/** Écrire que le code nécessaire pour que le test actuel marche

**4/** Tout ce qui ne compile pas est considéré comme l'étape Red, et doit donc être passé au vert

### Les étapes de développement :

Le développement d'une fonctionnalité va se faire en itérations à savoir : [[Red]], [[Green]], [[Refactor]].

⚠️ Il faut être le plus rigoureux possible lors de ces étapes et bien avancer pas à pas.

**NB :** cf [[Anatomie d'un test]]

Pour résumer l'objectif du TDD est de définir un objectif / besoin sous la forme d'un test qu'on veut faire passer au vert avec le minimum de code possible avant de passer à essayer de rendre notre code plus lisible.

En pratique, selon le contexte et le type de système qu'on développe, deux approches existent : [[TDD Outside-In vs Inside-Out]].
