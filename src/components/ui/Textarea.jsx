import React from "react";
import { Field, ErrorMessage } from "formik";
import { cn } from "../../lib/utils";

function Textarea({
  label,
  name,
  className,
  formik,
  value,
  onChange,
  ...props
}) {
  // Handle value based on Formik usage
  const inputValue = formik ? formik.values[name] : value;
  const handleChange = formik ? formik.handleChange : onChange;
  const isError = formik && formik.errors[name] && formik.touched[name];

  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="mb-0.5 text-sm font-medium text-context-medium"
        >
          {label}
        </label>
      )}

      {/* Textarea Field */}
      {formik ? (
        <Field
          as="textarea"
          id={name}
          name={name}
          className={cn(
            "h-20 border border-outline-medium flex w-full rounded-md bg-transparent px-3 py-2 text-base md:text-sm transition focus:outline-none",
            isError ? "border-error" : "focus:border-primary-700",
            className
          )}
          {...props}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          value={inputValue}
          onChange={handleChange}
          className={cn(
            "h-20 border border-outline-dark flex w-full rounded-md bg-transparent px-3 py-1 text-base md:text-sm transition focus:outline-none",
            isError
              ? "border-error"
              : "focus:border-primary-700 focus-visible:ring-2 focus-visible:ring-primary-400/30",
            className
          )}
          {...props}
        />
      )}

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

export default Textarea;
