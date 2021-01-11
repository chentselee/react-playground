import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface Props extends LinkProps {
  text: string;
}

const NavLink: React.FC<Props> = ({ text, href, ...props }) => {
  const { pathname } = useRouter();
  const isActive =
    href.toString() === "/"
      ? pathname === "/"
      : pathname.includes(href.toString());
  return (
    <Link href={href} {...props}>
      <span className="relative py-1 tracking-widest font-extralight text-base sm:text-xl uppercase cursor-pointer hover:text-gray-300 transition-color duration-300">
        {text}
        {isActive && (
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-800"></span>
        )}
      </span>
    </Link>
  );
};

export default NavLink;
