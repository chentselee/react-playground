import Main from "src/layouts/Main";
import CounterZustand from "src/components/CounterZustand";
import CounterJotai from "src/components/CounterJotai";
import CounterValtio from "src/components/CounterValtio";

export default function Home() {
  return (
    <Main>
      <section className="flex-grow flex flex-col sm:flex-row justify-start sm:justify-center pb-20 mt-4 sm:mt-10 space-y-16 sm:space-y-0 sm:space-x-8">
        <CounterZustand />
        <CounterJotai />
        <CounterValtio />
      </section>
    </Main>
  );
}
