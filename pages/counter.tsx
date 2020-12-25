import Main from "src/layouts/Main";
import CounterZustand from "src/components/CounterZustand";
import CounterJotai from "src/components/CounterJotai";

export default function Counter() {
  return (
    <Main>
      <section className="flex-grow flex flex-col items-center mt-4 space-y-16">
        <CounterZustand />
        <CounterJotai />
      </section>
    </Main>
  );
}
