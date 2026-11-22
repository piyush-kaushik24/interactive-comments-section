"use client";
import { editComment } from "../app/actions/actions";
import { Comment } from "@/types/comment";
import { useState } from "react";

type EditCommentProps = {
  comment: Comment;
  onEdit: () => void;
};

function EditComment({ comment, onEdit }: EditCommentProps) {
  const [newComment, setNewComment] = useState(comment.content);
  async function handleUpdate() {
    await editComment(comment.id, newComment);
    onEdit();
  }
  return (
    <div>
      <label htmlFor="replyInput" className="sr-only"></label>
      <div>
        <textarea
          name="reply"
          id="replyInput"
          value={newComment}
          required
          onChange={(e) => setNewComment(e.target.value)}
          className="border-neutral-grey-100 min-h-40 w-full rounded-lg border-2 p-2"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
              handleUpdate();
            }
          }}
        ></textarea>
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className="bg-primary-purple-600 rounded-lg px-4 py-2 font-semibold text-white transition-all hover:scale-105 hover:opacity-80"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditComment;
