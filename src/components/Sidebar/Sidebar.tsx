import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNav } from "src/store/nav";
import { NavProps } from "src/types/nav";

const classes = {
  link: "cursor-pointer text-gray-500 text-md tracking-wide",
  activeLink: "text-gray-700",
};

const Sidebar = () => {
  const {
    state: { links },
  } = useNav();
  return (
    <aside className="border-r border-gray-100 overflow-y-sroll w-60 hidden sm:block">
      <ul className="space-y-1 py-6 flex flex-col">
        {links.map((link, index) => (
          <li key={index} className="px-10 py-2">
            <SidebarLink {...link} />
          </li>
        ))}
      </ul>
    </aside>
  );
};

const SidebarLink: React.FC<NavProps> = ({ text, href, ...props }) => {
  const { pathname } = useRouter();
  return (
    <Link href={href} passHref {...props}>
      <a
        className={clsx([
          classes.link,
          {
            [classes.activeLink]: pathname
              .replace(/\s-/g, "")
              .match(href.toString().replace(/\s-/g, "")),
          },
        ])}
      >
        {text}
      </a>
    </Link>
  );
};

export default Sidebar;
