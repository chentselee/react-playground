import { useCountStore } from "src/modules/store/zustand/count";

const buttonClass =
  "row-start-3 row-end-4 col-span-1 px-4 py-2 uppercase text-xs sm:text-base font-bold tracking-wider text-blue-800 hover:text-blue-100";

export default function CounterButton() {
  const { increment, decrement, reset } = useCountStore();
  return (
    <>
      <button className={buttonClass} onClick={() => increment()}>
        increment
      </button>
      <button className={buttonClass} onClick={() => reset()}>
        reset
      </button>
      <button className={buttonClass} onClick={() => decrement()}>
        decrement
      </button>
    </>
  );
}
