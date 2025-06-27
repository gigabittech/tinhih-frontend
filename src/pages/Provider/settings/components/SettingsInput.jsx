import { IoMdArrowDropdown } from "react-icons/io";

function SettingsInput({
  label,
  defaultValue,
  isEditMode,
  register,
  name,
  showDropdownIcon = false,
  dropdownOptions = [],
  optionLabelKey = "label",
  optionValueKey = "value",
  ...rest
}) {
  return (
    <div className="grid">
      <label className="text-gray-500 text-sm mb-1">{label}</label>

      {isEditMode ? (
        <div className="relative">
          {showDropdownIcon && dropdownOptions.length > 0 ? (
            <>
              <select
                defaultValue={defaultValue}
                {...(register && name ? register(name) : {})}
                {...rest}
                className="border rounded border-gray-300 px-3 py-1 focus:border-primary-500 w-full outline-none bg-white appearance-none"
              >
                {dropdownOptions.map((option, index) => (
                  <option
                    key={index}
                    value={option[optionValueKey]}
                  >
                    {option[optionLabelKey]}
                  </option>
                ))}
              </select>
              <div className="absolute top-2 right-3 pointer-events-none">
                <IoMdArrowDropdown size={20} />
              </div>
            </>
          ) : (
            <input
              type="text"
              defaultValue={defaultValue}
              {...(register && name ? register(name) : {})}
              {...rest}
              className="border rounded border-gray-300 px-3 py-1 focus:border-primary-500 w-full outline-none bg-white"
            />
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


