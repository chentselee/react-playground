import { useCountStore } from "src/modules/store/zustand/count";

import CounterButton from "./CounterButtons";

export default function Counter() {
  const { count } = useCountStore();
  return (
    <div className="h-4/6 grid grid-cols-2 grid-rows-3 gap-y-8 place-items-center">
      <div className="row-start-1 row-end-2 col-start-2 col-end-3 font-bold text-gray-800">
        Zustand
      </div>
      <div className="row-srart-2 row-end-3 col-start-2 col-end-3 flex justify-center font-mono uppercase font-semibold text-2xl">
        <span className="tracking-wide">count:</span>
        <span>{count}</span>
      </div>
      <CounterButton />
    </div>
  );
}
