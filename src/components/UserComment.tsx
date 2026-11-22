import { Comment } from "@/types/comment";
import Image from "next/image";
import { AuthUser } from "@/types/comment";
import UserAvatar from "./UserAvatar";
type Props = {
  comment: Comment;
  currentUser: AuthUser | null;
  isEditing: boolean;
  onEdit: () => void;
  date: string;
};
function UserComment({ comment, currentUser, date }: Props) {
  const avatarUrl = comment.image.startsWith(`/avatar`);
  return (
    <>
      <div className="grid grid-cols-[3rem_1fr]">
        {avatarUrl ? (
          <div>
            <Image
              src={comment.image}
              alt={comment.user}
              width={30}
              height={30}
            />
          </div>
        ) : (
          <div>
            {!currentUser ? (
              <UserAvatar currentUser={currentUser} />
            ) : (
              <div className="bg-neutral-grey-500 flex h-8 w-8 items-center justify-center rounded-full">
                <p className="text-neutral-grey-100 text-lg font-bold">
                  {comment.image}
                </p>
              </div>
            )}
          </div>
        )}

        {currentUser?.username === comment.user ? (
          <div className="flex items-center gap-4 rounded-lg">
            <p className="font-bold">{comment.user}</p>

            <span className="bg-primary-purple-600 rounded-sm px-1 text-sm font-medium text-white">
              You
            </span>
            <p> {date}</p>
          </div>
        ) : (
          <div className="flex gap-4">
            <p className="font-medium">{comment.user}</p>
            <p className="text-neutral-grey-500"> {date}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default UserComment;
