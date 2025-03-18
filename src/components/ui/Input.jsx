import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";

function Input({
  label,
  name,
  type = "text",
  icon: Icon,
  iconPosition = "left",
  className,
  formik,
  value,
  onChange,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  // Handle input value based on whether Formik is used or not
  const inputValue = formik ? formik.values[name] : value;
  const handleChange = formik ? formik.handleChange : onChange;

  // Check if there's an error and if the field is touched
  const isError = formik && formik.errors[name] && formik.touched[name];

  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="mb-0.5 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Left Icon */}
        {Icon && iconPosition === "left" && (
          <span className="absolute left-3 text-gray-500">
            <Icon className="w-5 h-5" />
          </span>
        )}

        {/* Input Field */}
        {formik ? (
          <Field
            id={name}
            name={name}
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "border border-outline-dark flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-base md:text-sm transition focus:outline-none",
              isError
                ? "border-error"
                : "focus:border-primary-700 focus:ring-2 focus:ring-primary-400/30",
              Icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : "",
              isPassword ? "pr-10" : "",
              className
            )}
            {...props}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={isPassword && showPassword ? "text" : type}
            value={inputValue}
            onChange={handleChange}
            className={cn(
              "border border-outline-dark flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-base md:text-sm transition focus:outline-none",
              isError
                ? "border-error"
                : "focus:border-primary-700 focus:ring-2 focus:ring-primary-400/30",
              Icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : "",
              isPassword ? "pr-10" : "",
              className
            )}
            {...props}
          />
        )}

        {/* Right Icon (Password Toggle or Regular Icon) */}
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer absolute right-3 text-gray-500 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        ) : (
          Icon &&
          iconPosition === "right" && (
            <span className="absolute right-3 text-gray-500">
              <Icon className="w-5 h-5" />
            </span>
          )
        )}
      </div>

      {/* Error Message (Formik Only) */}
      {formik && isError && (
        <ErrorMessage
          name={name}
          component="p"
          className="text-xs text-error mt-1"
        />
      )}
    </div>
  );
}

export default Input;
