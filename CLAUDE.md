Ce fichier oriente toute instance de Claude qui travaille dans ce vault Obsidian. Lis-le avant d'écrire, de déplacer ou de relier la moindre note.

---

## Ce qu'est ce vault

Un système de connaissance personnel à la Zettelkasten, qui couvre quatre territoires :

- **Code & craft** : notes techniques, patterns, langages, veille
- **Projets** : surtout Oli's Lab (mission freelance en cours)
- **Vie perso** : daily notes, finances, apprentissage du coréen, projet Corée
- **Contenu** : LinkedIn (ligne éditoriale, posts), talks

Le vault n'est pas un dépotoir. Discipline avant automatisation. Les commandes sont manuelles par choix, pour rester maître de ce qui est conservé.

---

## Carte des dossiers (racine)

```
Sommaire.md                  → index principal du vault (point d'entrée)
Notes Permanentes/           → le cœur : notes durables, atomiques, reliées
Notes de Lecture/            → entrées brutes (Inbox) en attente de tri
AI Generated/                → tout ce que Claude produit (jamais mélangé au reste)
Skills/                      → skills réutilisables (un dossier par skill)
Images/                      → médias
CLAUDE.md                    → ce fichier
```

### Notes Permanentes/

```
Code/            → Agilité, Craft, Dev Knowledge, Programming Languages, Veille
Contenu & Créatif/  → Linkedin (ligne éditoriale + Posts/), LyonCraft
Projets/         → Oli's Lab, KicksFolio, TS-Seed
Vie Perso/       → Daily, Finances, Korea, Ma vie, Quotes, Workflow Claude + Obsidian
```

### AI Generated/

```
Sessions/{projet}/   → recaps Claude Code par projet (/recap)
Conversations/       → synthèses de chat (/wrap)
Evolve Reports/      → rapports hebdo (/evolve)
```

---

## Le système de sommaires (discipline non négociable)

Chaque grande section a un fichier `Sommaire*.md` qui sert d'index. C'est la colonne vertébrale de la navigation. Le `Sommaire.md` racine pointe vers les sommaires de section, qui pointent vers les notes.

Sommaires actifs à connaître :

- `Sommaire.md` (racine, avec queries Dataview : activité récente, orphelines, stats)
- `Notes Permanentes/Notes Permanentes Sommaire.md`
- `AI Generated/AI Sommaire.md`
- `AI Generated/Conversations/Sommaire.md` (table Date | Titre)
- `AI Generated/Sessions/Sommaire.md`
- `Notes de Lecture/Sommaire.md`
- `Notes Permanentes/Projets/Oli's Lab/Meetings/Sommaire Meetings.md` (table groupée par thème)
- `Notes Permanentes/Projets/Oli's Lab/Meetings/Tech Weeklies/Sommaire Tech Weeklies.md`
- `Notes Permanentes/Contenu & Créatif/Linkedin/Sommaire LinkedIn.md`

**Règle :** quand tu ajoutes une note dans une section qui a un sommaire, tu mets le sommaire à jour dans la foulée. Une note ajoutée sans entrée dans son sommaire est une note à moitié faite.

---

## Conventions de nommage

- **Tiret dans les noms de fichiers : toujours le tiret simple `-`, jamais le cadratin `—`.** (Certaines vieilles notes utilisent encore `—`, on ne les renomme pas, mais toute nouvelle note suit le tiret simple.)
- **Meeting notes Oli's Lab** : `DD-MM-YYYY Titre descriptif.md`
- **Conversations (/wrap)** : `DD-MM-YYYY - Titre court.md`
- **Sessions (/recap)** : dans `AI Generated/Sessions/{projet}/`
- **Daily notes** : `DD-MM-YYYY.md`, rangées dans `Vie Perso/Daily/YYYY/Mois/`
- **Posts LinkedIn** : `Posts/YYYY/MM-Mois/`, avec un dossier `TODO` pour les posts publiés en attente de stats
- **Skills** : `Skills/<nom>/SKILL.md`

---

## Frontmatter

Format YAML standard (pas de callout). Conventions observées :

- Tag de section quand pertinent : `tags: [olis-lab]`, `tags: [Perso]`, `tags: [inbox]`
- Notes dans `AI Generated/` : `source: ai` dans le frontmatter
- Notes permanentes structurées : `date`, `type`, `projet` quand utile
- Fleeting notes (Inbox) : `created`, `type: fleeting`, `status: to-process`, `tags: [inbox]`

Dataview lit le frontmatter YAML. Si une note utilise encore l'ancien format callout, la migrer en YAML (commande `/normalize-frontmatter {dossier}`).

---

## Méthodologie

Flux Zettelkasten :

1. **Capture brute** → `Notes de Lecture/Inbox/` (fleeting, `/capture`)
2. **Tri** → garder / promouvoir en note permanente / supprimer
3. **Atomisation** → une note = une idée, reliée aux autres par wikilinks
4. **Connexion** → chasser les orphelines (le `Sommaire.md` racine a des queries Dataview pour ça)

