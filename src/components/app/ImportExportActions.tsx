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
import { useTranslations } from "next-intl";
import { coreStyles as s } from "./core.styles";

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
  const t = useTranslations("public");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const [preview, setPreview] = useState<TaskExportFile | null>(null);
  const [normalizedTasks, setNormalizedTasks] = useState<Task[]>([]);

  const handleDownload = () => {
    console.log("tasks", tasks);
    if (tasks.length > 0) {
      downloadTasksAsJson(section, tasks);
      showToast("success", t("downloadTask"));
    } else {
      showToast("error", t("downloadErr"));
    }
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
        showToast("error", t("uploadErr"));
        throw new Error("");
      }

      const cleanedTasks = normalizeImportedTasks(parsed.tasks, tasks);

      setPreview(parsed);
      setNormalizedTasks(cleanedTasks);
    } catch (err) {
      setPreview(null);
      setNormalizedTasks([]);
      showToast("error", t("uploadErrRead"));
      console.error(err);
      throw new Error("");
    }
  };

  const handleConfirmImport = () => {
    showToast("success", t("downloadTask"));
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
          id="file-upload"
        />

        {/* Upload */}
        <button
          type="button"
          className={s.button}
          title={t("ariaUpload")}
          aria-label={t("ariaLableUpload")}
          aria-controls="file-upload"
          onClick={handleOpenFilePicker}
        >
          <Upload size={18} aria-hidden="true" />
        </button>

        {/* Download */}
        <button
          type="button"
          className={s.button}
          title={t("ariaDownload")}
          aria-label={t("ariaLableDownload")}
          onClick={handleDownload}
        >
          <Download size={18} aria-hidden="true" />
        </button>
      </div>

      {preview && (
        <Modal
          isOpen={true}
          onClose={() => setPreview(null)}
          header={t("modaleConfirmTask")}
        >
          <div className="space-y-4">
            <p className="text-sm ">
              {normalizedTasks.length} {t("modaleConfirmTaskHeader")}
            </p>

            <div className="text-sm space-y-1 ">
              <p>
                {t("modaleConfirmTaskPart")}: {preview.section}
              </p>
              <p>
                {t("modaleConfirmTaskLength")}: {preview.tasks.length}
              </p>
              <p>
                {t("modaleConfirmTaskTime")}:{" "}
                {new Date(preview.exportedAt).toLocaleString("fa-IR")}
              </p>
            </div>

            <div className={s.previewBox}>
              <ul className="space-y-2 text-sm">
                {normalizedTasks.slice(0, 5).map(task => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{task.title}</span>
                    <span className={s.mutedText}>
                      {task.priority === "high"
                        ? t("high")
                        : task.priority === "medium"
                          ? t("medium")
                          : t("low")}
                    </span>
                  </li>
                ))}
              </ul>

              {normalizedTasks.length > 5 && (
                <p className={s.mutedForeground}>
                  {normalizedTasks.length - 5} {t("modaleConfirmTaskMore")}
                </p>
              )}
            </div>

            <p className={s.warning}>{t("modaleConfirmTaskWarning")}</p>
          </div>

          <div className="flex justify-between gap-3 mt-4">
            <Button
              className={s.buttonCancel}
              onClick={handleCloseModal}
              label={t("modaleConfirmTaskCancelBTN")}
              title={t("modaleConfirmTaskCancelBTN")}
              aria-label={t("modaleConfirmTaskCancelBTNAria")}
            />
            <Button
              className={s.buttonSuccess}
              onClick={handleConfirmImport}
              label={t("modaleConfirmTaskConfirmBTN")}
              title={t("modaleConfirmTaskConfirmBTN")}
              aria-label={t("modaleConfirmTaskConfirmBTNAria")}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
