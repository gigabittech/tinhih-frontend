import React, { useEffect, useRef, useState } from "react";

const SelectDropdown = ({
  selected,
  setSelected,
  options,
  labelKey,
  valueKey,
  label,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAllSelected = selected.length === options.length;

  const toggleSelection = (value) => {
    if (isAllSelected || selected.length !== 1 || selected[0] !== value) {
      // Replace current selection with just this value
      setSelected([value]);
    }
  };

  const handleSelectAllToggle = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(options.map((o) => o[valueKey]));
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="border border-[#a0a0a0] rounded px-3 py-2 w-full bg-white cursor-pointer min-h-[2.5rem] flex flex-wrap gap-1 text-sm"
      >
        {isAllSelected ? (
          <span className="bg-[#e4e4e4] rounded-full px-2">All {label}</span>
        ) : selected.length === 0 ? (
          <span className="text-gray-400">Select options</span>
        ) : (
          selected.map((id) => {
            const item = options.find((o) => o[valueKey] === id);
            return (
              <span
                key={id}
                className="bg-[#e4e4e4] rounded-full px-2 whitespace-nowrap"
              >
                {item[labelKey]}
              </span>
            );
          })
        )}
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute z-10 shadow-2xl border border-[#e5e5e5] mt-2 left-0 right-0 bg-white rounded max-h-60 overflow-y-auto"
        >
          <label className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer font-medium border-b">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAllToggle}
              className="mr-2"
            />
            All {label}
          </label>
          {options.map((item) => (
            <label
              key={item[valueKey]}
              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={
                  isAllSelected ||
                  (selected.length === 1 && selected[0] === item[valueKey])
                }
                onChange={() => toggleSelection(item[valueKey])}
                className="mr-2"
              />
              {item[labelKey]}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