Une note orpheline (zéro backlink entrant) tue l'émergence du graphe. Quand tu crées une note permanente, relie-la à au moins une note existante pertinente.

---

## Règles AI Generated

- Tout ce que Claude génère va dans `AI Generated/`, jamais mêlé aux notes manuelles.
- **Aucune note dans `AI Generated/` ne doit référencer ni linker une note Obsidian.** Ce sont des sorties brutes, pas des nœuds du graphe.
- Frontmatter `source: ai`.
- Synthèses en français, longueur adaptée à la profondeur réelle de l'échange. Ne pas gonfler une conversation courte.

---

## Skills & commandes

Skills dans `Skills/<nom>/SKILL.md`, déclenchés par une commande slash décrite dans le frontmatter.

Commandes actives :

- `/recap` : résumé session Claude Code → `AI Generated/Sessions/{projet}/`
- `/wrap` : synthèse conversation → `AI Generated/Conversations/` (+ MAJ du sommaire)
- `/evolve` : analyse hebdo → `AI Generated/Evolve Reports/`
- `/capture` : note rapide → `Notes de Lecture/Inbox/`
- `/coach` : sparring partner Radical Candor câblé sur le vault → séance dans `AI Generated/Coaching/`
- `/improve` : traite le backlog de frictions du harnais (`Vie Perso/Harnais Backlog.md`) → propose et applique les améliorations
- `/post` : assistant de création de post LinkedIn (charge la ligne éditoriale + 5 derniers posts)
- `/normalize-frontmatter {dossier}` : migration callout → YAML

Autres skills présents : `defuddle`, `json-canvas`, `obsidian-bases`, `obsidian-cli`, `obsidian-markdown`.

---

## Outillage

- Accès au vault via MCP. **Préférer les outils `vault:` pour toute lecture/écriture.** Ne basculer sur `obsidian:` que si `vault:` est indisponible.
- Plugin **Dataview** installé : les sommaires l'utilisent (tables, listes d'orphelines, stats). Le frontmatter doit rester en YAML standard pour que les queries marchent.
- Architecture : MCP entre Claude Code et Obsidian (plugin MCP Tools + Local REST API), config dans `~/.claude.json`. symdex en MCP global.
- Hook SessionStart : charge les 3 sessions AI Generated les plus récentes du projet courant.

---

## Recherche sémantique (RAG)

Serveur MCP `vault-rag` (global, moteur local in-process, index sur tout le vault). Découpe chaque note en chunks par section et retrouve les passages les plus proches **par le sens** (pas par mot-clé). Marche en cross-lingue (question en français sur une note en anglais).

Routing :

- **Question sémantique / transverse** ("qu'est-ce que je sais sur X", "où ai-je parlé de Y") → `mcp__vault-rag__search_vault` d'abord, puis lire les notes remontées.
- **Navigation exacte** (chemin connu, date précise) → `Read`, pas de RAG.
- **Mot-clé exact** (nom propre, identifiant, slug) → `Grep`, pas de RAG.
- Tools dispo : `search_vault`, `get_document`, `list_documents`, `vault_stats`, `reindex`. L'index se met à jour tout seul (watcher session ouverte + reindex incrémental au démarrage).

**Fail-loud (non négociable) :** si les tools `vault-rag` sont indisponibles ou renvoient une erreur, le dire **explicitement** ("RAG indisponible, je ne peux pas interroger le vault") et **refuser** de répondre depuis la culture générale. Une réponse plausible mais hors-vault, en se faisant passer pour une réponse du vault, est pire qu'un échec annoncé.

---

## Règles dures

- Français partout.
- **Jamais de tiret cadratin `—`. Utiliser `-` ou reformuler.** Vaut pour les noms de fichiers comme pour le contenu.
- Pas de conclusion moralisatrice ajoutée d'office, pas de prose trop lisse, pas d'emojis en rafale. Le vault sonne comme Rémy, pas comme une IA.
- Mettre à jour le sommaire de la section dès qu'on y ajoute une note.
- Ne jamais écraser une note permanente sans la relire d'abord.
- Discipline > automatisation : ne pas créer de notes que personne n'a demandées.

---

## Projet principal : Oli's Lab

Point d'entrée : `Notes Permanentes/Projets/Oli's Lab/Intro Oli's Lab.md` (équipe, stack, archi DB, process, philosophie produit). À lire avant toute tâche liée à Oli's Lab.

Repères rapides :

- Stack legacy : CRA + React, Jotai, React Query, Node/Express, MongoDB, AWS Lambda
- Cible : Next.js (App Router), API v2 TypeScript, Payload CMS
- Pas de TypeScript ni de tests sur le legacy : dette technique réelle. Traiter "on ajoutera les tests plus tard" comme un drapeau rouge.
- Priorité produit : le scientifique (rating, recommandation) prime sur l'e-commerce standard.
