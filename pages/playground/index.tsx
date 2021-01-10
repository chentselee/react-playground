import { useRouter } from "next/router";
import { useEffect } from "react";
import Sidebar from "src/components/Sidebar";
import Main from "src/layouts/Main";
import { useNav } from "src/store/nav";
import { NavProps } from "src/types/nav";

const basePath = "/playground";
const defaultPath = `${basePath}/state-management`;

const links: NavProps[] = [
  { text: "State Management", href: `${basePath}/state-management` },
  {
    text: "useEffectReducer",
    href: `${basePath}/use-effect-reducer`,
  },
  {
    text: "React Query",
    href: `${basePath}/react-query`,
  },
];

const Playground: React.FC = ({ children }) => {
  const route = useRouter();
  useEffect(() => {
    if (route.pathname === basePath) {
      route.replace(defaultPath);
    }
  }, [route]);

  useNav(links);

  return (
    <Main>
      <div className="flex w-screen">
        <Sidebar />
        <section className="mx-8 sm:mx-16 mt-9 mb-16 flex-grow">
          {children}
        </section>
      </div>
    </Main>
  );
};

export default Playground;
