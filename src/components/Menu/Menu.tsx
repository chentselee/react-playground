import Link from "next/link";
import { useNav } from "src/modules/store/nav";
import { NavProps } from "src/types/nav";

const Menu = () => {
  const {
    state: { status, links },
    dispatch,
  } = useNav();
  return (
    <>
      <button className="w-full" onClick={() => dispatch({ type: "TOGGLE" })}>
        {status === "close" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="fill-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
        {status === "open" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="fill-current relative z-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
      {status === "open" && (
        <nav className="absolute z-10 w-screen h-screen top-0 left-0 bg-white bg-opacity-95 p-10 pt-12">
          <ul className="space-y-5">
            {links.map((link) => (
              <li key={link.text} onClick={() => dispatch({ type: "TOGGLE" })}>
                <MenuItem {...link} />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

const MenuItem: React.FC<NavProps> = ({ href, text, ...props }) => {
  return (
    <Link href={href} passHref {...props}>
      <a className="font-semibold text-2xl cursor-pointer hover:text-gray-800 transition-colors">
        {text}
      </a>
    </Link>
  );
};

export default Menu;
