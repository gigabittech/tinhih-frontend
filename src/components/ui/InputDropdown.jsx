  import React, { useEffect, useRef, useState } from "react";
  import Input from "./Input";
  import { ChevronDown } from "lucide-react";
  import { cn } from "../../lib/utils";
  import { AnimatePresence, motion } from "framer-motion";

  function InputDropdown({ formik, menuRenderer }) {
    const [isOpen, setIsOpen] = useState(false);
    const inputBtn = useRef(null);
    const inputMenu = useRef(null);

    const openInputDropdown = () => {
      setIsOpen(true);
    };

    const closeMenu = () => {
      setIsOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (
          inputBtn.current &&
          !inputBtn.current.contains(e.target) &&
          inputMenu.current &&
          !inputMenu.current.contains(e.target)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
      <div className="relative">
        <span ref={inputBtn}>
          <Input
            onClick={openInputDropdown}
            icon={
              <ChevronDown
                className={cn(
                  "size-5 transition-all duration-200",
                  isOpen ? "-rotate-180" : "rotate-0"
                )}
              />
            }
            iconPosition="right"
          />
        </span>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={inputMenu}
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute z-10 dropdown-menu bg-base-100 rounded-xs overflow-y-auto w-full"
              )}
            >
              {menuRenderer?.(closeMenu)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  export default InputDropdown;
