import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ResolvableProps = {
  message: string;
  type: "info" | "success" | "warning" | "error";
  theme?: "light" | "dark" | "system";
  open: boolean;
  duration?: number;
};

export default function Toastify({
  message,
  type,
  theme = "light",
  open,
  duration = 2000,
}: ResolvableProps) {
  const pathname = usePathname();
  const isFa = pathname.startsWith("/fa");

  useEffect(() => {
    if (open) {
      toast[type](
        <CustomToastContent title={type} message={message} isFa={isFa} />,
        {
          theme: theme,
          className: `toast-${type}`,
          autoClose: duration,
          position: isFa ? "top-right" : "top-left",
          rtl: isFa ? true : false,
          hideProgressBar: true,
        },
      );
    }
  }, [open, message, type, theme, duration, isFa]);

  const containerStyle: React.CSSProperties = {
    padding: "8px 16px",
    display: "block",
    width: "fit-content",
  };

  return (
    <ToastContainer
      position={isFa ? "top-right" : "top-left"}
      autoClose={duration}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      hideProgressBar
      theme={theme}
      closeButton={false}
      style={containerStyle}
    />
  );
}

// Custom component for toast content with title
const CustomToastContent: React.FC<{
  title: string;
  message: string;
  isFa: boolean;
}> = ({ title, message, isFa }) => {
  let newTitle;
  if (title === "success") {
    newTitle = isFa ? "موفق" : "success";
  } else if (title === "error") {
    newTitle = isFa ? "خطا" : "error";
  }
  if (title === "info") {
    newTitle = isFa ? "اطلاعات" : "info";
  }
  if (title === "warning") {
    newTitle = isFa ? "هشدار" : "warning";
  }
  return (
    <div className="pr-2">
      <p className="text-sm font-medium mb-1">{newTitle}</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};
