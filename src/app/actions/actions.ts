"use server";
import { getCurrentUser } from "@/lib/auth";

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: You must be logged in.");
  }
  return user;
}

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
async function voteComment(id: number, voteValue: 1 | -1) {
  const user = await requireUser();

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid comment ID.");
  }

  const [comment] = await sql`
    SELECT id, user_id FROM comments WHERE id = ${id}
  `;
  if (!comment) {
    throw new Error("Comment not found.");
  }
  if (comment.user_id === user.id) {
    throw new Error("You cannot vote on your own comment.");
  }

  const [existingVote] = await sql`
    SELECT vote FROM votes
    WHERE user_id = ${user.id} AND voted_on_id = ${id}
  `;

  if (existingVote?.vote === voteValue) {
    return;
  }

  const scoreChange = existingVote ? voteValue : voteValue;

  await sql`
    INSERT INTO votes (user_id, voted_on_id, vote)
    VALUES (${user.id}, ${id}, ${voteValue})
    ON CONFLICT (user_id, voted_on_id)
    DO UPDATE SET vote = ${voteValue}
  `;

  await sql`
    UPDATE comments
    SET score = score + ${scoreChange}
    WHERE id = ${id}
  `;

  revalidatePath("/comments");
}

export async function increaseScore(id: number) {
  await voteComment(id, 1);
}

export async function decreaseScore(id: number) {
  await voteComment(id, -1);
}

export async function addReply(formData: FormData, parent_id: number) {
  const user = await requireUser();
  const rawReply = formData.get("reply");
  const reply = typeof rawReply === "string" ? rawReply.trim() : "";

  if (!Number.isInteger(parent_id) || parent_id <= 0) {
    throw new Error("Invalid parent comment ID.");
  }
  if (!reply) {
    throw new Error("Reply cannot be empty");
  }

  const [parentComment] = await sql`
    SELECT c.id, u.username
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.id = ${parent_id}
  `;

  if (!parentComment) {
    throw new Error("Parent comment not found.");
  }

  await sql`
    INSERT INTO comments (content, replying_to, parent_id, user_id)
    VALUES (${reply}, ${parentComment.username}, ${parent_id}, ${user.id})
  `;

  revalidatePath("/comments");
}

export async function addComment(formData: FormData) {
  const user = await requireUser();
  const rawComment = formData.get("add-comment");
  const comment = typeof rawComment === "string" ? rawComment.trim() : "";
  if (!comment) {
    throw new Error("comment cannot be empty");
  }

  await sql`INSERT INTO comments (user_id,content,replying_to,parent_id) 
  VALUES (${user.id},${comment},null,null)`;

  revalidatePath("/comments");
}

export async function deleteComment(id: number) {
  const user = await requireUser();

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid comment ID.");
  }

  const deleted = await sql`
    DELETE FROM comments
    WHERE id = ${id} AND user_id = ${user.id}
    RETURNING id
  `;

  if (deleted.length === 0) {
    throw new Error("Comment not found or you are not allowed to delete it.");
  }

  revalidatePath("/comments");
}
export async function editComment(id: number, content: string) {
  const user = await requireUser();
  const trimmed = typeof content === "string" ? content.trim() : "";

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid comment ID.");
  }
  if (!trimmed) {
    throw new Error("Comment cannot be empty.");
  }

  const updated = await sql`
    UPDATE comments
    SET content = ${trimmed}
    WHERE id = ${id} AND user_id = ${user.id}
    RETURNING id
  `;

  if (updated.length === 0) {
    throw new Error("Comment not found or you are not allowed to edit it.");
  }

  revalidatePath("/comments");
}
