import Article from "src/components/Article";
import CounterJotai from "src/components/CounterJotai";
import CounterValtio from "src/components/CounterValtio";
import CounterZustand from "src/components/CounterZustand";

import Playground from "./index";

export default function StateManagement() {
  return (
    <Playground>
      <Article>
        <h1>State Management</h1>
        <p>Various state management libraries.</p>
        <hr />
      </Article>
      <section className="mt-4 flex flex-col justify-start items-center space-y-16 overflow-y-scroll">
        <CounterZustand />
        <CounterJotai />
        <CounterValtio />
      </section>
    </Playground>
  );
}
