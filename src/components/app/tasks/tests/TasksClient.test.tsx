/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { useTaskReview } from "@/hooks/useTaskReview";
import TasksClient from "../components/Main/TasksClient";

vi.mock("@/hooks/useTaskReview");

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("../components", () => ({
  default: ({ header_name }: { header_name: string }) => (
    <div data-testid="main-page">{header_name}</div>
  ),
}));

vi.mock("../components/Modals/DailyReviewModal", () => ({
  default: ({
    count,
    onConfirm,
    onDiscard,
  }: {
    count: number;
    onConfirm: () => void;
    onDiscard: () => void;
  }) => (
    <div data-testid="review-modal">
      <span>pending:{count}</span>
      <button onClick={onConfirm}>confirm</button>
      <button onClick={onDiscard}>discard</button>
    </div>
  ),
}));

describe("TasksClient", () => {
  test("should call hook with correct section", () => {
    (useTaskReview as any).mockReturnValue({
      tasks: [],
      setTasks: vi.fn(),
      pendingTasks: [],
      isReviewOpen: false,
      handleReviewDecision: vi.fn(),
    });

    render(<TasksClient section="day" />);

    expect(useTaskReview).toHaveBeenCalledWith("day");
  });

  test("should render modal when review is open", () => {
    (useTaskReview as any).mockReturnValue({
      tasks: [],
      setTasks: vi.fn(),
      pendingTasks: [{ id: "1" }, { id: "2" }],
      isReviewOpen: true,
      handleReviewDecision: vi.fn(),
    });

    render(<TasksClient section="month" />);

    expect(screen.getByTestId("review-modal")).toBeInTheDocument();
    expect(screen.getByText("pending:2")).toBeInTheDocument();
  });

  test("should trigger confirm decision", async () => {
    const user = userEvent.setup();

    const handleReviewDecision = vi.fn();

    (useTaskReview as any).mockReturnValue({
      tasks: [],
      setTasks: vi.fn(),
      pendingTasks: [{ id: "1" }],
      isReviewOpen: true,
      handleReviewDecision,
    });

    render(<TasksClient section="year" />);

    await user.click(screen.getByText("confirm"));

    expect(handleReviewDecision).toHaveBeenCalledWith(true);
  });
});
