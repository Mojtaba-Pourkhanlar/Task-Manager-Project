import "@testing-library/jest-dom";
import { vi } from "vitest";

//  پاکسازی  بعد از هر تست
afterEach(() => {
  vi.clearAllMocks();
});
