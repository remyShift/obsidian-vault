Index principal du vault. Hub central vers les sous-sommaires et vues dynamiques.

---

## Sections

- [[Notes Permanentes Sommaire|📚 Notes Permanentes]]
- [[AI Sommaire|🤖 AI Generated]]
- [[Notes de Lecture/Sommaire|📖 Notes de Lecture]]
- [[TODO|⌛ TODO !]]

---

## Skills

- [[Skills/wrap/SKILL|wrap]]

---
## Activité récente

Notes modifiées ces 7 derniers jours (hors AI Generated) :

```dataview
TABLE file.mtime AS "Modifié", file.folder AS "Dossier"
FROM "" AND -"AI Generated" AND -"Sommaire"
WHERE file.mtime >= date(today) - dur(7 days)
SORT file.mtime DESC
LIMIT 15
```

---

## Notes orphelines (zéro inlink)

Notes que personne ne cite (zéro backlink entrant).
⚠️ Une note peut apparaître ici **tout en étant connectée dans la graphe** : si elle a des outlinks (elle pointe vers d'autres), la graphe la montre reliée, mais elle reste orpheline au sens "personne ne me cite". La chasse aux orphelines vise ce cas-là, c'est ce qui tue l'émergence d'un vrai graphe.

```dataview
LIST
FROM "" AND -"AI Generated" AND -"Sommaire" AND -"Notes de Lecture/Inbox"
WHERE length(file.inlinks) = 0
SORT file.name ASC
LIMIT 20
```

---

## Notes totalement déconnectées

Les vraies perdues : ni inlinks ni outlinks. Priorité absolue à rattacher manuellement au graphe.

```dataview
LIST
FROM ""
WHERE length(file.inlinks) = 0 AND (length(file.outlinks) = 0 OR all(file.outlinks, (l) => contains(l.path, ".png") OR contains(l.path, ".jpg") OR contains(l.path, ".jpeg") OR contains(l.path, ".gif") OR contains(l.path, ".svg") OR contains(l.path, ".webp") OR contains(l.path, ".bmp") OR contains(l.path, ".tiff") OR contains(l.path, ".mp4") OR contains(l.path, ".mp3") OR contains(l.path, ".pdf")))
SORT file.name ASC
LIMIT 50
```

### Debug — outlinks de la note LyonCraft

```dataview
TABLE file.inlinks, file.outlinks, file.embeds
FROM "Notes Permanentes/Contenu & Créatif/Linkedin/Posts/TODO"
WHERE file.name = "14-05-2026 retour sur LyonCraft"
```

---

## Notes à intégrer (Inbox)

Fleeting notes en attente de tri :

```dataview
TABLE file.ctime AS "Créé"
FROM "Notes de Lecture/Inbox"
WHERE !contains(file.name, "_template")
SORT file.ctime DESC
```

---

## Statistiques du vault

```dataview
TABLE length(rows) AS "Nombre"
FROM "" AND -"Sommaire"
GROUP BY file.folder AS "Dossier"
SORT length(rows) DESC
LIMIT 10
```

---

> **Note** : les queries dataview nécessitent le plugin Dataview (déjà installé) et, pour les tags, un frontmatter YAML standard. Utilise `/normalize-frontmatter {dossier}` pour migrer les notes en callout → YAML.
