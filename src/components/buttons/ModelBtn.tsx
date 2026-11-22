import React from "react";
type ModelBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  className: string;
};
function ModelBtn({ className = "", text, ...props }: ModelBtnProps) {
  return (
    <div>
      <button
        type="button"
        className={`rounded-lg px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-102 hover:opacity-90 ${className}`}
        {...props}
      >
        {text}
      </button>
    </div>
  );
}

export default ModelBtn;
