import { Button } from "@/components/core/Button";

export default function loading() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">لیست تسک ها </h1>

        <Button
          className="bg-blue-950 border border-white/20"
          lable={"تسک جدید"}
        />
      </div>

      <hr className="bg-none my-3 border-b-2 border-white/20" />

      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg p-6 text-center text-gray-300 font-bold">
        در حال بارگذاری تسک‌ها...
      </div>
    </div>
  );
}
