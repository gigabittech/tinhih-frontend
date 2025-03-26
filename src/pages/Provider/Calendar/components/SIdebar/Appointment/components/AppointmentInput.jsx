import React, { useMemo, useState } from "react";
import Dropdown from "../../../../../../../components/ui/Dropdown";
import Input from "./../../../../../../../components/ui/Input";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../../../../../lib/utils";

function AppointmentInput({
  options = [],
  selectedValues = [],
  onChange,
  label,
  labelKey = "name",
  valueKey = "id",
  MenuItemComponent,
  NewButtonComponent,
}) {
  const [searchItem, setSearchItem] = useState("");

  const filteredOptions = useMemo(() => {
    return searchItem
      ? options.filter((item) =>
          item[labelKey]?.toLowerCase()?.includes(searchItem?.toLowerCase())
        )
      : options;
  }, [searchItem, options]);

  const selectHandler = (item) => {
    const newSelected = selectedValues.includes(item[valueKey])
      ? selectedValues.filter((id) => id !== item[valueKey])
      : [...selectedValues, item[valueKey]];
    onChange(newSelected);
  };

  return (
    <Dropdown
      inputTrigger={(isOpen) => (
        <Input
          label={label}
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          iconPosition="right"
          className="rounded-sm"
          icon={
            <ChevronDown
              className={cn(
                "size-5 text-context-lighter duration-200 transition-all",
                isOpen ? "-rotate-180" : "rotate-0"
              )}
            />
          }
        />
      )}
      menuRenderer={() => (
        <div>
          <ul className="py-2 max-h-[10rem] overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <li key={item[valueKey]}>
                  {MenuItemComponent ? (
                    <MenuItemComponent
                      item={item}
                      isSelected={selectedValues.includes(item[valueKey])}
                      onSelect={() => selectHandler(item)}
                    />
                  ) : (
                    <div
                      className={cn(
                        "transition-all cursor-pointer px-4 py-1.5 text-sm",
                        selectedValues.includes(item[valueKey])
                          ? "bg-primary-500/50 "
                          : ""
                      )}
                      onClick={() => selectHandler(item)}
                    >
                      {item[labelKey]}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="py-1 text-center text-context-lighter">
                No options match
              </li>
            )}
          </ul>

          {NewButtonComponent && <NewButtonComponent />}
        </div>
      )}
    />
  );
}

export default AppointmentInput;
