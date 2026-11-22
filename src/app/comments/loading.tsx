export function loading() {
  return (
    <div className="*:bg-neutral-grey-500 px-4 py-8 *:mt-4 *:rounded-2xl lg:mx-auto lg:w-3/4 xl:w-2/4">
      <div className="*:bg-primary-purple-200/30 flex gap-4 p-6 *:animate-pulse">
        <div className="rounded-full p-6"></div>
        <div className="w-full rounded-full"></div>
      </div>
      <div className="*:bg-primary-purple-200/30 flex h-screen flex-col justify-between p-4 *:animate-pulse">
        <div className="h-full rounded-2xl p-16"></div>
      </div>
      <div className="*:bg-primary-purple-200/30 p-4 *:animate-pulse">
        <div className="rounded-2xl p-16"></div>
      </div>
    </div>
  );
}

export default loading;
