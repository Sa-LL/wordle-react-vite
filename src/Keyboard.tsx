import { useStore } from './store';
import { LetterState } from './word-utils';

export default function Keyboard({ onClick: onClickProp }: { onClick: (letter: string) => void }) {
  const keyboardLetterState = useStore((s) => s.keyboardLetterState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const letter = e.currentTarget.textContent;
    onClickProp(letter!);
  };
  return (
    <div className="flex flex-col ">
      {keyboardKeys.map((keyboardRow, rowIndex) => {
        return (
          <div key={rowIndex} className="flex justify-center my-2 space-x-2">
            {keyboardRow.map((key, keyIndex) => {
              let styles = 'rounded font-bold uppercase py-2';
              const letterState = keyStateStyles[keyboardLetterState[key]];

              if (key === '') styles = 'hidden';

              if (letterState) {
                styles += ` ${letterState}`;
              } else {
                styles += ' bg-gray-400';
              }

              return (
                <button className={styles} key={keyIndex} onClick={onClick}>
                  {key}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const keyboardKeys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

const keyStateStyles = {
  [LetterState.Miss]: 'bg-gray-700',
  [LetterState.Present]: 'bg-yellow-500',
  [LetterState.Match]: 'bg-green-500',
};
