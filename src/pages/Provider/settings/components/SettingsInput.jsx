import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function SettingsInput({
  label,
  defaultValue,
  isEditMode,
  register,
  name,
  showDropdownIcon = false,
  ...rest
}) {
  return (
    <div className="grid">
      <label className="text-gray-500 text-sm mb-1">{label}</label>

      {isEditMode ? (
        <div className="relative">
          <input
            type="text"
            defaultValue={defaultValue}
            {...(register && name ? register(name) : {})}
            {...rest}
            className="border rounded border-gray-300 px-3 py-1 focus:border-primary-500 w-full outline-none bg-white"
          />
          {showDropdownIcon && (
            <div className="absolute top-2 right-3">
              <IoMdArrowDropdown size={20} />
            </div>
          )}
        </div>
      ) : (
        <div className="py-1 border border-transparent bg-white">
          {defaultValue?.trim() ? defaultValue : "-"}
        </div>
      )}
    </div>
  );
}

export default SettingsInput;

