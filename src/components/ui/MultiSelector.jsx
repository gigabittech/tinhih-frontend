import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";
import Dropdown from "./Dropdown";

const data = [
  { id: 1, value: "option1", label: "Option 1" },
  { id: 2, value: "option2", label: "Option 2" },
  { id: 3, value: "option3", label: "Option 3" },
  { id: 4, value: "option4", label: "Option 4" },
  { id: 5, value: "option5", label: "Option 5" },
];

// Component to make MultiSelector reusable
function MultiSelector({
  label = "label",
  options = data,
  selectedValues: initialSelectedValues,
  onChange,
}) {
  const [selectedValues, setSelectedValues] = useState(
    initialSelectedValues || []
  );
  const [searchItem, setSearchItem] = useState("");

  const filteredOptions = useMemo(() => {
    return searchItem
      ? options.filter((item) =>
          item.label.toLowerCase().includes(searchItem.toLowerCase())
        )
      : options;
  }, [searchItem, options]);

  const toggleSelect = (id) => {
    const updatedSelectedValues = selectedValues.includes(id)
      ? selectedValues.filter((item) => item !== id)
      : [...selectedValues, id];
    setSelectedValues(updatedSelectedValues);
    onChange?.(updatedSelectedValues); // Notify parent of the change
  };

  const removeHandler = (e, id) => {
    e.stopPropagation();
    const updatedSelectedValues = selectedValues.filter((item) => item !== id);
    setSelectedValues(updatedSelectedValues);
    onChange?.(updatedSelectedValues); // Notify parent of the change
  };

  return (
    <Dropdown
      btnTrigger={() => (
        <div className="w-[25rem] py-1 px-2 border rounded-md cursor-pointer">
          <ul className="flex items-center flex-wrap gap-1">
            {selectedValues.map((id) => {
              const selectedItem = options.find((item) => item.id === id);
              return (
                selectedItem && (
                  <li
                    key={id}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 bg-action-light"
                  >
                    <span className="text-sm">{selectedItem.label}</span>
                    <button
                      type="button"
                      onClick={(e) => removeHandler(e, id)}
                      className="bg-action-light rounded-full p-0.5 text-context-medium cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </li>
                )
              );
            })}
            <li className="flex-1">
              <input
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                type="text"
                className="h-8 w-full px-1 focus:outline-none"
              />
            </li>
          </ul>
        </div>
      )}
      className="w-full px-0"
      menuRenderer={() => (
        <ul className="py-2">
          {filteredOptions?.length > 0 ? (
            filteredOptions.map((item, index) => (
              <li
                key={item.id}
                className={`cursor-pointer px-2 py-1 flex items-center gap-2 ${
                  selectedValues.includes(item.id) ? "bg-gray-200" : ""
                }`}
                onClick={() => toggleSelect(item.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="cursor-pointer"
                  id={`select-item-${index}`}
                />
                <label htmlFor={`select-item-${index}`}>{item.label}</label>
              </li>
            ))
          ) : (
            <li>No options found</li>
          )}
        </ul>
      )}
    />
  );
}

export default MultiSelector;
