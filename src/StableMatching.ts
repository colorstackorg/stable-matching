import {
  Pairing,
  PreferenceList,
  StableMatchingArgs,
} from './StableMatching.types';

export default class StableMatching {
  public readonly mentees: PreferenceList[];

  public readonly mentors: PreferenceList[];

  /**
   * The # of mentees that are not currenlty assigned to a mentor.
   *
   * When this value is 0, that means the algorithm will be finished running.
   *
   * @default this.mentees.length
   */
  private freeMenteeCount: number;

  /**
   * List of availabilities per mentee that let's us know whether or not the
   * mentee is currently taken or not.
   *
   * For example, if menteesStatuses[1] is false, that means the second mentee
   * is currently available.
   *
   * Defaults to an array of size N with all values being false.
   */
  private menteeStatuses: boolean[];

  /**
   * List of partners (mentees) that each mentor has. If the mentor at index
   * i is NOT currently paired with a mentee, the value of mentorPartners[i]
   * will be -1.
   *
   * For example, if mentorPartners[1] is 5, then the second mentor is
   * currently paired with the sixth mentee.
   *
   * Defaults to an array of size N with all values being -1.
   */
  private mentorPartners: number[];

  constructor({ mentees, mentors }: StableMatchingArgs) {
    this.mentees = mentees;
    this.mentors = mentors;

    this.validate();

    const N: number = this.mentees.length;

    this.menteeStatuses = new Array(N).fill(false);
    this.mentorPartners = new Array(N).fill(-1);

    this.freeMenteeCount = N;
  }

  public run(): Pairing[] {
    while (this.freeMenteeCount > 0) {
      const mentee: number = this.getFirstAvailableMentee();
      const menteePreferences: PreferenceList = this.mentees[mentee];
      const mentor: number = menteePreferences.shift()!;
      const mentorPartner: number = this.mentorPartners[mentor];

      // If the mentor doesn't currently have a partner, then assign the
      // first available mentee to this mentor!
      if (mentorPartner === -1) {
        this.pairUp(mentee, mentor);
        this.freeMenteeCount -= 1;

        continue;
      }

      const isNewMenteePreferred: boolean = this.prefersNewMentee(
        mentor,
        mentorPartner,
        mentee
      );

      // If the mentor is currenlty taken by a mentee, but they prefer this
      // new mentee, let's match them up!
      if (isNewMenteePreferred) {
        this.pairUp(mentee, mentor);

        // The old mentee now doesn't have a match anymore...so we have to mark
        // them as available.
        this.menteeStatuses[mentorPartner] = false;
      }
    }

    const pairings: Pairing[] = this.mentorPartners.map(
      (mentee: number, mentor: number) => {
        return [mentee, mentor];
      }
    );

    return pairings;
  }

  /**
   * Pairs the mentee and mentor together and updates the mentee's availability.
   *
   * @param mentee - Mentee to pair the mentor with.
   * @param mentor - Mentor to pair the mentee with.
   */
  private pairUp(mentee: number, mentor: number): void {
    this.mentorPartners[mentor] = mentee;
    this.menteeStatuses[mentee] = true;
  }

  /**
   * Returns the first mentee who is not currently in a partnership with
   * another mentor.
   *
   * If all mentees are currenlty assigned to a mentor, this will return -1.
   */
  private getFirstAvailableMentee(): number {
    for (let i = 0; i < this.mentees.length; i += 1) {
      // If menteeStatuses[i] is false - then they are available!
      if (!this.menteeStatuses[i]) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Returns true if the mentor prefers the new mentee to the old mentee.
   * Returns false, otherwise.
   *
   * @param mentor - Mentor whose preference list to reference.
   * @param oldMentee - Mentor's current partner.
   * @param newMentee - Mentee who could potentially overtake the old mentee.
   */
  private prefersNewMentee(
    mentor: number,
    oldMentee: number,
    newMentee: number
  ): boolean {
    for (let i = 0; i < this.mentors.length; i += 1) {
      const mentorPreferences: PreferenceList = this.mentors[mentor];

      // If newMentee comes before oldMentee in the list of preferences...true.
      if (mentorPreferences[i] === newMentee) {
        return true;
      }

      // If oldMentee comes before newMentee in the list of preferences...false.
      if (mentorPreferences[i] === oldMentee) {
        return false;
      }
    }

    return false;
  }

  /**
   * Throws an error if...
   *  - there are no mentee preferences.
   *  - there are no mentor preferences.
   *  - the # of mentee preferences doesn't equal the # of mentor preferences.
   */
  private validate(): void {
    if (!this.mentees.length) {
      throw new Error('The mentees array must have a length greater than 0.');
    }

    if (!this.mentors.length) {
      throw new Error('The mentors array must have a length greater than 0.');
    }

    if (this.mentees.length !== this.mentors.length) {
      throw new Error('The mentee and mentor arrays must be the same size.');
    }
  }
}
