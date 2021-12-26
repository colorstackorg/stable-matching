import cases from 'jest-in-case';

import { runStableMatching, StableMatchingArgs } from './index';

/**
 * Utility used for writing test cases with jest-in-case.
 */
export type TestObject<T = unknown, S = unknown> = {
  /**
   * Input arguments/data for a test case.
   */
  input: T;

  /**
   * Expected output for a test case.
   */
  output: S;
};

cases(
  'runStableMatching()',
  ({ input, output }: TestObject<StableMatchingArgs>) => {
    const actualResult: [number, number][] = runStableMatching(input);
    const sortedActualResult: [number, number][] = actualResult.sort();
    expect(sortedActualResult).toEqual(output);
  },
  {
    'N = 4': {
      input: {
        menteePreferences: [
          [1, 3, 0, 2],
          [2, 1, 3, 0],
          [2, 3, 0, 1],
          [2, 0, 1, 3]
        ],
        mentorPreferences: [
          [1, 3, 2, 0],
          [0, 3, 1, 2],
          [0, 2, 3, 1],
          [3, 0, 2, 1]
        ]
      },
      output: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0]
      ]
    },

    'N = 6': {
      input: {
        menteePreferences: [
          [4, 5, 1, 0, 2, 3],
          [4, 1, 2, 3, 5, 0],
          [3, 2, 5, 4, 1, 0],
          [1, 2, 4, 0, 5, 3],
          [5, 1, 4, 3, 2, 0],
          [2, 4, 1, 0, 3, 5]
        ],
        mentorPreferences: [
          [2, 1, 5, 0, 3, 4],
          [3, 2, 4, 1, 5, 0],
          [2, 0, 3, 4, 5, 1],
          [1, 2, 5, 4, 3, 0],
          [0, 5, 1, 3, 4, 2],
          [3, 2, 4, 1, 0, 5]
        ]
      },
      output: [
        [0, 4],
        [1, 3],
        [2, 2],
        [3, 1],
        [4, 5],
        [5, 0]
      ]
    }
  }
);
