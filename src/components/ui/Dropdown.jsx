import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import Button from "./Button";

function Dropdown({
  trigger,
  menuRenderer,
  selectedValues,
  onSelect,
  multiple = false,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("bottom");
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updatePosition = () => {
    if (dropdownRef.current && menuRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const menuHeight = menuRef.current.offsetHeight;
      const spaceBelow = window.innerHeight - dropdownRect.bottom;
      const spaceAbove = dropdownRect.top;

      if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, { passive: true });
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative -top-0.5 w-full">
      {trigger && (
        <span onClick={() => setIsOpen((prev) => !prev)}>
          {trigger?.(isOpen)}
        </span>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-10 dropdown-menu bg-base-100 rounded-xs overflow-y-auto w-full",
              position === "bottom" ? "top-full mt-1" : "bottom-full mb-1",

              className
            )}
          >
            {menuRenderer?.(closeMenu, selectedValues, onSelect, multiple)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownTrigger({ className, isOpen, children, label }) {
  return (
    <>
      <label
        htmlFor={label}
        className="mb-0.5 text-sm font-medium text-context-medium"
      >
        {label}
      </label>
      <Button
        id={label}
        type="button"
        variant="outline"
        className={cn(
          " border-outline-medium px-3 py-1 w-full focus:border-primary-700 flex items-center justify-between ",
          className
        )}
      >
        <>
          {children}
          <span className="justify-self-center">
            <ChevronDown
              className={cn(
                "size-5 transition-all duration-200 text-outline-dark",
                isOpen ? "rotate-180" : "rotate-0"
              )}
            />
          </span>
        </>
      </Button>
    </>
  );
}

export default Dropdown;
