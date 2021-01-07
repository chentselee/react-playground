import React from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const TextInput: React.FC<Props> = (props) => {
  return (
    <input
      className="border px-2 py-0.5 focus:ring rounded"
      type="text"
      {...props}
    />
  );
};

export default TextInput;
