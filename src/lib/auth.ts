"use server";

import { sql } from "@/lib/db";
import { AuthUser } from "@/types/comment";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!username || !email || !password) {
    return { error: "Please fill in all fields" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  const existingUser = await sql`
    SELECT id FROM users 
    WHERE username = ${username} OR email = ${email}
  `;

  if (existingUser.length > 0) {
    return { error: "Username or email is already registered" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const avatar = username;
  const firstLetter = avatar.charAt(0).toUpperCase();

  const [newUser] = await sql`
    INSERT INTO users (username, email, password_hash, avatar)
    VALUES (${username}, ${email}, ${passwordHash}, ${firstLetter})
    RETURNING id
  `;

  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await sql`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (${sessionId}, ${newUser.id}, ${expiresAt})
  `;

  const cookieStore = await cookies();
  cookieStore.set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  redirect("/comments");
}

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;
  if (!email || !password) {
    return { error: "Please fill in all fields" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  const [user] = await sql`
    SELECT id, email, password_hash
    FROM users
    WHERE email = ${email}
  `;

  if (!user || user.email !== email) {
    return { error: "Invalid credentials" };
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return { error: "Invalid password" };
  }

  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await sql`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (${sessionId}, ${user.id}, ${expiresAt})
  `;

  const cookieStore = await cookies();
  cookieStore.set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  redirect("/comments");
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  if (!sessionId) {
    return null;
  }

  const [rows] = await sql`
    SELECT u.id, u.username, u.avatar
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.id = ${sessionId}
      AND s.expires_at > NOW()
  `;

  if (!rows) {
    return null;
  }

  return rows as AuthUser;
}

export async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  if (sessionId) {
    await sql`DELETE FROM sessions WHERE id = ${sessionId}`;

    cookieStore.delete("session_id");
  }
}

export async function loginAsGuest() {
  const guestNumber = Math.floor(1000 + Math.random() * 9000);
  const username = `guest_${guestNumber}`;
  const email = `${username}@guest.local`;
  const defaultAvatar = "/avatars/guest.png";

  const [newGuest] = await sql`
    INSERT INTO users (username, email, password_hash, avatar)
    VALUES (${username}, ${email}, 'GUEST_ACCOUNT', ${defaultAvatar})
    RETURNING id
  `;

  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await sql`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (${sessionId}, ${newGuest.id}, ${expiresAt})
  `;

  const cookieStore = await cookies();
  cookieStore.set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  redirect("/comments");
}
