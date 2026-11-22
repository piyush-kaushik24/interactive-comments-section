import data from "@/data/data.json";
export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  replying_to?: string | null;
  user: string;
  image: string;
  score: number;
  parent_id: number | null;
  userVote: number | null;
  sending?: boolean;
};
export type Comments = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replies: Reply[];
  user: User;
};

export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type Reply = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
};
export type CommentsData = {
  currentUser: User;
  comments: Comments[];
};

export const comments: CommentsData = data;
export type AuthUser = {
  id: number;
  username: string;
  avatar: string;
};
