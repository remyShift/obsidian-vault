---
tags:
  - LangagesDeProgs
  - Ruby
---

## select

Filtre les éléments selon une condition donnée --> **retourne un nouveau tableau**

```ruby
[1, 2, 3, 4].select { |x| x.even? } # => [2, 4]
```

## reject

Filtre les éléments en excluant ceux qui correspondent à une condition. --> **retourne un nouveau tableau**

```ruby
[1, 2, 3, 4].reject { |x| x.even? } # => [1, 3]
```
