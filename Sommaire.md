Index principal du vault

---

## Sections

- [[Notes Permanentes Sommaire|📚 Notes Permanentes]]
- [[AI Sommaire|🤖 AI Generated]]
- [[Notes de Lecture/Sommaire|📖 Notes de Lecture]]
- [[TODO|⌛ TODO !]]

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
WHERE length(file.inlinks) = 0 AND (length(file.outlinks) = 0 OR all(file.outlinks, (l) => contains(string(l), ".png") OR contains(string(l), ".jpg") OR contains(string(l), ".jpeg") OR contains(string(l), ".gif") OR contains(string(l), ".svg") OR contains(string(l), ".webp") OR contains(string(l), ".bmp") OR contains(string(l), ".tiff") OR contains(string(l), ".mp4") OR contains(string(l), ".mp3") OR contains(string(l), ".pdf")))
SORT file.name ASC
LIMIT 50
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
