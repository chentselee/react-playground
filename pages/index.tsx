import { getLayout } from "src/layouts/Main";

function Home() {
  return (
    <h1 className="text-5xl text-center font-bold mt-40">
      Welcome to Playground
    </h1>
  );
}

Object.assign(Home, { getLayout });

export default Home;
