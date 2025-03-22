import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import Button from "./Button";
import React from "react";
import { nanoid } from "nanoid";

const colors = {
  success: "--color-success",
  error: "--color-error",
  info: "--color-info",
  warning: "--color-warning",
};

const icons = {
  success: (
    <svg
      className="w-6 h-6 fill-current"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
    </svg>
  ),
  error: (
    <svg
      className="w-6 h-6 fill-current"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
    </svg>
  ),
  info: (
    <svg
      className="w-6 h-6 fill-current"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
    </svg>
  ),
  warning: (
    <svg
      className="w-6 h-6 fill-current"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
    </svg>
  ),
};

const CustomNotify = ({ type = "info", message, onClose }) => {
  return (
    <div className="relative  max-w-xs bg-base-100 overflow-hidden flex items-center rounded-md  shadow-lg">
      <div
        className="absolute inset-0 border-l-8"
        style={{ borderColor: `var(${colors[type]})` }}
      ></div>
      <div
        className={cn("flex items-center ml-5  mr-3 h-full")}
        style={{ color: `var(${colors[type]})` }}
      >
        {icons[type]}
      </div>
      <div className="w-full py-3 pr-3">
        <div className="flex justify-between w-full">
          <p className="font-bold text-context-dark capitalize">{type}</p>
          <Button
            variant="ghost"
            className="rounded-full h-6 w-6 [&>svg]:size-4"
            onClick={onClose}
          >
            <X className="text-context-light" />
          </Button>
        </div>
        <p className="font-medium text-sm text-context-light pr-10">
          {message}
        </p>
      </div>
    </div>
  );
};

const Notify = (type = "info", message, duration = 4000) => {
  const toastId = nanoid();

  toast.custom(
    (t) => (
      <CustomNotify
        type={type}
        message={message}
        onClose={() => toast.dismiss(toastId)}
      />
    ),
    {
      position: "bottom-right",
      duration: duration,
      id: toastId,
    }
  );
};

export { Notify, CustomNotify };
