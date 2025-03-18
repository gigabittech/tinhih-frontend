import React from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

function Spinner({ className }) {
  return (
    <motion.div
      className={cn(
        "size-5 border-2 border-outline-medium border-t-primary-500 rounded-full animate-spin",
        className
      )}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  );
}

export default Spinner;
