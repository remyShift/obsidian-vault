---
updated: 20-06-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Dernière mise à jour
20-06-2026 — Grosse journée en 3 temps (recap unique `20-06-2026_10-58`) : (1) couche d'outils shell + helpers git fzf, (2) passe `/evolve` appliquée + durcissement du skill, note Setup Shell détaillée, (3) **migration complète zsh → fish** (fish en login shell, pnpm câblé, `.zshrc`/oh-my-zsh supprimés).

## État du projet
- **Shell** : migration zsh → fish terminée. fish = login shell (`chsh`, ajouté à `/etc/shells`), `.zshrc` + oh-my-zsh + tous les reliquats zsh supprimés. Ne reste que `.zshenv` (cargo + shims mise). État final documenté dans `Notes Permanentes/Code/Setup Shell.md` (16 outils + alias/fonctions maison).
- **Harnais vault** stable et durci : `vault-rag` + `/coach` + `/improve` + `/evolve` (audit renforcé) + `/wrap` (cadratins nettoyés).
- Dotfiles sous chezmoi → repo privé `remyShift/dotfiles`, tout au Brewfile.

## Faits récents importants
- Écriture vault : toujours `Write` (filesystem), jamais `mcp__obsidian__*` (bug latin1).
- **Jamais de `Co-Authored-By`/mention IA** dans les commits.
- **Ne pas tout mettre en memory** (feedback Rémy) : un faux positif d'audit se reclasse dans le rapport `/evolve` (section `Audit clos`), pas dans un memory.
- **`.zshenv` porte les shims mise** → l'outil Bash de Claude résout node par dossier (olis-lab → 20) sans `nvm use`. A résolu 2 pièges build olis-lab (Node 20 + `rm -i` qui hangeait via oh-my-zsh).
- `chezmoi git -- <cmd>` = git dans la source chezmoi sans `cd`.

## Décisions actives
- Skill `/evolve` durci (4 patches) : Phase 1a relit les items `Audit clos` du dernier rapport (par sujet), Axe C croise les memory avant de crier « travail perdu ». À valider au prochain run.
- A1 (docs ts-seed supprimés volontairement) et A4 (notes ingredient-manager dans `Scientific/Rating Tool/`) = faux positifs clos.

## Prochaines étapes
- **Commiter + pusher les dotfiles** (pas fait) : `chezmoi git -- add -A && commit && push`. 3 changements en attente (config.fish pnpm, suppr dot_zshrc, ajout dot_zshenv).
- Au prochain `/evolve` : confirmer que A1/A4 ne remontent plus.
- Reliquat Rémy (19/06) : sudo python.org, rotation mdp Mongo Atlas, suppr backup `~/shell-migration-backup-*`, tester `/coach`.
- Optionnel shell : `yazi` ou pimper `starship.toml` Dracula. Vault : promouvoir `Notes de Lecture/Code/` (A3).
