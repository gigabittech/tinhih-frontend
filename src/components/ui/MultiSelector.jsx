import React from "react";
import { X } from "lucide-react";
import Button from "./Button";

function MultiSelector() {
  return (
    <div className="border w-[20rem] rounded-md inline-block py-1 px-2">
      <div className="flex flex-wrap items-center gap-1">
        <span className="py-1 px-2 inline-flex items-center gap-1 bg-action-light text-sm rounded-full ">
          <span> Rahul Roy Nipon</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-4 p-1.5"
          >
            <X size={13} className="text-base-100" />
          </Button>
        </span>

        <span className="py-1 px-2 inline-flex items-center gap-1 bg-action-light text-sm rounded-full ">
          <span> Rahul Roy Nipon</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-4 p-1.5"
          >
            <X size={13} className="text-base-100" />
          </Button>
        </span>

        <span className="py-1 px-2 inline-flex items-center gap-1 bg-action-light text-sm rounded-full ">
          <span> Rahul Roy Nipon</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-4 p-1.5"
          >
            <X size={13} className="text-base-100" />
          </Button>
        </span>
        <span className="py-1 px-2 inline-flex items-center gap-1 bg-action-light text-sm rounded-full ">
          <span> Rahul Roy Nipon</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-4 p-1.5"
          >
            <X size={13} className="text-base-100" />
          </Button>
        </span>
        <span className="py-1 px-2 inline-flex items-center gap-1 bg-action-light text-sm rounded-full ">
          <span> Rahul Roy Nipon</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-4 p-1.5"
          >
            <X size={13} className="text-base-100" />
          </Button>
        </span>
        <span className="py-1 px-2 inline-flex items-center gap-1 bg-action-light text-sm rounded-full ">
          <span> Rahul Roy Nipon</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-4 p-1.5"
          >
            <X size={13} className="text-base-100" />
          </Button>
        </span>

        <span className="py-1 px-2 inline-flex items-center gap-1 bg-action-light text-sm rounded-full ">
          <span> Rahul Roy Nipon</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-4 p-1.5"
          >
            <X size={13} className="text-base-100" />
          </Button>
        </span>

        <input
          type="text"
          className="h-8  border min-w-[10rem] shrink inline px-3 py-1 text-base md:text-sm transition focus:outline-none"
        />
      </div>
    </div>
  );
}

export default MultiSelector;
