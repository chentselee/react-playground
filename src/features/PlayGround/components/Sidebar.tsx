import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
  {
    text: "Jotai Machine",
    href: `${basePath}/jotai-machine`,
  },
  {
    text: "Actors",
    href: `${basePath}/actors`,
  },
];

const Playground: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (pathname === basePath) {
      history.replace(defaultPath);
    }
  }, [history, pathname]);

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
