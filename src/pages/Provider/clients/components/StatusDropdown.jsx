import { useState } from "react";
import { ChevronDown } from "lucide-react";

const statusOptions = [
    { label: "Lead", value: "lead", color: "bg-purple-500" },
    { label: "Wait List", value: "wait_list", color: "bg-yellow-500" },
    { label: "Active", value: "active", color: "bg-green-500" },
    { label: "Inactive", value: "inactive", color: "bg-orange-500" },
    { label: "Blocked", value: "blocked", color: "bg-red-500" },
  ];
  

function StatusDropdown({ register, setValue, errors }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  const handleSelect = (option) => {
    setSelected(option);
    setValue("status", option.value, { shouldValidate: true });
    setOpen(false);
  };

  return (
    <div className="relative">
      <label className="text-sm">Status*</label>
      <div
        className="border border-[#a0a0a0] w-full rounded px-2 py-1 flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          {selected && (
            <span className={`w-3 h-3 ${selected.color}`}></span>
          )}
          <span>{selected?.label || "Select status"}</span>
        </div>
        <ChevronDown className="size-4" />
      </div>
      {open && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full shadow-md">
          {statusOptions.map((option) => (
            <li
              key={option.value}
              className="px-3 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              <span className={`w-3 h-3 ${option.color}`}></span>
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <input
        type="hidden"
        {...register("status", { required: "Status is required" })}
      />
      {errors.status && (
        <p className="text-red-500 text-sm">{errors.status.message}</p>
      )}
    </div>
  );
}

export default StatusDropdown
