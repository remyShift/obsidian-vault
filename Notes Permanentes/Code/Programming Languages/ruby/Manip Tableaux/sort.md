> [!info]- Tags
> #LangagesDeProgs #Ruby #ManipArr 

## sort

Trie les éléments du tableau dans l’ordre croissant.

```ruby
[3, 1, 2].sort # => [1, 2, 3]
```


## sort_by

Trie un tableau en fonction d'un critère personnalisé défini dans un bloc.

```ruby
[3, 1, 4, 1, 5, 9].sort_by { |x| x }
# => [1, 1, 3, 4, 5, 9]
```

```ruby
["apple", "banana", "pear", "kiwi"].sort_by { |word| word.length }
# => ["pear", "kiwi", "apple", "banana"]
```
