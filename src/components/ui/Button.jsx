import React, { useState } from "react";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "relative cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] overflow-hidden focus-visible:ring-1 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 hover:bg-primary-600 text-fixed-100 font-semibold focus-visible:ring-primary-600 shadow shadow-shadow-200",
        outline:
          "border border-current text-primary-800 hover:bg-action-lighter font-bold",
        ghost:
          "bg-action-light hover:bg-action-lighter focus-visible:ring-action-medium",
        link: "font-semibold",
        text: "",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, children, ...props }) {
  const [ripples, setRipples] = useState([]);

  const handleRipple = (event) => {
    const { left, top } = event.target.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const newRipple = { id: Date.now(), x, y };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  const getRippleColor = (variant) => {
    switch (variant) {
      case "default":
        return "bg-primary-500/50";
      case "outline":
        return "bg-current/15";
      case "ghost":
        return "bg-current/10";
      default:
        return "bg-primary-500/50";
    }
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={handleRipple}
      {...props}
    >
      {children}

      {/* Ripple Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className={cn("absolute rounded-full", getRippleColor(variant))}
            style={{
              top: ripple.y,
              left: ripple.x,
              transform: "translate(-50%, -50%)",
              width: "0px",
              height: "0px",
            }}
            animate={{
              width: "100px",
              height: "100px",
              opacity: 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </div>
    </button>
  );
}

export default Button;
