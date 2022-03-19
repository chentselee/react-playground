import { useRouter } from "next/router";
import Article from "src/components/Article";
import { getLayout } from "src/layouts/Playground";

const DynamicRoute = () => {
  const { query } = useRouter();
  return (
    <Article>
      <pre>{JSON.stringify(query, null, 2)}</pre>
    </Article>
  );
};

Object.assign(DynamicRoute, { getLayout });

export default DynamicRoute;
