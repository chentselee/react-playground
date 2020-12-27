import Article from "src/components/Article";
import { usePosts } from "src/store/posts";

import Playground from "./index";

const ReactQuery = () => {
  const { data: posts, status, error } = usePosts(10);
  return (
    <Playground>
      <Article>
        <h1>React Query</h1>
        <p>
          Fetch posts from{" "}
          <a href="https://jsonplaceholder.typicode.com/">JSON Placeholder</a>.
        </p>
        {status === "loading" && <div>Loading...</div>}
        {status === "error" && <div>{error}</div>}
        {status === "success" && (
          <div className="divide-y divide-gray200">
            <div className="mb-8"></div>
            {posts.map((post) => (
              <section key={post.id}>
                <h2 style={{ marginTop: "2rem" }}>{post.title}</h2>
                <p>{post.body}</p>
              </section>
            ))}
          </div>
        )}
      </Article>
    </Playground>
  );
};

export default ReactQuery;
