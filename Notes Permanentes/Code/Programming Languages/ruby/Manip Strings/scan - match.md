---
tags:
  - LangagesDeProgs
  - Ruby
---

## scan(motif)

Trouve toutes les correspondances d'un motif et les renvoie sous forme de tableau.

```ruby
"hello".scan(/\w/) # => ["h", "e", "l", "l", "o"]
```

## match(motif)

Effectue une recherche par expression régulière et renvoie un objet de correspondance.

```ruby
"hello".match(/el/) # => #<MatchData "el">
```
