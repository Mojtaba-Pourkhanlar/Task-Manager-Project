/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { redirect } from "next/navigation";
import { VERSION } from "@/constants";
import ProfileClient from "..";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/hooks/useLocalStorage", () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("../tasks/components/Header/NotTasks", () => ({
  default: ({ name }: { name: string }) => <div>{name}</div>,
}));

vi.mock("./WarrningModal", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div>
      <p>warning modal</p>
      <button onClick={onClose}>close modal</button>
    </div>
  ),
}));

//  tests
describe("ProfileClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render sign in button when user is not logged in", () => {
    (useLocalStorage as any).mockReturnValue([null]);

    render(<ProfileClient />);

    expect(screen.getByText("panel")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "signInAria" }),
    ).toBeInTheDocument();
    expect(screen.getByText("sginIn")).toBeInTheDocument();
  });

  test("should call redirect when sign in button is clicked", async () => {
    const user = userEvent.setup();
    (useLocalStorage as any).mockReturnValue([null]);

    render(<ProfileClient />);

    const signInButton = screen.getByRole("button", { name: "signInAria" });
    await user.click(signInButton);

    expect(redirect).toHaveBeenCalledWith("/auth");
  });

  test("should render user info when user is logged in", () => {
    (useLocalStorage as any).mockReturnValue([
      {
        userName: "Mojtaba Ahmadi",
        email: "mojtaba@test.com",
      },
    ]);

    render(<ProfileClient />);

    expect(screen.getByText("Mojtaba Ahmadi")).toBeInTheDocument();
    expect(screen.getByText("mojtaba@test.com")).toBeInTheDocument();
    expect(screen.getByText("MA")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "logoutBTNAria" }),
    ).toBeInTheDocument();
    expect(screen.getByText(VERSION)).toBeInTheDocument();
  });

  test("should open warning modal when logout button is clicked", async () => {
    const user = userEvent.setup();

    (useLocalStorage as any).mockReturnValue([
      {
        userName: "Mojtaba Ahmadi",
        email: "mojtaba@test.com",
      },
    ]);

    render(<ProfileClient />);

    const logoutButton = screen.getByRole("button", { name: "logoutBTNAria" });
    await user.click(logoutButton);

    expect(screen.getByText("modalHeader")).toBeInTheDocument();
  });
});
