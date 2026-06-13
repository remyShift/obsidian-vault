---
updated: 13-06-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Dernière mise à jour
13-06-2026 — Passe `/evolve` complète + `--apply` : rapport 13-06 produit puis appliqué (3 items memory). 4 items d'audit (A1-A4) tous résolus avec Rémy.

## État du projet
- Système mémoire/vault à jour. Memory olis-lab corrigée (SKU factuellement faux réparé), nouveau sous-projet `ingredient-manager` documenté.
- Memory modifiés : `project_olis_lab.md` (M1 : 2 conventions + chantiers 12-06 + SKU Design A), `reference_olis_lab_build_traps.md` (M2 : Mongoose pluralise slug, pnpm shared→npx tsc), `MEMORY.md` (2 lignes), `project_ts_seed.md` (A1 : suppression volontaire actée).
- Memory créé : `project_ingredient_manager.md` (M3).

## Faits récents importants
- Filtre meetings `/evolve` : exclut tout meeting < dernier rapport. Dernier meeting = 01-06 < rapport 05-06 → 0 meeting ingéré cette passe.
- Les 2 chemins vault sont un symlink → pas de faux négatif sur « note absente ».
- Pattern récurrent à surveiller : recaps citant un mauvais chemin de note (A4) + frontmatter `project:` collé au cwd au lieu du contenu (A2).

## Décisions actives
- Acter les non-problèmes en memory (ex : A1 suppression volontaire ts-seed) pour couper les carry-over d'audit.
- Recaps méta vault → classés `obsidian-vault`, pas le cwd.
- `git mv` du recap 22-05 (A2) laissé en staging, non commité.

## Prochaines étapes
- Décider si on commit le `git mv` du A2 (staged).
- Envisager de resserrer `/recap` pour fiabiliser chemins de notes + frontmatter `project:`.
- Prochain `/evolve` : vendredi 20-06. La branche meetings ne se réactivera qu'avec un meeting daté après 05-06.
