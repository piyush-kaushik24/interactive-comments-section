import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  redirect("/comments");
}

export default page;
