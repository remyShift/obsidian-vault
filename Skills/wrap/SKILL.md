---
name: wrap
description: Triggered exclusively by the command "/wrap". Generates a French synthesis of the current conversation and writes or updates it directly into the Obsidian vault at Conversations/YYYY-MM-DD — Title.md via MCP. Always use this skill when the user types "/wrap", without exception.
---

# Wrap Skill

Generates a structured French synthesis of the current conversation and writes or updates it in the Obsidian vault.

## Trigger
Only `/wrap` — no variants.

## Output location
`AI Generated/Conversations/YYYY-MM-DD — Titre court.md`
- Date = today's date
- Title = short, descriptive, in French, reflecting the main topic

---

## Instructions

### Step 1 — Check if a file already exists for this conversation
Use the Obsidian MCP to list the contents of `AI Generated/Conversations/`.
- Look for a file that matches today's date AND whose title matches the current conversation topic.
- If a matching file exists → **update it** (go to Step 2b)
- If no matching file exists → **create it** (go to Step 2a)

**Matching logic**: same date + title that reflects the same subject. If two different conversations happened on the same day, they will have different titles — do not merge them.

### Step 2a — Create a new file
Write a new synthesis file to:
`/Users/remy_mac/Desktop/everything/Obsidian Vault/AI Generated/Conversations/YYYY-MM-DD — Titre.md`

### Step 2b — Update an existing file
Read the existing file first, then rewrite it entirely with an updated synthesis reflecting the full conversation up to this point. Do not append — rewrite the whole note so it stays coherent.

### Step 3 — Assess conversation length and depth
Evaluate the conversation before writing:
- **Short / focused** (one topic, quick exchange) → compact synthesis, 5–10 bullet points max
- **Long / multi-topic** (planning session, audit, major decisions) → full structured synthesis with all sections

### Step 4 — Write the synthesis in French

Always include:
- **Contexte** — what the conversation was about, starting point
- **Points clés** — main ideas, findings, realizations (adapted length)
- **Décisions prises** — anything that was explicitly decided

Include only if relevant:
- **Actions à faire** — concrete next steps with checkboxes
- **À intégrer dans** — which permanent notes could absorb this content

### Step 5 — Update the Conversations sommaire
- Read `/Users/remy_mac/Desktop/everything/Obsidian Vault/AI Generated/Conversations/Sommaire.md`
- In the table, check if an entry for this file already exists
- If not, add a new row: `| {YYYY-MM-DD} | [[AI Generated/Conversations/{YYYY-MM-DD} — {Titre}]] |`
- If updating an existing file, the entry should already exist — skip this step
- Rewrite the sommaire with the updated table

### Step 6 — Confirm
Tell the user whether the file was created or updated, with its exact name.

---

## Format template

```md
---
source: ai
---

# YYYY-MM-DD — Titre

**Domaine :** Code / Korea / Vie Perso / Finances / Créatif / Workflow
**Statut :** Synthèse brute → à intégrer dans les notes permanentes si pertinent

---

## Contexte
...

## Points clés
- ...

## Décisions prises
- ...

## Actions à faire
- [ ] ...

## À intégrer dans
- ...
```

---

## Rules
- Always write in French, regardless of the conversation language
- Never ask for confirmation before writing — just do it
- Adapt length to conversation depth — do not pad short conversations
- Omit sections that have no content (e.g. no action items → no "Actions à faire")
- Never merge two different conversations into the same file, even if they share the same date
- When updating, always rewrite the full note — never just append
