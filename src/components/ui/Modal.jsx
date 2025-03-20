import React from "react";
import Overlay from "./Overlay";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import Button from "./Button";

function Modal({ isOpen, onClose, children, className }) {
  return (
    isOpen && (
      <div className="h-svh w-svw fixed top-0 left-0 b border flex items-center justify-center">
        <Overlay isOpen={true} onClick={onClose} />

        <div
          className={cn(
            "bg-base-100 z-[500] h-svh w-svh sm:max-w-[600px] sm:h-auto rounded shadow-sidebar flex flex-col justify-between ",
            className
          )}
        >
          {children}
        </div>
      </div>
    )
  );
}

function ModalHeader({ title, icon, className, onClose }) {
  return (
    <header
      className={cn("flex items-center justify-between pt-6 px-6", className)}
    >
      <div className="flex space-x-1.5">
        <span>{icon}</span>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      {onClose ? (
        <Button
          onClick={onClose}
          variant="ghost"
          className="rounded-full h-9 w-9 bg-base-100 shadow-none "
        >
          <X className="text-context-lighter" />
        </Button>
      ) : null}
    </header>
  );
}

function ModalBody({ children, className }) {
  return (
    <main className={cn("max-h-[310px] overflow-y-auto px-6 py-4", className)}>
      {children}
    </main>
  );
}

function ModalFooter({ className, children }) {
  return (
    <footer
      className={cn(
        "h-[68.6px] p-6 border-t border-outline-medium flex items-center",
        className
      )}
    >
      {children}
    </footer>
  );
}

export { Modal, ModalHeader, ModalBody, ModalFooter };
