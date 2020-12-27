import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

const classes = {
  link:
    "py-1 tracking-widest font-extralight text-base sm:text-xl uppercase cursor-pointer hover:text-gray-300 transition-color duration-300",
  activeLink: "border-b-2 border-blue-800",
};

interface Props extends LinkProps {
  text: string;
}

const NavLink: React.FC<Props> = ({ text, href, ...props }) => {
  const { pathname } = useRouter();
  return (
    <Link href={href} {...props}>
      <span
        className={clsx([
          classes.link,
          {
            [classes.activeLink]:
              href.toString() === "/"
                ? pathname === "/"
                : pathname.includes(href.toString()),
          },
        ])}
      >
        {text}
      </span>
    </Link>
  );
};

export default NavLink;
