"use client";
import { loginAction, loginAsGuest } from "@/lib/auth";
import Input from "./Input";
import { useState } from "react";
import Button from "./buttons/Button";
import Link from "next/link";
import ProcessingOverlay from "./ProcessingOverlay";
import FormSubmitButton from "./buttons/FormSubmission";
function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  async function handleLogin(formData: FormData) {
    setError(null);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
    }
    setIsClicked(false);
  }

  function handleGuestLogin(status: boolean) {
    setIsClicked(status);
  }

  return (
    <main className="bg-primary-purple-200/50 flex min-h-screen items-center justify-center">
      <div className="bg-neutral-grey-100 w-3/4 space-y-6 rounded-xl p-6 md:w-100">
        <h1 className="sr-only text-center text-3xl">Log in</h1>
        <p className="text-center">
          <span className="font-semibold">Don&apos;t have an account? </span>
          <span className="text-primary-purple-600 inline-block font-bold underline transition-all hover:scale-105 hover:opacity-80">
            <Link className="cursor-pointer" href="/signup  ">
              Sign up
            </Link>
          </span>
        </p>
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <form
          action={handleLogin}
          className="*:border-neutral-grey-500 mx-auto flex flex-col gap-6 *:rounded-xl *:border-2"
        >
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
          <FormSubmitButton />
        </form>
        <div className="flex flex-col items-center gap-4">
          <p className="font-semibold">OR</p>
          <Button
            text="Continue as Guest"
            type="button"
            disabled={isClicked}
            className={
              isClicked ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }
            onClick={() => {
              loginAsGuest();
              handleGuestLogin(true);
            }}
          />
          {isClicked && <ProcessingOverlay />}
        </div>
      </div>
    </main>
  );
}

export default LoginForm;
