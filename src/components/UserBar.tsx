import { logout } from "@/lib/auth";
import Link from "next/link";
import { AuthUser } from "@/types/comment";
import UserAvatar from "./UserAvatar";
import FormSubmitButton from "./buttons/FormSubmission";

type UserBarProps = {
  currentUser: AuthUser | null;
};
function UserBar({ currentUser }: UserBarProps) {
  return (
    <div className="bg-primary-purple-200 border-neutral-grey-800/50 sticky top-5 z-50 mb-4 rounded-xl border-2 p-4 shadow-lg">
      {currentUser ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar currentUser={currentUser} />
            <p className="font-bold">{currentUser.username}</p>
          </div>
          <form action={logout}>
            <FormSubmitButton text="Log Out" action="Logging Out" />
          </form>
        </div>
      ) : (
        <div className="flex justify-center">
          <Link
            href="/login"
            className="cursor-pointer font-bold text-blue-500 underline"
          >
            Login to comment
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserBar;
