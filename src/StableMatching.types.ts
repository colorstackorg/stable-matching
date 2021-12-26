/**
 * Final representation of a mentee and mentor being paired together.
 * - The first number in the tuple is the mentee.
 * - The second number in the tuple is the mentor.
 */
export type Pairing = [number, number];

/**
 * Preference list represented as a 1-D array.
 * - For a mentee, this will be a list of mentors.
 * - For a mentor, this will be a list of mentees.
 */
export type PreferenceList = number[];

export type StableMatchingArgs = {
  mentees: PreferenceList[];
  mentors: PreferenceList[];
};
