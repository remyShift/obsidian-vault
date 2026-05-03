import json, os, re, unicodedata

posts_dir = "Notes Permanentes/Contenu & Créatif/Linkedin/Posts"

# --- helpers ---

def remove_accents(s):
    return ''.join(
        c for c in unicodedata.normalize('NFD', s)
        if unicodedata.category(c) != 'Mn'
    )

def clean_text(text):
    text = re.sub(r'hashtag\s*\n#(\w+)', r'#\1', text)
    text = re.sub(r'hashtag\s*#(\w+)', r'#\1', text)
    return text.strip()

STOPWORDS = {
    "je","j","tu","il","elle","nous","vous","ils","elles",
    "le","la","les","l","un","une","des","du","de","d",
    "en","a","au","aux","par","pour","sur","sous","dans",
    "avec","sans","entre","vers","chez","ce","c","ca","cela",
    "cette","ces","et","ou","mais","donc","or","ni","car",
    "est","sont","ai","as","ont","ete","etait","avoir","etre",
    "que","qui","quand","ou","si","comme","ne","pas","plus",
    "tres","bien","aussi","tout","tous","meme","mon","ma",
    "mes","ton","ta","tes","son","sa","ses","notre","votre",
    "leur","leurs","y","s","m","t","n","on","se","me","te",
    "voici","voila","bon","bref","alors","hier","semaine","jour",
    "jai","cest","suis","fait","peu",
}

def extract_word(text):
    if not text or not text.strip():
        return "post"
    cleaned = clean_text(text)
    lines = [l.strip() for l in cleaned.split('\n') if l.strip()]
    first = lines[0] if lines else ""
    first = re.sub(r'[^\w\s\'-]', ' ', first)
    first = re.sub(r'\s+', ' ', first).strip()
    words = first.split()
    for w in words:
        w_clean = remove_accents(w.lower().strip("',-.:!?"))
        w_clean = re.sub(r'[^a-z0-9]', '', w_clean)
        if len(w_clean) >= 3 and w_clean not in STOPWORDS:
            return w_clean[:20]
    return "post"

# --- load existing notes (urn → filepath) ---
urn_to_file = {}
existing_names = set()

for fname in os.listdir(posts_dir):
    if not fname.endswith('.md'): continue
    existing_names.add(fname[:-3])
    fpath = os.path.join(posts_dir, fname)
    with open(fpath, encoding='utf-8') as f:
        content = f.read()
    m = re.search(r'url:.*?(urn:li:activity:\d+)', content)
    if m:
        urn_to_file[m.group(1)] = fpath

print(f"Notes existantes avec URN : {len(urn_to_file)}")

# --- load posts ---
with open('posts.json', encoding='utf-8') as f:
    posts = json.load(f)

print(f"Posts dans JSON : {len(posts)}")

images_added = 0
images_skipped = 0
notes_created = 0
used_names = set(existing_names)

for post in posts:
    urn = post['urn']
    images = post.get('images', [])
    text = post.get('text', '')
    date_str = post['posted_date'][:10]

    # --- create note if missing ---
    if urn not in urn_to_file:
        word = extract_word(text)
        base = f"{date_str} - {word}"
        name = base
        counter = 2
        while name in used_names:
            name = f"{base}{counter}"
            counter += 1
        used_names.add(name)

        likes = post.get('likes') or 0
        comments = post.get('comments') or 0
        reposts = post.get('reposts') or 0
        impressions = post.get('impressions')
        impressions_val = impressions if impressions is not None else 'null'
        url = post.get('url', '')

        img_section = ""
        if images:
            img_section = "\n\n" + "\n".join(f"![]({img})" for img in images)

        note = f"""---
date: {date_str}
likes: {likes}
comments: {comments}
reposts: {reposts}
impressions: {impressions_val}
url: {url}
tags:
  - Linkedin
---

{clean_text(text)}{img_section}
"""
        fpath = os.path.join(posts_dir, name + ".md")
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(note)
        urn_to_file[urn] = fpath
        notes_created += 1
        continue

    # --- add images to existing note ---
    if not images:
        continue

    fpath = urn_to_file[urn]
    with open(fpath, encoding='utf-8') as f:
        content = f.read()

    # check if images already present
    if any(img[:40] in content for img in images):
        images_skipped += 1
        continue

    # append images at the end
    img_block = "\n\n" + "\n".join(f"![]({img})" for img in images)
    content = content.rstrip() + img_block + "\n"

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    images_added += 1

print(f"\n✅ {notes_created} nouvelles notes créées")
print(f"✅ {images_added} notes mises à jour avec images")
print(f"⏭️  {images_skipped} notes déjà à jour")
