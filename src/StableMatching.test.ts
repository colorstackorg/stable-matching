import cases from 'jest-in-case';

import StableMatching from './StableMatching';
import {
  StableMatchingArgs,
  StableMatchingPairing,
} from './StableMatching.types';

export type TestObject<InputType, OutputType> = {
  input: InputType;
  output: OutputType;
};

cases(
  'StableMatching.run()',
  ({
    input,
    output,
  }: TestObject<StableMatchingArgs, StableMatchingPairing[]>) => {
    const actualResult: [number, number][] = new StableMatching(input).run();
    const sortedActualResult: [number, number][] = actualResult.sort();
    expect(sortedActualResult).toEqual(output);
  },
  {
    'N = 4': {
      input: {
        mentees: [
          [1, 3, 0, 2],
          [2, 1, 3, 0],
          [2, 3, 0, 1],
          [2, 0, 1, 3],
        ],
        mentors: [
          [1, 3, 2, 0],
          [0, 3, 1, 2],
          [0, 2, 3, 1],
          [3, 0, 2, 1],
        ],
      },
      output: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
    },

    'N = 6': {
      input: {
        mentees: [
          [4, 5, 1, 0, 2, 3],
          [4, 1, 2, 3, 5, 0],
          [3, 2, 5, 4, 1, 0],
          [1, 2, 4, 0, 5, 3],
          [5, 1, 4, 3, 2, 0],
          [2, 4, 1, 0, 3, 5],
        ],
        mentors: [
          [2, 1, 5, 0, 3, 4],
          [3, 2, 4, 1, 5, 0],
          [2, 0, 3, 4, 5, 1],
          [1, 2, 5, 4, 3, 0],
          [0, 5, 1, 3, 4, 2],
          [3, 2, 4, 1, 0, 5],
        ],
      },
      output: [
        [0, 4],
        [1, 3],
        [2, 2],
        [3, 1],
        [4, 5],
        [5, 0],
      ],
    },
  }
);
