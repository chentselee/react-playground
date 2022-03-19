import { useRouter } from "next/router";
import { useEffect } from "react";
import Sidebar from "src/components/Sidebar";
import Main from "src/layouts/Main";
import { useNav } from "src/modules/store/nav";
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
  {
    text: "Jotai Machine",
    href: `${basePath}/jotai-machine`,
  },
  {
    text: "Actors",
    href: `${basePath}/actors`,
  },
  {
    text: "Dynamic Route",
    href: `${basePath}/dynamic-route?id=123`,
  },
  {
    text: "mitt",
    href: `${basePath}/mitt`,
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
      <div className="flex w-full">
        <Sidebar />
        <section className="mx-6 sm:mx-12 mt-9 mb-16 flex-grow">
          {children}
        </section>
      </div>
    </Main>
  );
};

export default Playground;
