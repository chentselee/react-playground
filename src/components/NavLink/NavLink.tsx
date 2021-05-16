import React from "react";
import { Link, useLocation } from "react-router-dom";

import { getIsAcitve } from "./getIsActive";

interface Props {
  text: string;
  href: string;
}

const NavLink: React.FC<Props> = ({ text, href }) => {
  const { pathname } = useLocation();
  const isActive = getIsAcitve(href, pathname);
  return (
    <Link to={href}>
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
