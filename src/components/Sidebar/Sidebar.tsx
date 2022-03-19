import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNav } from "src/modules/store/nav";
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
    <aside className="border-r border-gray-100 overflow-y-sroll basis-60 shrink-0 hidden sm:block">
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
  const router = useRouter();
  return (
    <Link href={href} passHref {...props}>
      <a
        className={clsx([
          classes.link,
          {
            [classes.activeLink]: router.asPath === href,
          },
        ])}
      >
        {text}
      </a>
    </Link>
  );
};

export default Sidebar;
