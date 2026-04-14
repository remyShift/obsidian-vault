# Sommaire

Index principal du vault. Hub central vers les sous-sommaires et vues dynamiques.

---

## Sections

- [[Notes Permanentes Sommaire|📚 Notes Permanentes]]
- [[AI Sommaire|🤖 AI Generated]]
- [[Notes de Lecture/Sommaire|📖 Notes de Lecture]]

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

## Notes orphelines

Notes sans backlink (candidates à intégrer au graphe via `/link`) :

```dataview
LIST
FROM "" AND -"AI Generated" AND -"Sommaire"
WHERE length(file.inlinks) = 0
SORT file.name ASC
LIMIT 20
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
