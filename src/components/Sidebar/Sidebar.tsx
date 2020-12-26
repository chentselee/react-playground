import Link, { LinkProps } from "next/link";

interface SidebarProps {
  links: SidebarLinkProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  return (
    <aside className="border-r border-gray-100 overflow-y-sroll w-60">
      <ul className="space-y-1 py-6 flex flex-col">
        {links.map((link, index) => (
          <li className="px-10 py-2">
            <SidebarLink key={index} {...link} />
          </li>
        ))}
      </ul>
    </aside>
  );
};

interface SidebarLinkProps extends LinkProps {
  text: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ text, ...props }) => {
  return (
    <Link {...props}>
      <span className="cursor-pointer text-gray-500 text-md tracking-wide">
        {text}
      </span>
    </Link>
  );
};

export default Sidebar;
