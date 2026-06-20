---
updated: 20-06-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Dernière mise à jour
20-06-2026 — Passe `/evolve` complète + appliquée (memory olis-lab rafraîchis, note Setup Shell créée), durcissement du skill evolve contre les faux positifs d'audit, et enrichissement détaillé de la note Setup Shell. Même journée que le setup shell du matin (recap unique `20-06-2026_10-58`).

## État du projet
- **Setup shell** : état final consigné dans `Notes Permanentes/Code/Setup Shell.md` (renommée/déplacée par Rémy, ex « Setup Shell Mac » dans Vie Perso). 16 outils détaillés (commandes + exemples) + section « Alias et fonctions maison » tirée de la vraie conf fish (`aliases.fish` + `gum.fish`).
- **Harnais vault** stable et durci : `vault-rag` (sémantique local ~1003 docs) + `/coach` + `/improve` + `/evolve` (audit renforcé) + `/wrap` (cadratins nettoyés).
- Dotfiles sous chezmoi → repo privé `remyShift/dotfiles`, tout au Brewfile.

## Faits récents importants
- Écriture vault : toujours `Write` (filesystem), jamais `mcp__obsidian__*` (bug latin1).
- **Jamais de `Co-Authored-By`/mention IA** dans les commits.
- **Ne pas tout mettre en memory** (feedback Rémy) : un faux positif d'audit se reclasse dans le rapport `/evolve` (section `Audit clos`), pas dans un memory. Les rapports SONT le registre d'état.
- Alias réels : `find`→fd et `cat`→bat SONT aliasés ; `rg`/`xh` non (commandes en plus).

## Décisions actives
- Skill `/evolve` durci (4 patches `~/.claude/commands/evolve.md`) : Phase 1a relit les items `Audit clos` du dernier rapport (par sujet, pas par ID), Axe C croise les memory avant de crier « travail perdu ». À valider au prochain run.
- A1 (docs ts-seed supprimés volontairement) et A4 (notes ingredient-manager dans `Scientific/Rating Tool/`) = faux positifs clos définitivement.

## Prochaines étapes
- Au prochain `/evolve` : confirmer que A1/A4 ne remontent plus.
- Optionnel : ajouter le bloc PATH/env de `config.fish` à la note Setup Shell ; promouvoir `Notes de Lecture/Code/` (audit A3 manuel).
- Optionnel shell : `yazi` (+ câblage zoxide/fzf) ou pimper `starship.toml` Dracula.
