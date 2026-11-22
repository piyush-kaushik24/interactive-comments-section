"use client";

import { AuthUser } from "@/types/comment";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  commentId: number;
  currentUser: AuthUser | null;
  updateScore: (id: number, currentUser: AuthUser | null) => void;
  onScoreUpdate: () => void;
  icon: React.ReactNode;
  username: string;

  voteDisabled: boolean;
};
function Button({
  commentId,
  updateScore,
  onScoreUpdate,
  icon,
  currentUser,
  voteDisabled,
  username,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={
        voteDisabled ||
        commentId === currentUser?.id ||
        currentUser?.username === username ||
        !currentUser
      }
      {...props}
      className={`${commentId === currentUser?.id || currentUser?.username === username || !currentUser ? "cursor-not-allowed opacity-50" : ""} h-full w-4 transition-opacity hover:opacity-75`}
      onClick={() => {
        onScoreUpdate();
        updateScore(commentId, currentUser);
      }}
    >
      {icon}
    </button>
  );
}

export default Button;
