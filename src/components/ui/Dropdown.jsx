import { createPortal } from "react-dom";

export function Dropdown({ children, position, dropdownRef }) {
  if (!position) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      className="fixed z-50 w-40 rounded-md border border-(--border) bg-(--surface) shadow-md"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
