type DoesMentorPreferNewMenteeArgs = {
  mentor: number;
  mentorPreferences: number[][];
  newMentee: number;
  oldMentee: number;
};

/**
 * Returns true if the mentor prefers the new mentee over the old mentee.
 * Returns false, otherwise.
 */
const doesMentorPreferNewMentee = ({
  mentor,
  mentorPreferences,
  newMentee,
  oldMentee,
}: DoesMentorPreferNewMenteeArgs): boolean => {
  for (let i = 0; i < mentorPreferences.length; i += 1) {
    // If newMentee comes before oldMentee in the list of preferences...true.
    if (mentorPreferences[mentor][i] === newMentee) return true;

    // If oldMentee comes before newMentee in the list of preferences...false.
    if (mentorPreferences[mentor][i] === oldMentee) return false;
  }

  return false;
};

type GetFirstAvailableMenteeArgs = {
  menteeStatuses: boolean[];
  N: number;
};

/**
 * Returns the # (index) that represents the first available mentee. If their
 * status is "false", they are available. If no mentee is available, return -1.
 */
const getFirstAvailableMentee = ({
  menteeStatuses,
  N,
}: GetFirstAvailableMenteeArgs): number => {
  for (let i = 0; i < N; i += 1) {
    // If menteeStatuses[i] is false, then they are available. Return the index!
    if (!menteeStatuses[i]) return i;
  }

  return -1;
};

export type StableMatchingArgs = {
  menteePreferences: number[][];
  mentorPreferences: number[][];
};

/**
 * Throws an error if:
 *  - there are no mentee preferences.
 *  - there are no mentor preferences.
 *  - the # of mentee preferences doesn't equal the # of mentor preferences.
 */
const validateStableMatchingArgs = ({
  menteePreferences,
  mentorPreferences,
}: StableMatchingArgs) => {
  if (!menteePreferences.length) {
    throw new Error("Couldn't find any mentee preferences.");
  }

  if (!mentorPreferences.length) {
    throw new Error("Couldn't find any mentor preferences.");
  }

  if (menteePreferences.length !== mentorPreferences.length) {
    throw new Error('Mentee and mentor preferences must be the same size.');
  }
};

/**
 * Returns an array of pairs in the following structure: [mentee, mentor].
 *
 * @example
 * // Returns [[0, 0], [1, 1]].
 * runStableMatching({
 *  menteePreferences: [[0, 1], [1, 0]],
 *  mentorPreferences: [[0, 1], [1, 0]]
 * })
 */
export function runStableMatching({
  menteePreferences,
  mentorPreferences,
}: StableMatchingArgs): [number, number][] {
  // Throws an error if the input is not valid.
  validateStableMatchingArgs({ menteePreferences, mentorPreferences });

  // N = # of men
  // N = # of women
  const N: number = menteePreferences.length;

  // Maps the mentor to the mentee.
  const mentorPartners: number[] = new Array(N).fill(-1);

  // If menteeStatuses[i] is false, then the mentee is available.
  // If menteeStatuses[i] is true, then the mentee is NOT available.
  const menteeStatuses: boolean[] = new Array(N).fill(false);

  // Keep track of the # of free mentees, used for while loop stop condition.
  let freeMenteeCount = N;

  while (freeMenteeCount > 0) {
    const mentee: number = getFirstAvailableMentee({ N, menteeStatuses });
    const mentor: number = menteePreferences[mentee].shift()!;
    const mentorFiance: number = mentorPartners[mentor];

    if (mentorFiance === -1) {
      mentorPartners[mentor] = mentee;
      menteeStatuses[mentee] = true;
      freeMenteeCount -= 1;
      continue;
    }

    const isNewMenteePreferred: boolean = doesMentorPreferNewMentee({
      mentor,
      mentorPreferences,
      newMentee: mentee,
      oldMentee: mentorFiance,
    });

    if (isNewMenteePreferred) {
      // Match up the mentor with the new partner.
      mentorPartners[mentor] = mentee;

      // Update statuses of the mentee (and the old "ditched" mentee).
      menteeStatuses[mentee] = true;
      menteeStatuses[mentorFiance] = false;
    }
  }

  return mentorPartners.map((mentee: number, i: number) => [mentee, i]);
}
