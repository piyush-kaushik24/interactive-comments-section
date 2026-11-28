"use client";

import { deleteComment } from "../app/actions/actions";
import ModelBtn from "@/components/buttons/ModelBtn";
import { useEffect, useRef, useState } from "react";
type ConfirmationProps = {
  onOpen: (status: boolean) => void;
  id: number;
  isOpen: boolean;
};
function Confirmation({ onOpen, id, isOpen }: ConfirmationProps) {
  const [isClicked, setIsClicked] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);
  return (
    <div>
      <dialog ref={dialogRef} onClose={() => onOpen(false)}>
        <div className="fixed top-1/2 left-1/2 z-30 grid w-[85%] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-white p-6 sm:w-sm">
          <h2 className="text-xl font-bold"> Delete comment</h2>
          <p className="text-neutral-grey-500">
            Are you sure you want to delete this comment? This will remove the
            comment and can’t be undone.
          </p>
          <div className="flex justify-between">
            <ModelBtn
              text="NO,CANCEL"
              className={`bg-neutral-grey-500 ${isClicked ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              disabled={isClicked}
              onClick={() => {
                onOpen(false);
              }}
            />
            <ModelBtn
              text="YES,DELETE "
              className={`bg-primary-pink-400 ${isClicked ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              onClick={async () => {
                setIsClicked(true);
                await deleteComment(id);

                onOpen(false);
              }}
            />
          </div>
        </div>
      </dialog>
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 backdrop-blur-[2px]">
          {" "}
        </div>
      )}
    </div>
  );
}

export default Confirmation;
