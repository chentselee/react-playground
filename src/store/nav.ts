import { useEffect } from "react";
import { NavProps } from "src/types/nav";
import createStore, { State } from "zustand";

type Status = "open" | "close" | "none";

interface ReducerState {
  status: Status;
  links: NavProps[];
}

const initialState: ReducerState = {
  status: "none",
  links: [],
};

type ReducerAction =
  | { type: "TOGGLE" }
  | { type: "SET_LINKS"; payload: Pick<ReducerState, "links"> }
  | { type: "RESET_LINKS" };

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  if (action.type === "SET_LINKS") {
    return { ...state, links: action.payload.links, status: "close" };
  } else if (action.type === "RESET_LINKS") {
    return { ...state, links: [], status: "none" };
  } else {
    switch (state.status) {
      case "close":
        switch (action.type) {
          case "TOGGLE":
            return { ...state, status: "open" };
          default:
            return state;
        }
      case "open":
        switch (action.type) {
          case "TOGGLE":
            return { ...state, status: "close" };
          default:
            return state;
        }
    }
  }
};

interface StoreState extends State {
  state: ReducerState;
  dispatch: (action: ReducerAction) => void;
}

const useStore = createStore<StoreState>((set) => ({
  state: initialState,
  dispatch: (action: ReducerAction) =>
    set((state) => {
      return { ...state, state: reducer(state.state, action) };
    }),
}));

export const useNav = (links?: NavProps[]) => {
  const store = useStore();
  const { dispatch } = store;

  useEffect(() => {
    if (links) {
      dispatch({ type: "SET_LINKS", payload: { links } });
    }
    return () => {
      dispatch({ type: "RESET_LINKS" });
    };
  }, [dispatch, links]);

  return store;
};
