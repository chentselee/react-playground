import Main from "src/layouts/Main";
import CounterZustand from "src/components/CounterZustand";
import CounterJotai from "src/components/CounterJotai";
import CounterValtio from "src/components/CounterValtio";

export default function Home() {
  return (
    <Main>
      <section className="flex-grow flex flex-col lg:flex-row justify-start lg:justify-center pb-20 mt-4 lg:mt-10 space-y-16 lg:space-y-0 lg:space-x-8">
        <CounterZustand />
        <CounterJotai />
        <CounterValtio />
      </section>
    </Main>
  );
}
