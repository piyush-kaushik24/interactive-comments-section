import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-primary-purple-200/50 flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-primary-purple-600 text-6xl font-bold">404</h1>
        <h2 className="text-neutral-grey-800 text-2xl font-bold">
          Page Not Found
        </h2>
        <p className="text-neutral-grey-500 text-md font-semibold">
          Sorry, we couldn&apos;t find the page you are looking for.
        </p>

        <Link
          href="/comments"
          className="bg-primary-purple-600 hover:bg-primary-purple-200 inline-block rounded-lg px-6 py-2 font-semibold text-white transition"
        >
          Back to Comments
        </Link>
      </div>
    </main>
  );
}
