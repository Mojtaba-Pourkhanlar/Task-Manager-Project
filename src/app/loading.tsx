export default function loading() {
  return (
    <div className="p-10 max-w-150 mx-auto">
      <div className="flex items-center justify-between">
        <div className="h-6 w-38 rounded-md bg-white/20 animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-10 w-9 rounded-xl bg-white/15 border border-white/20 backdrop-blur-xl shadow-lg animate-pulse" />
          <div className="h-10 w-9 rounded-xl bg-white/15 border border-white/20 backdrop-blur-xl shadow-lg animate-pulse" />
          <div className="h-10 w-19 rounded-xl bg-white/15 border border-white/20 backdrop-blur-xl shadow-lg animate-pulse" />
        </div>
      </div>

      <hr className="bg-none my-3 border-b-2 border-white/20" />

      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg p-6">
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center gap-4 border-t border-white/10 pt-4"
            >
              <div className="h-4 w-5 bg-white/15 rounded-full" />
              <div className="h-3 w-32 bg-white/15 rounded-md" />
              <div className="h-3 w-24 bg-white/15 rounded-md" />
              <div className="h-3 w-20 bg-white/15 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
