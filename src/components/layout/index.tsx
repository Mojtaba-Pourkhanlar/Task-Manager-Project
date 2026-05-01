"use client";

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-[600px] min-h-screen bg-background text-foreground shadow-[0_0_5px_rgba(100,100,100,0.5)]">
        {children}
      </div>
    </div>
  );
}
