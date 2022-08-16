import { computeGuess, getRandomWord, isValidWord, LetterState } from './word-utils';

describe('getRandomWord', () => {
  it('random word', () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});

describe('computeGuess', () => {
  it('works with match and present', () => {
    expect(computeGuess('boost', 'basic')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
    ]);
  });

  it('works with all matches', () => {
    expect(computeGuess('boost', 'boost')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });

  it('works with full miss', () => {
    expect(computeGuess('guard', 'boost')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it('works with one match when two letters are present', () => {
    expect(computeGuess('solid', 'boost')).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it('works with repeated letters when one match and the others should be missed', () => {
    expect(computeGuess('allol', 'colon')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Match,
      LetterState.Miss,
    ]);
  });
});

describe('isValidWord', () => {
  it('works with a valid word', () => {
    expect(isValidWord('boost')).toBe(true);
  });
  it('works with an invalid word', () => {
    expect(isValidWord('aaaaa')).toBe(false);
  });
});
