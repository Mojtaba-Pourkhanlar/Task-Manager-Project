"use client";

import { Button } from "@/components/core/Button";
import { Upload, Download } from "lucide-react";
import { Modal } from "@/components/core/Modal";
import { Task } from "@/types";
import { TaskExportFile, TaskSection } from "@/types/task-transfer";
import {
  downloadTasksAsJson,
  normalizeImportedTasks,
  parseTaskImportFile,
} from "@/utils/taskTransfer";
import { useRef, useState } from "react";
import { useToast } from "@/context/ToastContext";

interface Props {
  section: TaskSection;
  tasks: Task[];
  onImportConfirm: (tasks: Task[]) => void;
}

export default function ImportExportActions({
  section,
  tasks,
  onImportConfirm,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const [preview, setPreview] = useState<TaskExportFile | null>(null);
  const [normalizedTasks, setNormalizedTasks] = useState<Task[]>([]);

  const handleDownload = () => {
    downloadTasksAsJson(section, tasks);
    showToast("success", "عملیات با موفقیت انجام شد.");
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    try {
      const parsed = await parseTaskImportFile(file);

      if (parsed.section !== section) {
        showToast("error", "این فایل مربوط به این بخش نیست.");
        throw new Error("");
      }

      const cleanedTasks = normalizeImportedTasks(parsed.tasks, tasks);

      setPreview(parsed);
      setNormalizedTasks(cleanedTasks);
    } catch (err) {
      setPreview(null);
      setNormalizedTasks([]);
      showToast("error", "خطا در خواندن فایل رخ داد.");
      console.error(err);
      throw new Error("");
    }
  };

  const handleConfirmImport = () => {
    showToast("success", "عملیات با موفقیت انجام شد.");
    onImportConfirm(normalizedTasks);
    setPreview(null);
    setNormalizedTasks([]);
  };

  const handleCloseModal = () => {
    setPreview(null);
    setNormalizedTasks([]);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={handleFileChange}
          aria-hidden="true"
        />

        {/* Upload */}
        <button
          type="button"
          className="p-2 rounded-xl bg-white/20 hover:bg-white/10 cursor-pointer border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
          title="آپلود فایل"
          aria-label="آپلود فایل JSON از دستگاه"
          aria-controls="file-upload"
          onClick={handleOpenFilePicker}
        >
          <Upload size={18} aria-hidden="true" />
        </button>

        {/* Download */}
        <button
          type="button"
          className="p-2 rounded-xl bg-white/20 hover:bg-white/10 cursor-pointer border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
          title="دانلود فایل"
          aria-label="دانلود فایل JSON تسک‌ها"
          onClick={handleDownload}
        >
          <Download size={18} aria-hidden="true" />
        </button>
      </div>

      {preview && (
        <Modal
          isOpen={true}
          onClose={() => setPreview(null)}
          header="تأیید آپلود تسک‌ها"
        >
          <div className="space-y-4">
            <p className="text-sm text-white/80">
              <strong>{normalizedTasks.length} تسک </strong> از فایل انتخاب شده
              آماده اضافه شدن به این بخش هستند.
            </p>

            <div className="text-sm space-y-1 text-white/70">
              <p>بخش فایل: {preview.section}</p>
              <p>تعداد تسک‌ها: {preview.tasks.length}</p>
              <p>
                زمان خروجی:{" "}
                {new Date(preview.exportedAt).toLocaleString("fa-IR")}
              </p>
            </div>

            <div className="max-h-48 overflow-y-auto rounded-lg border border-white/10 p-3 bg-white/5">
              <ul className="space-y-2 text-sm">
                {normalizedTasks.slice(0, 5).map(task => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{task.title}</span>
                    <span className="text-white/60 text-xs whitespace-nowrap">
                      {task.priority === "high"
                        ? "خیلی مهم"
                        : task.priority === "medium"
                          ? "مهم"
                          : "کم"}
                    </span>
                  </li>
                ))}
              </ul>

              {normalizedTasks.length > 5 && (
                <p className="text-xs text-white/50 mt-3">
                  و {normalizedTasks.length - 5} تسک دیگر...
                </p>
              )}
            </div>

            <p className="text-xs text-yellow-300">
              با تأیید، این تسک‌ها به لیست فعلی اضافه می‌شوند و جایگزین کامل
              انجام نمی‌شود.
            </p>
          </div>

          <div className="flex justify-between gap-3 mt-4">
            <Button
              className="bg-gray-800 border border-white/20"
              onClick={handleCloseModal}
              label={"انصراف"}
              title={"انصراف"}
              aria-label="انصراف از اعمال تسک ها و بستن مودال"
            />
            <Button
              className="bg-green-900 border border-white/20"
              onClick={handleConfirmImport}
              label={"تأیید و افزودن"}
              title={"تأیید و افزودن"}
              aria-label={"تأیید و افزودن تسک ها به لیست و جدول"}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
