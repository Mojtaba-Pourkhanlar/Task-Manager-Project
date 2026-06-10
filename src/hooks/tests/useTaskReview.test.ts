/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, vi } from "vitest";

import { useToast } from "@/context/ToastContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTaskReview } from "../useTaskReview";

vi.mock("@/hooks/useLocalStorage");
vi.mock("@/context/ToastContext");

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("useTaskReview", () => {
  const mockShowToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useToast as any).mockReturnValue({
      showToast: mockShowToast,
    });
  });

  test("should open review when period changed and unfinished tasks exist", async () => {
    const tasks = [
      { id: "1", done: false },
      { id: "2", done: true },
    ];

    const setTasks = vi.fn();
    const setHistory = vi.fn();
    const setLastPeriod = vi.fn();

    (useLocalStorage as any).mockImplementation((key: string) => {
      if (key.includes("tasks")) {
        return [tasks, setTasks, true];
      }
      if (key.includes("history")) {
        return [[], setHistory, true];
      }
      if (key.includes("last-period")) {
        return ["2023-01-01", setLastPeriod, true];
      }
    });

    const { result } = renderHook(() => useTaskReview("day"));

    await waitFor(() => {
      expect(result.current.pendingTasks.length).toBe(1);
    });

    expect(result.current.isReviewOpen).toBe(true);
  });
});
