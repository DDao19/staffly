import { Button } from "./Button";

export function ConfirmationModal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Delete",
  isConfirming,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 px-5 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl border border-(--border) bg-(--surface) p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-(--text)">{title}</h2>

        <p className="mt-3 text-(--text-secondary) whitespace-normal">
          {message}
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={onCancel} disabled={isConfirming}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
