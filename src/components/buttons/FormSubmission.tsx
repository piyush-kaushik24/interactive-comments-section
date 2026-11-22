"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";

import ProcessingOverlay from "../ProcessingOverlay";

type FormSubmitButtonProps = {
  text?: string;
  action?: string;
};
export default function FormSubmitButton({
  text = "Login",
  action = " Logging in",
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        text={text}
        type="submit"

        disabled={pending}
        className={pending ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      />

      {pending && <ProcessingOverlay action={action} />}
    </>
  );
}
