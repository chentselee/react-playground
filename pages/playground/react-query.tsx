import { Formik } from "formik";
import { useFormikContext } from "formik";
import { useState } from "react";
import { debounceTime, filter, map } from "rxjs/operators";
import Article from "src/components/Article";
import TextField from "src/components/TextField";
import { usePosts } from "src/store/posts";
import { useSubject, useSubscription } from "src/utils";
import * as Yup from "yup";

import Playground from "./index";

const SearchLimitHandler: React.FC<{
  onLimitChange: (limit: number) => void;
}> = ({ onLimitChange }) => {
  const { values } = useFormikContext<Values>();
  const { limit } = values;

  const limitValue$ = useSubject(limit);

  useSubscription(
    limitValue$.pipe(
      debounceTime(500),
      filter((value) => new RegExp(/^\d+$/).test(value.toString())),
      map((value) => +value),
      filter((value) => value !== 0)
    ),
    { next: (value) => onLimitChange(value) }
  );

  return null;
};

interface Values {
  limit: number;
}

const initialValues: Values = {
  limit: 10,
};

const validationSchema = Yup.object().shape({
  limit: Yup.number(),
});

const ReactQuery = () => {
  const [limit, setLimit] = useState(() => 10);

  const { data: posts, status, error } = usePosts(limit);

  return (
    <Playground>
      <Article>
        <h1>React Query</h1>
        <p>
          Fetch posts from{" "}
          <a href="https://jsonplaceholder.typicode.com/">JSON Placeholder</a>.
        </p>
        <hr />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          <>
            <TextField name="limit" label="Limit" />
            <SearchLimitHandler onLimitChange={(limit) => setLimit(limit)} />
          </>
        </Formik>
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
