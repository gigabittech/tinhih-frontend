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

// e.stopPropagation();

// Component to make MultiSelector reusable
function MultiSelector({}) {
  return (
    <Dropdown
      btnTrigger={() => <></>}
      className="w-full px-0"
      menuRenderer={() => <></>}
    />
  );
}

export default MultiSelector;
