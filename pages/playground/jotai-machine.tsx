import { inspect } from "@xstate/inspect";
import { atom, useAtom } from "jotai";
import { atomWithMachine } from "jotai/xstate";
import Article from "src/components/Article";
import { getLayout } from "src/layouts/Playground";
import { assign, createMachine, Sender } from "xstate";

interface SwitchMachineContext {
  elapsed: number;
  interval: number;
  brightGuard: number;
}

type SwitchEvent = { type: "SWITCH" };
type ElapseEvent = { type: "ELAPSE" };

type SwitchMachineEvent = SwitchEvent | ElapseEvent;

type SwitchMachineState =
  | { value: "off"; context: undefined }
  | { value: "on"; context: SwitchMachineContext }
  | { value: "bright"; context: undefined };

const createSwitchMachine = (brightGuard = 3) =>
  createMachine<SwitchMachineContext, SwitchMachineEvent, SwitchMachineState>({
    initial: "off",
    context: {
      elapsed: 0,
      interval: 0.1,
      brightGuard,
    },
    states: {
      off: {
        on: {
          SWITCH: "on",
        },
      },
      on: {
        invoke: {
          src: (context) => (cb: Sender<SwitchMachineEvent>) => {
            const interval = setInterval(() => {
              cb("ELAPSE");
            }, context.interval * 1000);
            return () => {
              clearInterval(interval);
            };
          },
        },
        on: {
          ELAPSE: {
            actions: assign({
              elapsed: (context) => context.elapsed + context.interval,
            }),
          },
          SWITCH: [
            {
              target: "off",
              cond: (context) => context.elapsed >= context.brightGuard,
            },
            {
              target: "bright",
              cond: (context) => context.elapsed < context.brightGuard,
            },
          ],
        },
        exit: assign({ elapsed: 0 }),
      },
      bright: {
        on: {
          SWITCH: "off",
        },
      },
    },
  });

const brightGuardAtom = atom(2);

const switchMachineAtom = atomWithMachine((get) =>
  createSwitchMachine(get(brightGuardAtom))
);

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  inspect({ iframe: false });
}

const JotaiMachine: React.FC = () => {
  const [state, send] = useAtom(switchMachineAtom);

  return (
    <Article>
      <h1>Jotai Machine</h1>
      <section>
        <h2>{state.value}</h2>
        <pre>{JSON.stringify(state.context, null, 2)}</pre>
        <button onClick={() => send("SWITCH")}>switch</button>
      </section>
      <hr />
      <Nested />
    </Article>
  );
};

const Nested: React.FC = () => {
  const [state, send] = useAtom(switchMachineAtom);
  return (
    <Article>
      <h2>Nested</h2>
      <p>This machine is synced.</p>
      <section>
        <h3>{state.value}</h3>
        <pre>{JSON.stringify(state.context, null, 2)}</pre>
        <button onClick={() => send("SWITCH")}>switch</button>
      </section>
    </Article>
  );
};

Object.assign(JotaiMachine, { getLayout });

export default JotaiMachine;
