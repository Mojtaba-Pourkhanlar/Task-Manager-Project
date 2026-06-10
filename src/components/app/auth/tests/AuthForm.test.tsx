import { render, screen } from "@testing-library/react";
import AuthForm from "../AuthForm";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

const mockBack = vi.fn();
const mockSetAuthUser = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/hooks/useLocalStorage", () => ({
  useLocalStorage: () => [null, mockSetAuthUser, true],
}));

/// init tests

describe("AuthForm Integration Test", () => {
  test("should render login title", () => {
    render(<AuthForm />);
    const title = screen.getByText("ورود");
    expect(title).toBeInTheDocument();
  });
});

test("submit button should be disabled initially", () => {
  render(<AuthForm />);
  const submitButton = screen.getByRole("button", {
    name: "formBTNCreateAria",
  });
  expect(submitButton).toBeDisabled();
});

test("submit button should enable when inputs are valid", async () => {
  render(<AuthForm />);
  const user = userEvent.setup();

  const userNameInput = screen.getByPlaceholderText("userName");
  const emailInput = screen.getByPlaceholderText("email");
  const submitButton = screen.getByRole("button", {
    name: "formBTNCreateAria",
  });

  expect(submitButton).toBeDisabled();
  await user.type(userNameInput, "mojtabaDev");
  expect(submitButton).toBeDisabled();
  await user.type(emailInput, "mojtaba@example.com");
  expect(submitButton).toBeEnabled();
});

test("should call setAuthUser and router.back when submit clicked", async () => {
  render(<AuthForm />);
  const user = userEvent.setup();

  const userNameInput = screen.getByPlaceholderText("userName");
  const emailInput = screen.getByPlaceholderText("email");
  const submitButton = screen.getByRole("button", {
    name: "formBTNCreateAria",
  });

  await user.type(userNameInput, "mojtabaDev");
  await user.type(emailInput, "mojtaba@example.com");

  await user.click(submitButton);

  expect(mockSetAuthUser).toHaveBeenCalledWith({
    userName: "mojtabaDev",
    email: "mojtaba@example.com",
  });

  expect(mockBack).toHaveBeenCalled();
});
