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

export const useCount = () => {
  return useEffectReducer(reducer, initialState, effectsMap);
};
