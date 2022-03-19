import { useActor } from "@xstate/react";
import mitt from "mitt";
import Article from "src/components/Article";
import Button from "src/components/Button";
import { getLayout } from "src/layouts/Playground";
import { interpret } from "xstate";
import { createModel } from "xstate/lib/model";

type ChannelEvent = {
  ping: undefined;
  pong: undefined;
};

const channel = mitt<ChannelEvent>();

const pingModel = createModel(undefined, {
  events: {
    PING: () => ({}),
    PONG: () => ({}),
  },
});

const pongModel = createModel(undefined, {
  events: {
    PING: () => ({}),
    PONG: () => ({}),
  },
});

const pingMachine = pingModel.createMachine(
  {
    id: "ping",
    initial: "active",
    invoke: { src: "listen" },
    states: {
      active: {
        initial: "idle",
        states: {
          idle: {},
          ponged: {
            after: {
              3000: "#ping.active.idle",
            },
          },
        },
        on: {
          PONG: { target: ".ponged", internal: false, actions: "pong" },
          PING: { actions: "ping" },
        },
      },
    },
  },
  {
    services: {
      listen: () => (send) => {
        channel.on("pong", () => send("PONG"));
      },
    },
    actions: {
      ping: () => channel.emit("ping"),
      pong: () => console.log("pong!"),
    },
  }
);

const pongMachine = pongModel.createMachine(
  {
    id: "pong",
    initial: "active",
    invoke: { src: "listen" },
    states: {
      active: {
        initial: "idle",
        states: {
          idle: {},
          pinged: {
            after: {
              3000: "#pong.active.idle",
            },
          },
        },
        on: {
          PING: { target: ".pinged", internal: false, actions: "ping" },
          PONG: { actions: "pong" },
        },
      },
    },
  },
  {
    services: {
      listen: () => (send) => {
        channel.on("ping", () => send("PING"));
      },
    },
    actions: {
      ping: () => console.log("ping!"),
      pong: () => channel.emit("pong"),
    },
  }
);

const pingService = interpret(pingMachine).start();
const pongService = interpret(pongMachine).start();

const Mitt = () => {
  const [pingState, pingSend] = useActor(pingService);
  const [pongState, pongSend] = useActor(pongService);
  return (
    <Article>
      <div className="flex gap-5 text-center">
        <div>
          <h5>ping</h5>
          <Button onClick={() => pingSend("PING")}>ping</Button>
          {pingState.matches("active.ponged") && <div>ponged!</div>}
        </div>
        <div>
          <h5>pong</h5>
          <Button onClick={() => pongSend("PONG")}>pong</Button>
          {pongState.matches("active.pinged") && <div>pinged!</div>}
        </div>
      </div>
    </Article>
  );
};

Object.assign(Mitt, { getLayout });

export default Mitt;
