import Playground from "./index";
import Article from "src/components/Article";
import {
  useEffectReducer,
  EffectReducer,
  EffectFunction,
  EffectsMap,
} from "use-effect-reducer";
import { useCount } from "src/store/count";

const UseEffectReducer = () => {
  const [{ count }, dispatch] = useCount();
  return (
    <Playground>
      <Article>
        <h1>useEffectReducer</h1>
        <hr />
        <h2 className="capitalize">count: {count}</h2>
        <section className="flex space-x-8">
          <button className="uppercase" onClick={() => dispatch("INCREMENT")}>
            increment
          </button>
          <button className="uppercase" onClick={() => dispatch("DECREMENT")}>
            decrement
          </button>
          <button className="uppercase" onClick={() => dispatch("RESET")}>
            reset
          </button>
        </section>
        <p>Open console to see the log effect after buttons were clicked.</p>
      </Article>
    </Playground>
  );
};

export default UseEffectReducer;
