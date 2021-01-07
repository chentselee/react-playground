import { useState } from "react";
import { debounceTime, filter, map } from "rxjs/operators";
import Article from "src/components/Article";
import TextInput from "src/components/TextInput";
import { usePosts } from "src/store/posts";
import { useSubject, useSubscription } from "src/utils";

import Playground from "./index";

const ReactQuery = () => {
  const [inputValue, setInputValue] = useState(() => "10");
  const [searchLimit, setSearchLimit] = useState(() => 10);

  const inputValue$ = useSubject(inputValue);

  useSubscription(
    inputValue$.pipe(
      debounceTime(500),
      filter((value) => new RegExp(/^\d+$/).test(value)),
      map((value) => +value),
      filter((value) => value !== 0)
    ),
    { next: (value) => setSearchLimit(value) }
  );

  const { data: posts, status, error } = usePosts(searchLimit);

  return (
    <Playground>
      <Article>
        <h1>React Query</h1>
        <p>
          Fetch posts from{" "}
          <a href="https://jsonplaceholder.typicode.com/">JSON Placeholder</a>.
        </p>
        <hr />
        <TextInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
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
