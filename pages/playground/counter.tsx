import CounterJotai from "src/components/CounterJotai";
import CounterValtio from "src/components/CounterValtio";
import CounterZustand from "src/components/CounterZustand";

import Playground from "./index";

export default function Counter() {
  return (
    <Playground>
      <section className="flex flex-col justify-start items-center space-y-16 overflow-y-scroll">
        <CounterZustand />
        <CounterJotai />
        <CounterValtio />
      </section>
    </Playground>
  );
}
