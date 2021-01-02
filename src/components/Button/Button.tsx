import React from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="uppercase px-3 py-0.5 border border-gray-600 rounded-sm hover:bg-gray-600 hover:text-gray-50 transition-colors"
    >
      {children}
    </button>
  );
};

export default Button;
