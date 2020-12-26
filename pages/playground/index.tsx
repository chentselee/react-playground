import Main from "src/layouts/Main";
import Sidebar from "src/components/Sidebar";
import { useRouter } from "next/router";
import { useEffect } from "react";

const basePath = "/playground";

const Playground: React.FC = ({ children }) => {
  const route = useRouter();
  useEffect(() => {
    if (route.pathname === basePath) {
      route.replace(`${basePath}/counter`);
    }
  }, []);
  return (
    <Main>
      <div className="flex w-screen">
        <Sidebar
          links={[
            { text: "Counter", href: `${basePath}/counter` },
            {
              text: "useEffectReducer",
              href: `${basePath}/use-effect-reducer`,
            },
          ]}
        />
        <section className="px-16 pt-9 pb-16 flex-grow">{children}</section>
      </div>
    </Main>
  );
};

export default Playground;
