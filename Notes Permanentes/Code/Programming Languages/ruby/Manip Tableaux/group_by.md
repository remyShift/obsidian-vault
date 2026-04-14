---
tags: [LangagesDeProgs, Ruby, ManipArr]
---

## group_by

Regroupe les éléments selon une clé produite par le bloc.

```ruby
[1, 2, 3, 4].group_by { |x| x.even? } # => {false => [1, 3], true => [2, 4]}
```
