"use client";

import { Comment } from "@/types/comment";
import { useState } from "react";
import ReplyBox from "./ReplyBox";
import ReplyButton from "./ReplyButton";
import Score from "./Score";
import UserComment from "./UserComment";
import { AuthUser } from "@/types/comment";
import { ICONS } from "@/constants/icons";
import CommentActionButton from "./buttons/CommentActionButton";
import EditComment from "./EditComment";

type CommentsCardProps = {
  comment: Comment;
  currentUser: AuthUser | null;
  date: string;
  onOpen: (status: boolean) => void;
  onGetId: (id: number) => void;
  onAddOptimistic: (comment: Comment) => void;
};

function CommentsCard({
  comment,
  currentUser,
  date,
  onOpen,
  onGetId,
  onAddOptimistic
}: CommentsCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  function handleReply(reply: boolean) {
    setIsReplying(reply);
  }
  function handleEdit() {
    setIsEditing(false);
  }

  return (
    <div>
      <div className="grid min-h-40 grid-cols-[1fr_auto] gap-4 rounded-xl bg-white p-4 lg:grid-cols-[3rem_1fr_10rem] lg:grid-rows-[2rem_1fr]">
        <div className="col-span-2 row-start-1 lg:col-span-1 lg:col-start-2">
          <UserComment
            comment={comment}
            currentUser={currentUser}
            isEditing={isEditing}
            onEdit={handleEdit}
            date={date}
          />
        </div>

        <div className="col-span-2 row-start-2 lg:col-span-2 lg:col-start-2">
          {isEditing ? (
            <EditComment comment={comment} onEdit={handleEdit} />
          ) : (
            <p className="text-neutral-grey-500 gap-2 space-x-1">
              {comment.replying_to !== null && comment.parent_id !== null && (
                <span className="text-primary-purple-600 font-semibold">
                  {" "}
                  @{comment.replying_to}
                </span>
              )}

              <span>{comment.content}</span>
            </p>
          )}
        </div>

        <div className="col-start-1 row-start-3 lg:col-start-1 lg:row-start-1">
          <Score
            score={comment.score}
            userVote={comment.userVote}
            id={comment.id}
            username={comment.user}
            currentUser={currentUser}
          />
        </div>

        <div className="col-start-2 row-start-3 justify-self-end lg:col-start-3 lg:row-start-1">
          {comment.user !== currentUser?.username ? (
            <ReplyButton
              onReply={handleReply}
              isReplying={isReplying}
              currentUser={currentUser}
            />
          ) : (
            <div className="flex gap-4">
              <CommentActionButton
                text="Delete"
                icon={ICONS.delete}
                className="text-primary-pink-400"
                onClick={() => {
                  onGetId(comment.id);
                  onOpen(true);
                }}
              />
              <CommentActionButton
                text="Edit"
                icon={ICONS.edit}
                className="text-primary-purple-600"
                onClick={() => setIsEditing(!isEditing)}
              />
            </div>
          )}
        </div>
      </div>

      <ReplyBox
        isReplying={isReplying}
        currentUser={currentUser}
        comment={comment}
        onReply={handleReply}
        onAddOptimistic={onAddOptimistic}
      />
    </div>
  );
}

export default CommentsCard;
