import LoginForm from "@/components/LoginForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/comments");
  }
  return <LoginForm />;
}

export default page;
