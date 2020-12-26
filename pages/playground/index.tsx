import Main from "src/layouts/Main";
import Sidebar from "src/components/Sidebar";
import { useRouter } from "next/router";
import { useEffect } from "react";

const basePath = "/playground";

const Playground: React.FC = ({ children }) => {
  const route = useRouter();
  useEffect(() => {
    route.replace("/playground/counter");
  }, []);
  return (
    <Main>
      <div className="flex w-screen">
        <Sidebar links={[{ text: "Counter", href: `${basePath}/counter` }]} />
        <section className="px-8 pt-8 pb-16 flex-grow">{children}</section>
      </div>
    </Main>
  );
};

export default Playground;
