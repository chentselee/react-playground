import { useAtom } from "jotai";
import { countAtom } from "src/jotai/count";

const buttonClass =
  "row-start-3 row-end-4 px-4 py-2 uppercase text-xs sm:text-base font-bold tracking-wider text-blue-800 hover:text-blue-100";

export default function CounterButton() {
  const [, setCount] = useAtom(countAtom);
  return (
    <>
      <button
        className={[buttonClass, "col-start-0 col-end-1"].join(" ")}
        onClick={() => setCount((prev) => prev + 1)}
      >
        increment
      </button>
      <button
        className={[buttonClass, "col-start-1 col-end-2"].join(" ")}
        onClick={() => setCount(0)}
      >
        reset
      </button>
      <button
        className={[buttonClass, "col-start-2 col-end-3"].join(" ")}
        onClick={() => setCount((prev) => prev - 1)}
      >
        decrement
      </button>
    </>
  );
}
