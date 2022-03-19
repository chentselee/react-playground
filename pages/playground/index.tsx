import { useRouter } from "next/router";
import { useEffect } from "react";
import { getLayout, links } from "src/layouts/Playground";

function Index() {
  const router = useRouter();
  useEffect(() => {
    router.replace(links[0].href);
  }, []);
  return null;
}

Object.assign(Index, { getLayout });

export default Index;
