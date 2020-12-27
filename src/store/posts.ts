import { useQuery } from "react-query";
import { Post } from "src/models/Post";

const API = "https://jsonplaceholder.typicode.com";
const endpoint = "posts";

const fetchPosts = (query?: string): Promise<Post[]> =>
  fetch(`${API}/${endpoint}${query ? `?${query}` : ""}`).then((res) =>
    res.json()
  );

export const usePosts = (limit?: number) => {
  return useQuery(endpoint, () =>
    fetchPosts(limit ? `_limit=${limit}` : undefined)
  );
};
