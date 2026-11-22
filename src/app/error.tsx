"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-red-50 p-4 text-center">
      <div className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-md">
        <h2 className="text-neutral-grey-800 text-2xl font-bold">
          Something went wrong!
        </h2>
        <p className="text-neutral-grey-500 text-md font-semibold">
          {error.message ||
            "An unexpected error occurred while loading this page."}
        </p>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => reset()} // Next.js re-tries rendering the failed component!
            className="bg-primary-purple-600 hover:bg-primary-purple-200 rounded-lg px-5 py-2 font-semibold text-white transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
}
