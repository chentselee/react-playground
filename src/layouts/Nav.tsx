import NavLink from "src/components/NavLink";

const Nav = () => {
  return (
    <nav className="sticky top-0 bg-white w-screen flex px-5 sm:px-12 py-3 sm:py-6 space-x-3 sm:space-x-12 border-b border-gray-100 z-10">
      <NavLink href="/" text="Home" />
      <NavLink href="/playground" text="Playground" />
    </nav>
  );
};

export default Nav;
