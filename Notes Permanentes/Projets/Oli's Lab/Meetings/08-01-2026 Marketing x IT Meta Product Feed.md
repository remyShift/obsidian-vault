---
date: 2026-01-08
type: meeting
projet: Oli's Lab
tags:
  - marketing
  - meta
  - product-feed
  - google-merchant
  - tiktok
  - olis-lab
participants:
  - Rémy
  - Michele
  - Nicolas
  - Juliette
  - Suze
  - Diego
lien: https://www.notion.so/olislab/Marketing-x-IT-2e24bf4c7fa180fb8d56f8f9de5bf328?pvs=189#2e24bf4c7fa180a48e3ec9c96ff6d4ee
---

# Meeting : Marketing x IT - Meta Product Feed

---

## Contexte

Meeting initié pour traiter un problème de Google Analytics avec Nicolas et Rémy. Juliette a été ajoutée pour une question sur les produits Facebook Shop, puis le scope s'est élargi avec Suze et Diego.

---

## Problème 1 : tags produits perdus sur Meta

Juliette rencontre deux problèmes avec ses posts Meta (Facebook / Instagram) :

- Les posts programmés à l'avance perdent leurs tags produits quand ils passent en live, ce qui l'oblige à les refaire manuellement depuis l'app.
- Les listes de produits proposées par Meta pour taguer sont incomplètes : les nouveaux produits (F Miller, Pink Wonder, Faceline) sont absents, seuls les anciens comme Grown Alchemist apparaissent.

---

## Cause racine : feed produit statique et obsolète

La connexion entre Meta et le feed produit automatique a lâché il y a environ 1 à 1,5 mois. En attendant, l'équipe a mis en place un Google Sheet statique exporté en novembre comme solution temporaire.

Résultat : Meta dispose de 157 produits alors que le site en liste environ 180. Les 23 manquants sont les nouveaux produits non ajoutés au sheet.

---

## Problème 2 : incohérence de langue dans le catalogue

Le catalogue Meta actuel est entièrement en français (mis en place par Nicolas pour ses campagnes ads). Juliette crée ses posts en anglais mais les produits linkés sont en français, ce qui crée une incohérence visible.

---

## Solution court terme (2 mois)

Rémy exporte deux feeds séparés depuis Google Merchant Center (qui est à jour avec 180 produits) :

- **Feed français** : mise à jour du Google Sheet existant avec les nouveaux produits
- **Feed anglais** : nouveau Google Sheet avec les noms en anglais

Nicolas configure ensuite le nouveau feed anglais côté Meta et notifie Juliette quand elle peut commencer à l'utiliser pour ses posts organiques.

Cette approche manuelle est acceptable car très peu de nouveaux produits sont attendus dans les 2 prochains mois (1 à 2 SKUs max : potentiellement le F Miller Eye product et les Verso exosomes).

Rémy enregistre également un tutoriel sur la procédure de mise à jour du feed, à déposer sur Notion pour que Nicolas puisse le refaire seul.

---

## Solution long terme

Automatisation complète du feed produit, similaire à ce qui existe déjà sur Google Merchant Center. Michele mentionne la réactivation de l'endpoint sitemap côté backend (généré depuis MongoDB) comme brique de base pour cette automatisation. Cible : dans les 2 mois.

---

## Discussion : TikTok Shop (roadmap 2026)

Nicolas explore TikTok Shop comme projet 2026. Points clés :

- Fonctionnement similaire à Instagram Shop : posts organiques avec tags produits + shop intégré
- TikTok prend 5% de commission sur les ventes
- Nécessite de sélectionner un pays pour démarrer (France en premier)
- Côté technique : TikTok aura besoin d'un endpoint backend pour transmettre les commandes et les connecter au warehouse et à BigBlue
- Nicolas prépare une liste de questions et planifie un call avec l'équipe TikTok avant fin Q1
- Louis (ex-Horace, expérience TikTok Shop) pourrait être une ressource utile à consulter

---

## Signature email

L'équipe souhaite une signature email professionnelle avec le branding Oli's Lab. L'ancienne version ne fonctionnait pas bien sur tous les clients mail. Michele va créer un template simple (logo à gauche, infos à droite) compatible avec la majorité des clients, et l'envoyer à toute l'équipe.

---

## Actions

- [ ] **Rémy** - Exporter les produits depuis Google Merchant Center et mettre à jour le Google Sheet français existant avec les nouveaux produits
- [ ] **Rémy** - Créer un nouveau Google Sheet avec le feed anglais et envoyer le lien à Nicolas
- [ ] **Rémy** - Enregistrer un tutoriel sur la mise à jour du feed et le déposer sur Notion
- [ ] **Nicolas** - Conserver le feed français existant opérationnel sur Meta
- [ ] **Nicolas** - Configurer le nouveau feed anglais sur Meta et notifier Juliette quand disponible
- [ ] **Nicolas** - Compiler les questions TikTok Shop et planifier un call avec l'équipe TikTok (avant fin Q1)
- [ ] **Michele** - Créer et envoyer les signatures email professionnelles à toute l'équipe
