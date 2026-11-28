import Spinner from "@/components/Spinner";

function ProcessingOverlay({ action = "Logging in" }: { action?: string }) {
  return (
    <div>
      <div
        role="status"
        className="bg-primary-purple-600 absolute top-1/2 left-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-2xl border border-white/10 px-6 py-4 text-lg font-semibold text-white shadow-xl backdrop-blur-sm"
      >
        <p>{action}</p>
        <Spinner />
      </div>

      <div className="fixed inset-0 z-20 bg-black/40 backdrop-blur-[2px]" />
    </div>
  );
}

export default ProcessingOverlay;
