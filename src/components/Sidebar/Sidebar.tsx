import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

const classes = {
  link: "cursor-pointer text-gray-500 text-md tracking-wide",
  activeLink: "text-gray-700",
};

interface SidebarProps {
  links: SidebarLinkProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  return (
    <aside className="border-r border-gray-100 overflow-y-sroll w-60">
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

interface SidebarLinkProps extends LinkProps {
  text: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ text, href, ...props }) => {
  const { pathname } = useRouter();
  return (
    <Link href={href} {...props}>
      <span
        className={clsx([
          classes.link,
          { [classes.activeLink]: pathname.match(href.toString()) },
        ])}
      >
        {text}
      </span>
    </Link>
  );
};

export default Sidebar;
