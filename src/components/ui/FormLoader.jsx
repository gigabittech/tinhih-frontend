import React from "react";
import { cn } from "../../lib/utils";

function FormLoader({ className }) {
  return (
    <div
      className={cn(
        "*:rounded-b absolute left-0 bottom-0 w-full h-1.5 bg-primary-500/35 overflow-hidden",
        className
      )}
    >
      <div className="h-full absolute left-0 w-1/2 bg-primary-600 slide-animation" />
    </div>
  );
}

export default FormLoader;
