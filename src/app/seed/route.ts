import { sql } from "@/lib/db";
import { comments } from "@/types/comment";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

async function seedDatabase() {
  await sql`DROP TABLE IF EXISTS sessions CASCADE`;
  await sql`DROP TABLE IF EXISTS comments CASCADE`;
  await sql`DROP TABLE IF EXISTS users CASCADE`;

  await sql`
    CREATE TABLE users (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      avatar TEXT NOT NULL
    );
  `;

  await sql`
    CREATE TABLE sessions (
      id TEXT PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL
    );
  `;

  await sql`
    CREATE TABLE comments (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      score INTEGER NOT NULL DEFAULT 0,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      replying_to TEXT,
      parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE
    );
  `;

  await sql`
    CREATE TABLE votes (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      voted_on_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
      vote INTEGER DEFAULT 0 NOT NULL
    );
  `;

  const defaultPasswordHash = await bcrypt.hash("password123", 10);

  const initialUsers = [
    {
      username: "amyrobson",
      email: "amyrobson@example.com",
      avatar: "/avatars/image-amyrobson.png",
    },
    {
      username: "maxblagun",
      email: "maxblagun@example.com",
      avatar: "/avatars/image-maxblagun.png",
    },
    {
      username: "ramsesmiron",
      email: "ramsesmiron@example.com",
      avatar: "/avatars/image-ramsesmiron.png",
    },
    {
      username: "juliusomo",
      email: "juliusomo@example.com",
      avatar: "/avatars/image-juliusomo.png",
    },
  ];

  const userMap: Record<string, number> = {};

  for (const user of initialUsers) {
    const [inserted] = await sql`
      INSERT INTO users (username, email, password_hash, avatar)
      VALUES (${user.username}, ${user.email}, ${defaultPasswordHash}, ${user.avatar})
      RETURNING id, username
    `;
    userMap[inserted.username] = inserted.id;
  }

  for (const comment of comments.comments) {
    const authorId = userMap[comment.user.username];
    const [insertedComment] = await sql`
      INSERT INTO comments (content, score, user_id)
      VALUES (${comment.content}, ${comment.score}, ${authorId}) 
      RETURNING id 
    `;

    for (const reply of comment.replies) {
      const replyAuthorId = userMap[reply.user.username];
      await sql`
        INSERT INTO comments (content, score, user_id, replying_to, parent_id)
        VALUES (${reply.content}, ${reply.score}, ${replyAuthorId}, ${reply.replyingTo}, ${insertedComment.id})
      `;
    }
  }
}

export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({
      message: "Seeded successfully with users and auth tables!",
    });
  } catch (err: unknown) {
    console.error("Seed error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to seed database" },
      { status: 500 },
    );
  }
}
