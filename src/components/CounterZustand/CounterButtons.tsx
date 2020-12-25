import { useCountStore } from "src/zustand/count";

const buttonClass =
  "row-start-3 row-end-4 px-4 py-2 uppercase text-xs sm:text-base font-bold tracking-wider text-blue-800 hover:text-blue-100";

export default function CounterButton() {
  const { increment, decrement, reset } = useCountStore();
  return (
    <>
      <button
        className={[buttonClass, "col-start-0 col-end-1"].join(" ")}
        onClick={() => increment()}
      >
        increment
      </button>
      <button
        className={[buttonClass, "col-start-1 col-end-2"].join(" ")}
        onClick={() => reset()}
      >
        reset
      </button>
      <button
        className={[buttonClass, "col-start-2 col-end-3"].join(" ")}
        onClick={() => decrement()}
      >
        decrement
      </button>
    </>
  );
}
