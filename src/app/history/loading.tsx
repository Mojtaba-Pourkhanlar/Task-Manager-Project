export default function Loading() {
  return (
    <div className="p-3 max-w-150 mx-auto">
      <div className="flex items-center justify-between">
        <div className="h-9 w-38 rounded-md skeleton-bg-strong animate-pulse" />

        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl skeleton-glass skeleton-border shadow-lg animate-pulse" />
          <div className="h-9 w-9 rounded-xl skeleton-glass skeleton-border shadow-lg animate-pulse" />
        </div>
      </div>

      <hr className="bg-none my-2 border-b-2 skeleton-border" />

      <div className="flex items-center justify-between mb-2">
        <div className="h-9 w-44 rounded-xl skeleton-glass skeleton-border shadow-lg animate-pulse" />
      </div>

      <div className="rounded-2xl skeleton-border skeleton-glass shadow-lg p-6 mt-16">
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center gap-4 border-t skeleton-border-soft pt-4"
            >
              <div className="h-3 w-full skeleton-bg rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
