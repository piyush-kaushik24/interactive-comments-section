"use client";

import { addReply } from "../app/actions/actions";
import { AuthUser, Comment } from "@/types/comment";
import UserAvatar from "./UserAvatar";

type ReplyFormProps = {
  comment: Comment;
  isReplying: boolean;
  currentUser: AuthUser | null;
  onReply: (reply: boolean) => void;
  onAddOptimistic: (reply: Comment) => void;
};

function ReplyBox({
  comment,
  isReplying,
  currentUser,
  onReply,
  onAddOptimistic,
}: ReplyFormProps) {
  if (!currentUser) return null;
  async function handleSubmitReply(formData: FormData) {
    const reply = formData.get("reply") as string;
    if (!reply || !currentUser) return;
    // 1. Create temporary reply
    const tempReply: Comment = {
      id: Date.now(),
      content: reply,
      createdAt: "Just now",
      score: 0,
      user: currentUser.username,
      image: currentUser.avatar,
      parent_id: comment.id, // 👈 Points to the comment you're replying to!
      replying_to: comment.user, // 👈 Stores who you're replying to
      userVote: null,
      sending: true, // 👈 Opacity flag
    };
    // 2. Show on screen instantly & close the reply box
    onAddOptimistic(tempReply);
    onReply(false);
    // 3. Send to server in the background
    await addReply(formData, comment.id, comment.user, currentUser.id);
  }
  return (
    <div>
      <form action={handleSubmitReply}>
        <label htmlFor="replyInput" className="sr-only">
          {`Reply to ${comment.user}`}
        </label>
        <div
          className={`${isReplying ? "" : "hidden"} mt-2 rounded-lg bg-white p-4`}
        >
          <textarea
            name="reply"
            id="replyInput"
            placeholder={`Reply to @${comment.user}`}
            className="border-neutral-grey-100 min-h-30 w-full rounded-lg border-2 p-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
                onReply(false);
              }
            }}
          ></textarea>
          <div className="flex justify-between">
            <UserAvatar currentUser={currentUser} />
            <button
              type="submit"
              disabled={!currentUser}
              className={`bg-primary-purple-600 rounded-lg px-4 py-2 font-semibold text-white ${!currentUser ? "cursor-not-allowed" : ""} transition-all hover:scale-105 hover:opacity-80`}
            >
              Reply
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReplyBox;
