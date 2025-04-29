import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

function ToggleButton({ label, value, onChange, name }) {
  const [toggled, setToggled] = useState(value || false);

  const handleToggle = () => {
    const newValue = !toggled;
    setToggled(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex flex-col items-start">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "shadow-inner h-3.5 w-9 relative rounded-xl cursor-pointer",
            toggled ? "bg-primary-800" : "bg-outline-dark"
          )}
          onClick={handleToggle}
        >
          <motion.div
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute hover:ring-4 hover:ring-primary-500/40 border border-primary-400 bg-primary-500 top-1/2 transform -translate-y-1/2 size-5 rounded-full"
            animate={{ x: toggled ? 18 : 0 }}
          />
        </div>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={toggled}
          onChange={handleToggle}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default ToggleButton;

