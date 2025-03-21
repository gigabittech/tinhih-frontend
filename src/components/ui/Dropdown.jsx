import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

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
    <div ref={dropdownRef} className="relative">
      {trigger && (
        <div onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>
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
              "absolute z-10 dropdown-menu bg-base-100 rounded-xs overflow-y-auto",
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

export default Dropdown;
