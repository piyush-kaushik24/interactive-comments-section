"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { AuthUser } from "@/types/comment";

export async function increaseScore(id: number, currentUser: AuthUser | null) {
  if (!currentUser) return;

  await sql`
    INSERT INTO votes (user_id, voted_on_id, vote)
    VALUES (${currentUser.id}, ${id}, 1)
    ON CONFLICT (user_id, voted_on_id)
    DO UPDATE SET vote = 1
  `;

  await sql`
    UPDATE comments 
    SET score = score + 1 
    WHERE id = ${id}
  `;

  revalidatePath("/comments");
}

export async function decreaseScore(id: number, currentUser: AuthUser | null) {
  if (!currentUser) return;

  await sql`
    INSERT INTO votes (user_id, voted_on_id, vote)
    VALUES (${currentUser.id}, ${id}, -1)
    ON CONFLICT (user_id, voted_on_id)
    DO UPDATE SET vote = -1
  `;

  await sql`
    UPDATE comments 
    SET score = score - 1 
    WHERE id = ${id}
  `;

  revalidatePath("/comments");
}
export async function addReply(
  formData: FormData,
  parent_id: number,
  replying_to: string,
  user_id: number,
) {
  const reply = formData.get("reply") as string;

  await sql`INSERT INTO comments (content, replying_to ,parent_id,user_id) VALUES (${reply}, ${replying_to} ,${parent_id},${user_id})`;
  revalidatePath("/comments");
}

export async function addComment(formData: FormData, id: number) {
  const comment = formData.get("add-comment") as string;

  await sql`INSERT INTO comments (user_id,content,replying_to,parent_id) VALUES (${id},${comment},null,null)`;

  revalidatePath("/comments");
}

export async function deleteComment(id: number | null) {
  await sql`DELETE FROM comments WHERE id = ${id}`;
  revalidatePath("/comments");
}

export async function editComment(id: number, content: string) {
  await sql`UPDATE comments SET content = ${content} WHERE id = ${id}`;
  revalidatePath("/comments");
}
