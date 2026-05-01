import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  header: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, header, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div
        className="
          w-80 rounded-2xl p-4
          backdrop-blur-sm
          border border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        "
      >
        <h2 className="mb-4 text-lg font-semibold text-white drop-shadow">
          {header}
        </h2>

        <div className="text-white/90">{children}</div>
      </div>
    </div>
  );
};
