"use client";

import { signUp } from "@/lib/auth";
import Link from "next/link";
import { useState } from "react";
import Input from "./Input";
import FormSubmitButton from "./buttons/FormSubmission";

function SignUPForm() {
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await signUp(formData);
    if (result?.error) {
      setError(result.error);
    }
  }
  return (
    <main className="bg-primary-purple-200/50 flex min-h-screen items-center justify-center">
      <div className="bg-neutral-grey-100 w-3/4 space-y-6 rounded-xl p-6 md:w-100">
        <h1 className="sr-only text-center text-3xl">Sign Up</h1>
        <p className="text-center">
          <span className="text-neutral-grey-500">
            Already have an account?{" "}
          </span>
          <span className="text-primary-purple-600 inline-block font-bold underline transition-all hover:scale-105 hover:opacity-80">
            <Link className="cursor-pointer" href="/login">
              Log in
            </Link>
          </span>
        </p>
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <form
          action={handleSubmit}
          className="*:border-neutral-grey-500 mx-auto flex flex-col gap-6 *:rounded-xl *:border-2"
        >
          <Input
            id="name"
            type="text"
            placeholder="Enter your Username"
            name="username"
          />
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
          />
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
          />
          <FormSubmitButton text="Sign Up" action="Please wait" />
        </form>
      </div>
    </main>
  );
}

export default SignUPForm;
