import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { ErrorMessage } from "formik";

function ToggleButton({ label, formik, name }) {
  const [toggled, setToggled] = useState(formik ? formik.values[name] : false);

  const handleToggle = () => {
    if (formik) {
      formik.setFieldValue(name, !formik.values[name]);
    } else {
      setToggled(!toggled);
    }
  };

  return (
    <div className="flex flex-col items-start">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "shadow-inner h-4 w-10 relative rounded-xl cursor-pointer",
            (formik ? formik.values[name] : toggled)
              ? "bg-primary-800"
              : "bg-outline-dark"
          )}
          onClick={handleToggle}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "absolute hover:ring-4 hover:ring-primary-500/40 border border-primary-400 bg-primary-500 top-1/2 transform -translate-y-1/2 size-6 rounded-full"
            )}
            animate={{ x: (formik ? formik.values[name] : toggled) ? 22 : -4 }}
          />
        </div>
        <input
          type="checkbox"
          name={name}
          checked={formik ? formik.values[name] : toggled}
          onChange={handleToggle}
          className="hidden"
        />
      </div>
      {formik && (
        <ErrorMessage
          name={name}
          component="p"
          className="mt-1 text-xs text-error"
        />
      )}
    </div>
  );
}

export default ToggleButton;
