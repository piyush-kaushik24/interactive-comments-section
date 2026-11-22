import CommentsPage from "@/components/CommentsPage";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <CommentsPage />
    </div>
  );
}

export default page;
