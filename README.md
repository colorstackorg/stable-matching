# Stable Matching (Gale-Shapley)

This is a Typescript implementation of the Gale-Shapley algorithm, which finds
a stable matching between two equally sized sets of elements given an ordering
of preferences for each element.

## Installation

To install this package:

```
npm install @colorstack/stable-matching --save
```

## Example Usage

```ts
import StableMatching, {
  Pairing,
  PreferenceList,
} from '@colorstack/stable-matching';

const mentees: PreferenceList[] = [
  [1, 3, 0, 2],
  [2, 1, 3, 0],
  [2, 3, 0, 1],
  [2, 0, 1, 3],
];

const mentors: PreferenceList[] = [
  [1, 3, 2, 0],
  [0, 3, 1, 2],
  [0, 2, 3, 1],
  [3, 0, 2, 1],
];

const matching: StableMatching = new StableMatching({
  mentees,
  mentors,
});

const pairings: Pairing[] = matching.run();

// [[0, 1], [1, 3], [2, 2], [3, 0]]
console.log(pairings);
```

## Naming Variation

The "Stable Matching" problem is also called the "Stable Marriage" problem, and
that's because for years, the example used to solve the problem was marrying
a man to a woman. The man/woman terminology is not one that's inclusive so
in my implementation we'll use the following:

- `mentee` - Maps to `man` in traditional example.
- `mentor` - Maps to `woman` in traditional example.
