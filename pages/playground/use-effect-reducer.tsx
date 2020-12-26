import Playground from "./index";
import Article from "src/components/Article";
import {
  useEffectReducer,
  EffectReducer,
  EffectFunction,
  EffectsMap,
} from "use-effect-reducer";

interface ReducerState {
  count: number;
}

const initialState: ReducerState = {
  count: 0,
};

type ReducerEvent =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" };

type ReducerEffect = { type: "log"; payload: { message: string } };

const log: EffectFunction<ReducerState, ReducerEvent, ReducerEffect> = (
  _,
  effect
) => {
  console.log(effect.payload.message);
};

const effectsMap: EffectsMap<ReducerState, ReducerEvent, ReducerEffect> = {
  log,
};

const reducer: EffectReducer<ReducerState, ReducerEvent, ReducerEffect> = (
  state,
  event,
  exec
): ReducerState => {
  switch (event.type) {
    case "INCREMENT":
      exec({ type: "log", payload: { message: (state.count + 1).toString() } });
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      exec({ type: "log", payload: { message: (state.count - 1).toString() } });
      return { ...state, count: state.count - 1 };
    case "RESET":
      exec({ type: "log", payload: { message: "Reset to 0" } });
      return { ...state, count: 0 };
    default:
      return state;
  }
};

const UseEffectReducer = () => {
  const [{ count }, dispatch] = useEffectReducer(
    reducer,
    initialState,
    effectsMap
  );
  return (
    <Playground>
      <Article>
        <h1>useEffectReducer</h1>
        <p>Open console to see the log effect after buttons were clicked.</p>
        <h2 className="capitalize">count: {count}</h2>
        <div className="flex space-x-8">
          <button className="uppercase" onClick={() => dispatch("INCREMENT")}>
            increment
          </button>
          <button className="uppercase" onClick={() => dispatch("DECREMENT")}>
            decrement
          </button>
          <button className="uppercase" onClick={() => dispatch("RESET")}>
            reset
          </button>
        </div>
      </Article>
    </Playground>
  );
};

export default UseEffectReducer;
