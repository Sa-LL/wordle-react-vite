import create from 'zustand';
import { persist } from 'zustand/middleware';
import { computeGuess, getRandomWord, GUESS_LENGTH, LetterState } from './word-utils';

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  rows: GuessRow[];
  gameState: 'playing' | 'won' | 'lost';
  keyboardLetterState: { [letter: string]: LetterState };
  addGuess: (guess: string) => void;
  newGame: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      answer: getRandomWord(),
      rows: [],
      gameState: 'playing',
      keyboardLetterState: {},
      addGuess: (guess) => {
        const result = computeGuess(guess, get().answer);

        const didWin = result.every((i) => i === LetterState.Match);

        const rows = [
          ...get().rows,
          {
            guess,
            result,
          },
        ];

        const keyboardLetterState = get().keyboardLetterState;
        result.forEach((r, index) => {
          const resultGuessLetter = guess[index];

          const currentLetterState = keyboardLetterState[resultGuessLetter];

          switch (currentLetterState) {
            case LetterState.Match:
              break;
            case LetterState.Present:
              if (r === LetterState.Miss) {
                break;
              }
            default:
              keyboardLetterState[resultGuessLetter] = r;
              break;
          }
        });

        set(() => ({
          rows,
          keyboardLetterState,
          gameState: didWin ? 'won' : rows.length === GUESS_LENGTH ? 'lost' : 'playing',
        }));
      },
      newGame: () => {
        set({
          answer: getRandomWord(),
          rows: [],
          gameState: 'playing',
          keyboardLetterState: {},
        });
      },
    }),
    {
      name: 'wordle-storage', // unique name
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
