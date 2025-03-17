import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

function Dropdown({
  trigger,
  menu,
  selectedValues,
  onSelect,
  multiple = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* custom trigger */}
      {trigger && (
        <div onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>
      )}
      {/* custom menu */}
      {menu && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-1 rounded-xs z-10 dropdown-menu"
            >
              {menu(closeMenu, selectedValues, onSelect, multiple)}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}




export { Dropdown };
