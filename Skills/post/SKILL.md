---
name: post
description: Triggered exclusively by the command "/post". Helps Rémy create a LinkedIn post. Loads his editorial line and his 5 most recent posts as context, proposes 3 post ideas, then either proposes 3 new ideas or drafts the chosen one, all in French. Always use this skill when the user types "/post", without exception.
---
# Post Skill

Assistant de création de posts LinkedIn pour Rémy. Charge sa ligne éditoriale et ses 5 derniers posts, propose des idées, puis rédige selon son choix.

## Trigger
Only `/post` — no variants.

## CRITICAL — Correct full paths
**Always use these exact base paths for every read operation:**
- Ligne éditoriale : `/Users/remy_mac/Desktop/everything/Obsidian Vault/Notes Permanentes/Contenu & Créatif/Linkedin/Ligne éditoriale.md`
- Dossier des posts : `/Users/remy_mac/Desktop/everything/Obsidian Vault/Notes Permanentes/Contenu & Créatif/Linkedin/Posts/`
- Index (secours) : `/Users/remy_mac/Desktop/everything/Obsidian Vault/Notes Permanentes/Contenu & Créatif/Linkedin/Sommaire LinkedIn.md`

Use `vault:` MCP tools for all reads. Do not use `obsidian:` tools unless `vault:` is unavailable.

---

## Instructions

### Step 1 — Charger le contexte (toujours, silencieusement)

1. Lire la ligne éditoriale en entier. C'est la référence absolue pour le positionnement, les 4 piliers, la voix, la forme, le principe du "dernier mot" et ce qu'il ne faut pas poster.
2. Identifier les 5 posts les plus récents :
   - Lister tous les `.md` du dossier `Posts/` (récursif, motif `**/*.md`).
   - Chaque fichier commence par une date au format `DD-MM-YYYY` dans son nom.
   - Trier ces dates en ordre décroissant et garder les 5 plus récentes.
   - Lire le contenu de ces 5 fichiers.
   - En cas de doute sur l'ordre, croiser avec la fin de la table chronologique du `Sommaire LinkedIn.md` (les dernières lignes sont les plus récents).

Ne pas commenter cette étape, ne pas réciter les chemins, juste enchaîner sur l'étape 2.

### Step 2 — Proposer 3 idées

Proposer 3 idées de post distinctes, en français, alignées sur la ligne éditoriale (les 4 piliers).
- Le lien avec les 5 derniers posts n'est pas requis. En revanche, utiliser ces 5 posts pour **éviter de répéter** un sujet trop récent.
- Varier les piliers entre les 3 idées quand c'est possible.
- Format pour chaque idée, court et lisible :
  - **Titre / angle** en une ligne
  - L'accroche pressentie ou la tension du post en une phrase
  - Le pilier servi (entre parenthèses)

Terminer en demandant : soit il choisit une idée à rédiger, soit il demande 3 nouvelles idées.

### Step 3 — Brancher selon le choix

- **S'il demande 3 nouvelles idées** ("encore", "3 autres", "non, autre chose"...) : régénérer 3 idées fraîches, différentes des précédentes, et reproposer le même choix. Boucler autant de fois que nécessaire.
- **S'il choisit une idée** (ex. "écris la 2", "vas-y sur la première") : rédiger le post complet (étape 4).

### Step 4 — Rédiger le post

Écrire un brouillon de post LinkedIn en français qui sonne comme Rémy. Respecter strictement la voix et la forme de la ligne éditoriale :
- Première personne, ton parlé, tutoiement du lecteur quand c'est naturel.
- Ouverture sur un hook : une question ou une affirmation qui pique. Pas d'introduction molle.
- Clôture sur une question ouverte qui invite au commentaire.
- Jamais de comparatif de langages ou de frameworks.
- Ton de quelqu'un qui pratique et partage, jamais de sachant.

**Anti-tics d'IA (non négociable, c'est sa marque) :**
- Jamais de tiret cadratin « — ». Utiliser « - » ou reformuler.
- Pas de conclusion moralisatrice ajoutée d'office.
- Pas de phrase trop lisse, trop symétrique, qui ne lui ressemble pas.
- Pas d'emojis en rafale décorative. S'il y en a, sobres et utiles.

Présenter le résultat comme un **brouillon de base**, pas comme un texte final : c'est lui qui a le dernier mot, relit et retravaille. Après l'avoir donné, proposer de l'ajuster (longueur, ton, accroche) s'il le souhaite.

---

## Rules
- Always write in French, regardless of the conversation language.
- La ligne éditoriale prime sur tout. En cas de doute, s'y référer.
- Ne jamais écrire ni archiver le post dans le dossier `Posts/` : l'archivage se fait après publication, avec l'URL et les stats, via le template existant. Ce skill produit le brouillon dans la conversation uniquement.
- Ne pas mentir sur l'origine du texte : le brouillon est une base, pas un texte fini.
- Never use this '—' prefer use '-'.
- Adapter la longueur du post au sujet, ne pas gonfler artificiellement.
