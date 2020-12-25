import { countProxy } from "src/valtio/count";

const buttonClass =
  "row-start-3 row-end-4 px-4 py-2 uppercase text-xs sm:text-base font-bold tracking-wider text-blue-800 hover:text-blue-100";

export default function CounterButton() {
  return (
    <>
      <button
        className={[buttonClass, "col-start-0 col-end-1"].join(" ")}
        onClick={() => ++countProxy.count}
      >
        increment
      </button>
      <button
        className={[buttonClass, "col-start-1 col-end-2"].join(" ")}
        onClick={() => (countProxy.count = 0)}
      >
        reset
      </button>
      <button
        className={[buttonClass, "col-start-2 col-end-3"].join(" ")}
        onClick={() => --countProxy.count}
      >
        decrement
      </button>
    </>
  );
}
