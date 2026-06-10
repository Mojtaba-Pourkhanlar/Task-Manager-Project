/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { HistoryList } from "../HistoryList";
import { vi, describe, test, expect } from "vitest";
import { useTaskReview } from "@/hooks/useTaskReview";

vi.mock("@/hooks/useTaskReview", () => ({
  useTaskReview: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/store/locale", () => ({
  useLocaleStore: () => ({ locale: "fa-IR" }),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// tests

describe("HistoryList Component", () => {
  test("باید پیام emptyHistory را وقتی دیتا نیست نمایش دهد", () => {
    (useTaskReview as any).mockReturnValue({
      history: [],
      validHistory: [],
    });

    render(<HistoryList type="day" titleKey="dayHistorys" />);

    expect(screen.getByText("emptyHistory")).toBeInTheDocument();
  });

  test("باید لیست تسک‌ها را وقتی دیتا موجود است رندر کند", () => {
    const mockData = [
      {
        date: "2024-06-10",
        total: 1,
        done: 1,
        tasks: [{ id: "101", title: "تسک تستی مجتبی", done: true }],
      },
    ];

    (useTaskReview as any).mockReturnValue({
      history: mockData,
      validHistory: mockData,
    });

    render(<HistoryList type="month" titleKey="monthHistorys" />);

    expect(screen.getByText("تسک تستی مجتبی")).toBeInTheDocument();

    expect(screen.getByText(/isDone/)).toBeInTheDocument();
  });

  test("تسک‌های انجام نشده باید کلاس رنگ قرمز داشته باشند", () => {
    const mockData = [
      {
        date: "2024-06-11",
        total: 1,
        done: 0,
        tasks: [{ id: "102", title: "تسک انجام نشده", done: false }],
      },
    ];

    (useTaskReview as any).mockReturnValue({
      history: mockData,
      validHistory: mockData,
    });

    render(<HistoryList type="year" titleKey="yearHistorys" />);

    const taskElement = screen.getByText("تسک انجام نشده");
    expect(taskElement).toHaveClass("bg-red-100");
  });
  
  test("تسک‌های انجام شده باید کلاس رنگ سبز داشته باشند", () => {
    const mockData = [
      {
        date: "2024-06-11",
        total: 1,
        done: 0,
        tasks: [{ id: "102", title: "تسک انجام شده", done: true }],
      },
    ];

    (useTaskReview as any).mockReturnValue({
      history: mockData,
      validHistory: mockData,
    });

    render(<HistoryList type="year" titleKey="yearHistorys" />);

    const taskElement = screen.getByText("تسک انجام شده");
    expect(taskElement).toHaveClass("bg-green-100");
  });
});
