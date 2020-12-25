import Link, { LinkProps } from "next/link";

interface Props extends LinkProps {
  text: string;
}

const NavLink: React.FC<Props> = ({ text, ...props }) => {
  return (
    <Link {...props}>
      <span className="px-2 sm:px-4 py-1 sm:py-2 tracking-widest font-extralight text-base sm:text-xl uppercase cursor-pointer hover:text-gray-300">
        {text}
      </span>
    </Link>
  );
};

export default NavLink;
