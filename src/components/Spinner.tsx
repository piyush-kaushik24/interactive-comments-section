"use client";

function Spinner() {
  return (
    <div className="h-6 w-6 animate-spin rounded-lg bg-white p-1">
      <div className="bg-neutral-grey-800 mx-auto h-full w-full"></div>
    </div>
  );
}

export default Spinner;
