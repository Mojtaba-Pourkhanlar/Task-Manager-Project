import { Route } from "next";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto text-center flex flex-col items-center justify-center gap-5 mt-10">
      <h1 className="text-4xl font-bold mb-4">صفحه مورد نظر پیدا نشد</h1>
      <Link
        href={"/day" as Route}
        className="py-2 px-5  text-[#007AFF] border-2 border-[#007AFF] rounded-lg shadow transition cursor-pointer"
      >
        بازگشت
      </Link>
    </div>
  );
}
