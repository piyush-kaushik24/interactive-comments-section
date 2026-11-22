"use client";

import { ICONS } from "@/constants/icons";
import { AuthUser } from "@/types/comment";
import Image from "next/image";

type ReplyButtonProps = {
  onReply: (reply: boolean) => void;
  isReplying: boolean;
  currentUser: AuthUser | null;
};

function ReplyButton({ onReply, isReplying, currentUser }: ReplyButtonProps) {
  return (
    <div>
      <button
        type="submit"
        disabled={!currentUser}
        onClick={() => onReply(!isReplying)}
        className={`${!currentUser ? "cursor-not-allowed" : ""} flex items-center gap-2 transition-all hover:scale-105 hover:opacity-80`}
      >
        <div>
          <Image src={ICONS.reply} alt="Reply" width={14} height={13} />
        </div>
        <span className="text-primary-purple-600 font-bold">Reply</span>
      </button>
    </div>
  );
}

export default ReplyButton;
