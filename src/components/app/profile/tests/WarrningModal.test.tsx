import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import WarrningModal from "../WarrningModal";
import { clearUserData } from "@/constants";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/components/ui/Modal", () => ({
  Modal: ({
    children,
    isOpen,
    header,
  }: {
    children: React.ReactNode;
    isOpen: boolean;
    header: string;
  }) =>
    isOpen ? (
      <div>
        <h1>{header}</h1>
        {children}
      </div>
    ) : null,
}));

vi.mock("@/components/ui/Button", () => ({
  Button: ({
    onClick,
    label,
    ...props
  }: {
    onClick: () => void;
    label: string;
  }) => (
    <button onClick={onClick} {...props}>
      {label}
    </button>
  ),
}));

describe("WarrningModal", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    Object.defineProperty(window, "location", {
      value: {
        reload: vi.fn(),
      },
      writable: true,
    });
  });

  test("should render modal texts", () => {
    render(<WarrningModal onClose={onClose} />);

    expect(screen.getByText("modalHeader")).toBeInTheDocument();
    expect(screen.getByText("warningTitle")).toBeInTheDocument();
    expect(screen.getByText("warningDesc")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "cancelBtnAria" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "confirmBtnAria" }),
    ).toBeInTheDocument();
  });

  test("should call onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();

    render(<WarrningModal onClose={onClose} />);

    const cancelButton = screen.getByRole("button", { name: "cancelBtnAria" });
    await user.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("should clear storage, call onClose and reload page on confirm", async () => {
    const user = userEvent.setup();

    localStorage.setItem("auth_user", "test");
    localStorage.setItem("day-history", "test");
    localStorage.setItem("day-last-period", "test");
    localStorage.setItem("day-tasks", "test");
    localStorage.setItem("month-history", "test");
    localStorage.setItem("month-last-period", "test");
    localStorage.setItem("month-tasks", "test");
    localStorage.setItem("year-history", "test");
    localStorage.setItem("year-last-period", "test");
    localStorage.setItem("year-tasks", "test");

    render(<WarrningModal onClose={onClose} />);

    const confirmButton = screen.getByRole("button", {
      name: "confirmBtnAria",
    });
    await user.click(confirmButton);

    expect(clearUserData());

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
