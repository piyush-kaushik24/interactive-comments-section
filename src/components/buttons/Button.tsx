import React from "react";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};
function Button({ text, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-primary-purple-600 cursor-pointer rounded-lg px-4 py-2 text-white transition-all duration-300 hover:scale-102 hover:opacity-90 ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
