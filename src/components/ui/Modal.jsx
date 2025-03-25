import React from "react";
import Overlay from "./Overlay";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import Button from "./Button";

function Modal({ isOpen, onClose, children, className }) {
  return (
    isOpen && (
      <div className="z-[200] h-svh w-svw fixed top-0 left-0 flex items-center justify-center">
        <Overlay isOpen={true} onClick={onClose} />

        <div
          className={cn(
            "bg-base-100 z-[500] h-svh  w-svh sm:h-auto sm:max-w-[600px]  sm:rounded shadow-sidebar flex flex-col overflow-y-auto sm:overflow-visible",
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
      <div className="flex items-center space-x-1.5">
        <span>{icon}</span>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      {onClose ? (
        <Button
          onClick={onClose}
          type="button"
          variant="ghost"
          className="rounded-full h-9 w-9 bg-base-100 shadow-none"
        >
          <X className="text-context-lighter" />
        </Button>
      ) : null}
    </header>
  );
}

function ModalBody({ children, className }) {
  return <main className={cn("  px-6 py-4", className)}>{children}</main>;
}

// sm:max-h-[310px] overflow-y-auto
function ModalFooter({ className, children, isLoading }) {
  return (
    <footer
      className={cn(
        "sm:h-[68.6px] relative p-6 sm:border-t border-outline-medium flex items-center",
        className
      )}
    >
      {children}
    </footer>
  );
}

export { Modal, ModalHeader, ModalBody, ModalFooter };
