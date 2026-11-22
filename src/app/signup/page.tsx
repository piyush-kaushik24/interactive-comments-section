import SignUPForm from "@/components/SignUPForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/comments");
  }
  return <SignUPForm />;
}

export default page;
