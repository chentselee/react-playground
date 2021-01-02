import Article from "src/components/Article";
import Button from "src/components/Button";
import { Post } from "src/models/Post";
import { useCount } from "src/store/count";
import { API, endpoint } from "src/store/posts";
import {
  EffectReducer,
  EffectsMap,
  InitialEffectStateGetter,
  useEffectReducer,
} from "use-effect-reducer";

import Playground from "./index";

type Status = "idle" | "fetching" | "success" | "error";

interface ReducerState {
  status: Status;
  posts: Post[];
  error: string;
}

const initialState: ReducerState = {
  status: "idle",
  posts: [],
  error: "",
};

const getInitialState: InitialEffectStateGetter<
  ReducerState,
  ReducerEvent,
  ReducerEffect
> = (exec) => {
  exec({ type: "fetchPosts" });
  return initialState;
};

type ReducerEvent =
  | { type: "FETCH" }
  | { type: "SUCCESS"; payload: Pick<ReducerState, "posts"> }
  | { type: "FAILURE"; payload: Pick<ReducerState, "error"> };

type ReducerEffect = { type: "fetchPosts" };

const effectsMap: EffectsMap<ReducerState, ReducerEvent, ReducerEffect> = {
  fetchPosts: (_, __, dispatch) => {
    fetch(`${API}/${endpoint}?_limit=10`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SUCCESS", payload: { posts: data } }))
      .catch((e) =>
        dispatch({ type: "FAILURE", payload: { error: e.message } })
      );
  },
};

const reducer: EffectReducer<ReducerState, ReducerEvent, ReducerEffect> = (
  state,
  event,
  exec
) => {
  switch (state.status) {
    case "idle":
      switch (event.type) {
        case "SUCCESS":
          return { ...state, status: "success", posts: event.payload.posts };
        case "FAILURE":
          return { ...state, status: "error", error: event.payload.error };
        default:
          return state;
      }
    case "success":
      switch (event.type) {
        case "FETCH":
          exec({ type: "fetchPosts" });
          return { ...state, status: "fetching" };
        default:
          return state;
      }
    case "error":
      switch (event.type) {
        case "FETCH":
          exec({ type: "fetchPosts" });
          return { ...state, status: "fetching" };
        default:
          return state;
      }
    case "fetching":
      switch (event.type) {
        case "SUCCESS":
          return { ...state, status: "success", posts: event.payload.posts };
        case "FAILURE":
          return { ...state, status: "error", error: event.payload.error };
        default:
          return state;
      }
  }
};

const UseEffectReducer = () => {
  const [{ count }, countDispatch] = useCount();
  const [{ status, posts, error }, postsDispatch] = useEffectReducer(
    reducer,
    getInitialState,
    effectsMap
  );
  return (
    <Playground>
      <Article>
        <h1>useEffectReducer</h1>
        <hr />
        <section>
          <h2 className="capitalize">count: {count}</h2>
          <section className="flex space-x-8">
            <Button
              className="uppercase"
              onClick={() => countDispatch("INCREMENT")}
            >
              increment
            </Button>
            <Button
              className="uppercase"
              onClick={() => countDispatch("DECREMENT")}
            >
              decrement
            </Button>
            <Button
              className="uppercase"
              onClick={() => countDispatch("RESET")}
            >
              reset
            </Button>
          </section>
        </section>
        <p>Open console to see the log effect after buttons were clicked.</p>
        <hr />
        <section>
          <h2>Data Fetching</h2>
          <section>
            <div className="flex items-baseline space-x-8">
              <h3>Status: {status}</h3>
              {status !== "fetching" && (
                <Button onClick={() => postsDispatch({ type: "FETCH" })}>
                  refetch
                </Button>
              )}
            </div>
            {status === "fetching" && <p>Loading...</p>}
            {status === "success" && (
              <ul>
                {posts.map((post) => (
                  <li key={post.id}>
                    <section>
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                    </section>
                  </li>
                ))}
              </ul>
            )}
            {status === "error" && (
              <section>
                <h3>Oops! Something went wrong!</h3>
                <p>{error}</p>
              </section>
            )}
          </section>
        </section>
      </Article>
    </Playground>
  );
};

export default UseEffectReducer;
