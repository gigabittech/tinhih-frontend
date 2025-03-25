import React from "react";
import Overlay from "./Overlay";
import { cn } from "./../../lib/utils";

function SideModal({ isOpen, onClose, children, className }) {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} className="z-[200]" />
      <div
        className={cn(
          "z-[201] w-screen sm:w-[590px] h-svh fixed right-0 top-0 bg-base-100 trans",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {children}
      </div>
    </>
  );
}

export { SideModal };
