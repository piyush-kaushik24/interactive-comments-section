"use client";
import Image from "next/image";
import { AuthUser } from "@/types/comment";
type UserAvatarProps = {
  currentUser: AuthUser | null;
};

function UserAvatar({ currentUser }: UserAvatarProps) {
  const guestAvatar = currentUser?.avatar.startsWith("/");
  const guestName = currentUser?.username.startsWith("guest_");

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      {guestAvatar && guestName ? (
        <div>
          <Image
            src={currentUser.avatar}
            alt={currentUser.username}
            width={30}
            height={30}
            
          />
        </div>
      ) : (
        <div className="bg-neutral-grey-500 flex h-8 w-8 items-center justify-center rounded-full">
          <p className="text-neutral-grey-100 text-lg font-bold">
            {currentUser.avatar}
          </p>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
