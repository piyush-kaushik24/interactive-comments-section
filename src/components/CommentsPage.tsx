import { sql } from "@/lib/db";
import { Comment } from "@/types/comment";
import UserBar from "./UserBar";
import { getCurrentUser } from "@/lib/auth";
import CommentContainer from "./CommentContainer";
import Footer from "./Footer";

async function CommentsPage() {
  const currentUser = await getCurrentUser();
  const userComments = (await sql`
      SELECT 
        c.id,
        c.content,
        c.parent_id,
        c.score,
        c.replying_to,
        c.created_at AS "createdAt",
        c.user_id,
        u.username AS "user",
        u.avatar AS "image",
        v.vote AS "userVote"
      FROM comments c 
      INNER JOIN users u ON c.user_id = u.id 
      LEFT JOIN votes v
        ON c.id = v.voted_on_id
        AND v.user_id = ${currentUser?.id}
      ORDER BY c.created_at ASC
    `) as Comment[];

  return (
    <main className="px-4 py-8 lg:mx-auto lg:w-3/4 xl:w-2/4">
      <UserBar currentUser={currentUser} />
      <CommentContainer currentUser={currentUser} userComments={userComments} />
      <Footer />
    </main>
  );
}

export default CommentsPage;
