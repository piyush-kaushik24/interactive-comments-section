import Image from "next/image";
type CommentActionButtonProps = {
  icon: string;
  text: string;
  className?: string;
  onClick?: () => void;
};
function CommentActionButton({
  text,
  icon = "",
  className = "",
  onClick,
}: CommentActionButtonProps) {
  return (
    <div>
      <button
        type="button"
        className={`flex cursor-pointer items-center gap-2 font-bold transition-all duration-200 hover:scale-105 hover:opacity-80 ${className}`}
        onClick={onClick}
      >
        <Image src={icon} alt="" width={12} height={12} />
        <span>{text}</span>
      </button>
    </div>
  );
}

export default CommentActionButton;
