import Main from "src/layouts/Main";
import CounterZustand from "src/components/CounterZustand";
import CounterJotai from "src/components/CounterJotai";
import CounterValtio from "src/components/CounterValtio";

export default function Home() {
  return (
    <Main>
      <section className="flex-grow flex flex-col items-center pb-20 space-y-16">
        <CounterZustand />
        <CounterJotai />
        <CounterValtio />
      </section>
    </Main>
  );
}
