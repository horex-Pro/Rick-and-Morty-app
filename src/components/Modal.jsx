import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useId, useRef } from "react";

// native <dialog> gives us focus trapping, Escape-to-close and a top layer
// for free
function Modal({ title, children, onOpen, open }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={titleId}
      onClose={() => onOpen(false)}
      // the dialog element itself is only hit by clicks on the backdrop
      onClick={(e) => e.target === ref.current && onOpen(false)}
    >
      <div className="modal__header">
        <h2 id={titleId} className="title">
          {title}
        </h2>
        <button
          className="icon-btn"
          onClick={() => onOpen(false)}
          aria-label="Close"
        >
          <XMarkIcon className="icon" />
        </button>
      </div>
      <div className="modal__body">{open && children}</div>
    </dialog>
  );
}

export default Modal;
