import Menu from "src/components/Menu";
import NavLink from "src/components/NavLink";

const Nav = () => {
  return (
    <nav className="sticky top-0 bg-white w-screen flex px-5 sm:px-12 py-3 sm:py-6 border-b border-gray-100 z-10 gap-4 sm:gap-12">
      <NavLink href="/" text="Home" />
      <NavLink href="/playground" text="Playground" />
      <div className="py-1 text-gray-600 w-6 ml-auto sm:hidden">
        <Menu />
      </div>
    </nav>
  );
};

export default Nav;
