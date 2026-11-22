"use client";

import CommentsCard from "./CommentsCard";

import AddComment from "./AddComment";
import { AuthUser } from "@/types/comment";
import { Comment } from "@/types/comment";
import { useOptimistic, useState } from "react";
import { getTimeAgo } from "@/utils/date";
import Confirmation from "./Confirmation";

type CommentContainerProps = {
  currentUser: AuthUser | null;
  userComments: Comment[];
};

type ReplyListProps = {
  parentId: number;
  replies: Comment[];
  currentUser: AuthUser | null;
  onOpen: (status: boolean) => void;
  onGetId: (id: number) => void;
  onAddOptimistic: (comment: Comment) => void;
};

function ReplyList({
  parentId,
  replies,
  currentUser,
  onGetId,
  onOpen,
  onAddOptimistic,
}: ReplyListProps) {
  const childReplies = replies.filter((reply) => reply.parent_id === parentId);

  if (childReplies.length === 0) {
    return null;
  }

  return (
    <ul className="border-neutral-grey-500/20 mt-4 space-y-4 border-l-2 pl-4 lg:ml-8 lg:pl-8">
      {childReplies.map((reply) => {
        const timeStamp = getTimeAgo(reply.createdAt);

        return (
          <li
            key={reply.id}
            className={
              reply.sending
                ? "ring-neutral-grey-800 rounded-xl opacity-50 ring-2"
                : ""
            }
          >
            <CommentsCard
              comment={reply}
              currentUser={currentUser}
              date={timeStamp}
              onOpen={onOpen}
              onGetId={onGetId}
              onAddOptimistic={onAddOptimistic}
            />
            <ReplyList
              parentId={reply.id}
              replies={replies}
              currentUser={currentUser}
              onOpen={onOpen}
              onGetId={onGetId}
              onAddOptimistic={onAddOptimistic}
            />
          </li>
        );
      })}
    </ul>
  );
}

function CommentContainer({
  currentUser,
  userComments,
}: CommentContainerProps) {
  const [modelOpen, setModelOpen] = useState(false);
  const [getId, setGetId] = useState<number | null>(null);

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    userComments,

    (currentList, newComment: Comment) => [...currentList, newComment],
  );
  const mainComments: Comment[] = optimisticComments.filter(
    (comment) => comment.parent_id === null,
  );
  const allReplies: Comment[] = optimisticComments.filter(
    (comment) => comment.parent_id !== null,
  );
  function handleOpen(status: boolean) {
    setModelOpen(status);
  }
  function handleGetId(id: number) {
    setGetId(id);
  }

  return (
    <div>
      <ul className="space-y-4">
        {mainComments.map((comment) => {
          const timeStamp = getTimeAgo(comment.createdAt);

          return (
            <li
              key={comment.id}
              className={`${comment.sending ? "ring-neutral-grey-800 rounded-xl opacity-50 ring-2" : ""} `}
            >
              <CommentsCard
                comment={comment}
                currentUser={currentUser}
                date={timeStamp}
                onOpen={handleOpen}
                onGetId={handleGetId}
                onAddOptimistic={addOptimisticComment}
              />

              <ReplyList
                parentId={comment.id}
                replies={allReplies}
                currentUser={currentUser}
                onOpen={handleOpen}
                onGetId={handleGetId}
                onAddOptimistic={addOptimisticComment}
              />
            </li>
          );
        })}
      </ul>
      <AddComment
        currentUser={currentUser}
        onAddOptimistic={addOptimisticComment}
      />
      {modelOpen && <Confirmation onOpen={handleOpen} id={getId} />}
    </div>
  );
}

export default CommentContainer;
