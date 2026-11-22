"use client";
import { AuthUser, Comment } from "@/types/comment";
import Button from "./buttons/Button";
import { addComment } from "../../actions/actions";
import UserAvatar from "./UserAvatar";
import { useRef } from "react";

type AddCommentProps = {
  currentUser: AuthUser | null;
  onAddOptimistic: (comment: Comment) => void;
};
function AddComment({ currentUser, onAddOptimistic }: AddCommentProps) {
  const addCommentRef = useRef<HTMLTextAreaElement | null>(null);
  if (!currentUser) {
    return null;
  }
  async function handleCommentSubmit(formData: FormData) {
    const content = formData.get("add-comment") as string;
    if (!content || !currentUser) return;

    const tempComment: Comment = {
      id: Date.now(),
      content: content,
      createdAt: "Just now",
      score: 0,
      user: currentUser.username,
      image: currentUser.avatar,
      parent_id: null,
      userVote: null,
      sending: true,
    };

    onAddOptimistic(tempComment);

    if (addCommentRef.current) {
      addCommentRef.current.value = "";
    }

    await addComment(formData, currentUser.id);
  }

  return (
    <div className="mt-4 gap-2 rounded-lg bg-white p-4">
      <form
        action={handleCommentSubmit}
        className="grid grid-cols-2 gap-4 lg:grid-cols-[2rem_1fr_4rem] lg:items-start"
      >
        <label htmlFor="add-comment" className="sr-only">
          Add a comment
        </label>

        <textarea
          ref={addCommentRef}

          name="add-comment"
          placeholder="Add a comment..."
          id="add-comment"
          className="col-span-2 min-h-30 w-full rounded-lg border border-gray-300 p-2 lg:col-span-1 lg:col-start-2"
          required
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
        ></textarea>
        <div className="lg:col-start-1 lg:row-start-1">
          <UserAvatar currentUser={currentUser} />
        </div>
        <div className="justify-self-end lg:col-start-3">
          <Button text="SEND" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default AddComment;
