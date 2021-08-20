import { useQuery } from "react-query";
import { jsonplaceholder } from "src/constants/api";
import { Post } from "src/models/Post";

const fetchPosts = (query?: string): Promise<Post[]> =>
  fetch(
    `${jsonplaceholder.endpoint}/${jsonplaceholder.posts}${
      query ? `?${query}` : ""
    }`
  ).then((res) => res.json());

export const usePosts = (limit?: number) => {
  return useQuery([jsonplaceholder.posts, limit], () =>
    fetchPosts(limit ? `_limit=${limit}` : undefined)
  );
};
