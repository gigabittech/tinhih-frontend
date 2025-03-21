import React from "react";
import Overlay from "./Overlay";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import Button from "./Button";
import { motion } from "framer-motion";

function Modal({ isOpen, onClose, children, className }) {
  return (
    isOpen && (
      <div className="h-svh w-svw fixed top-0 left-0 flex items-center justify-center">
        <Overlay isOpen={true} onClick={onClose} />

        <div
          className={cn(
            "bg-base-100 z-[500] h-svh w-svh sm:max-w-[600px] sm:h-auto rounded shadow-sidebar flex flex-col ",
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
    <main
      className={cn(
        "h-full md:max-h-[310px] overflow-y-auto px-6 py-4",
        className
      )}
    >
      {children}
    </main>
  );
}

function ModalFooter({ className, children, isLoading }) {
  return (
    <footer
      className={cn(
        "h-[68.6px] relative p-6 border-t border-outline-medium flex items-center",
        className
      )}
    >
      {children}

      {isLoading && (
        <div className="rounded-b absolute left-0 bottom-0 w-full h-1.5 bg-primary-500/35 overflow-hidden">
          <div className="h-full absolute left-0 w-1/2 bg-primary-600 slide-animation" />
        </div>
      )}
    </footer>
  );
}

export { Modal, ModalHeader, ModalBody, ModalFooter };
