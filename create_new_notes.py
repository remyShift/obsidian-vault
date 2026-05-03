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
    "voici","voila","bon","bref","donc","alors","hier","today",
    "semaine","jour","mois","annee","fois","truc","chose",
    "ici","la","quoi","rien","quelque","quelques","certain",
    "certains","ceux","cet","cettes","il","c","qu","n","m",
    "he","she","they","we","i","its","it","his","her","my",
    "the","a","an","in","of","to","and","or","but","is","are",
    "was","been","do","does","did","will","would","could",
    "should","let","get","got","has","have","had","not","no",
}

def extract_word(text):
    if not text or not text.strip():
        return "post"
    cleaned = clean_text(text)
    # first non-empty line
    lines = [l.strip() for l in cleaned.split('\n') if l.strip()]
    first = lines[0] if lines else ""
    # remove emojis & special markers
    first = re.sub(r'[^\w\s\'-]', ' ', first)
    first = re.sub(r'\s+', ' ', first).strip()
    words = first.split()
    for w in words:
        w_clean = remove_accents(w.lower().strip("',-.:!?"))
        w_clean = re.sub(r'[^a-z0-9]', '', w_clean)
        if len(w_clean) >= 3 and w_clean not in STOPWORDS:
            return w_clean[:20]
    # fallback: just take second line first word
    if len(lines) > 1:
        for w in lines[1].split():
            w_clean = remove_accents(w.lower().strip("',-.:!?"))
            w_clean = re.sub(r'[^a-z0-9]', '', w_clean)
            if len(w_clean) >= 3 and w_clean not in STOPWORDS:
                return w_clean[:20]
    return "post"

def sanitize_word(w):
    w = remove_accents(w.lower())
    w = re.sub(r'[^a-z0-9]', '', w)
    return w[:20] if w else "post"

# --- load existing URNs ---
existing_urns = set()
existing_names = set()  # stems (without .md)
for fname in os.listdir(posts_dir):
    if not fname.endswith('.md'): continue
    existing_names.add(fname[:-3])
    with open(os.path.join(posts_dir, fname), encoding='utf-8') as f:
        content = f.read()
    m = re.search(r'url:.*?(urn:li:activity:\d+)', content)
    if m:
        existing_urns.add(m.group(1))

# --- load posts ---
with open('posts.json', encoding='utf-8') as f:
    posts = json.load(f)

new_posts = [p for p in posts if p['urn'] not in existing_urns]
print(f"Nouveaux posts à créer : {len(new_posts)}")

# track names used this run + existing to avoid collisions
used_names = set(existing_names)
created = []

for post in new_posts:
    date_str = post['posted_date'][:10]
    text = post.get('text', '')
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

{clean_text(text)}
"""

    filepath = os.path.join(posts_dir, name + ".md")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(note)

    # first line as summary hint
    first_line = clean_text(text).split('\n')[0][:100] if text else "—"
    created.append((date_str, name, first_line))

print(f"✅ {len(created)} notes créées\n")
print("Liste des nouveaux fichiers (pour le sommaire) :")
for date, name, hint in sorted(created):
    print(f"  {name} | {hint}")
