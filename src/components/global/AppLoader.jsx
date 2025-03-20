import React from "react";
import Spinner from "../ui/Spinner";
import { cn } from "../../lib/utils";

function AppLoader({ className }) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0  w-full h-full backdrop-blur-xs flex justify-center items-center bg-transparent z-[100] duration-200 transition-all",
        className
      )}
    >
      <Spinner className="size-8 md:size-11 border-2 md:border-3" />
    </div>
  );
}

export default AppLoader;
