import { useAtom } from "jotai";
import { countAtom } from "src/jotai/count";

const buttonClass =
  "row-start-3 row-end-4 col-span-1 px-4 py-2 uppercase text-xs sm:text-base font-bold tracking-wider text-blue-800 hover:text-blue-100";

export default function CounterButton() {
  const [, setCount] = useAtom(countAtom);
  return (
    <>
      <button
        className={buttonClass}
        onClick={() => setCount((prev) => prev + 1)}
      >
        increment
      </button>
      <button className={buttonClass} onClick={() => setCount(0)}>
        reset
      </button>
      <button
        className={buttonClass}
        onClick={() => setCount((prev) => prev - 1)}
      >
        decrement
      </button>
    </>
  );
}
