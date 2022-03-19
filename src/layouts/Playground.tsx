import Sidebar from "src/components/Sidebar";
import Main from "src/layouts/Main";
import { useNav } from "src/modules/store/nav";
import { NavProps } from "src/types/nav";

export const links: NavProps[] = [
  { text: "State Management", href: `/state-management` },
  {
    text: "useEffectReducer",
    href: `/use-effect-reducer`,
  },
  {
    text: "React Query",
    href: `/react-query`,
  },
  {
    text: "Jotai Machine",
    href: `/jotai-machine`,
  },
  {
    text: "Actors",
    href: `/actors`,
  },
  {
    text: "Dynamic Route",
    href: `/dynamic-route?id=123`,
  },
  {
    text: "mitt",
    href: `/mitt`,
  },
].map((link) => ({ ...link, href: `/playground${link.href}` }));

const Playground: React.FC = ({ children }) => {
  useNav(links);

  return (
    <div className="flex w-full">
      <Sidebar />
      <section className="mx-4 sm:mx-8 mt-9 mb-16 flex-grow">
        {children}
      </section>
    </div>
  );
};

export default Playground;

export const getLayout = (page: React.ReactElement) => (
  <Main>
    <Playground>{page}</Playground>
  </Main>
);
