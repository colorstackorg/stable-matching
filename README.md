# Stable Matching (Gale-Shapley)

This is a Typescript implementation of the Gale-Shapley algorithm, which finds
a stable matching between two equally sized sets of elements given an ordering
of preferences for each element.

## Naming Variation

The stable-matching problem is also called the "Stable Marriage" problem, and
that's because for years, the example used to solve the problem was marrying
a man to a woman. The man/woman terminology is not one that's inclusive so
in my implementation we'll use the following:

- `mentee` - Maps to `man` in traditional example.
- `mentor` - Maps to `woman` in traditional example.
