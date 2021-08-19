import { useRouter } from "next/router";
import Article from "src/components/Article";

import Playground from "./index";

const DynamicRoute = () => {
  const { query } = useRouter();
  return (
    <Playground>
      <Article>
        <pre>{JSON.stringify(query, null, 2)}</pre>
      </Article>
    </Playground>
  );
};

export default DynamicRoute;
