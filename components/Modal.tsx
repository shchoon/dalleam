'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

type ModalProp = {
  children: React.ReactNode;
};

export type ModalHandles = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<ModalHandles, ModalProp>(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen &&
    createPortal(
      <dialog
        ref={dialogRef}
        className="fixed bottom-0 left-0 right-0 z-100 w-full h-full t-0 bg-black/50 flex items-center justify-center z-50"
        onClick={handleModalClose}
        open
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </dialog>,
      document.getElementById('global-modal')!,
    )
  );
});

Modal.displayName = 'Modal';

export default Modal;
