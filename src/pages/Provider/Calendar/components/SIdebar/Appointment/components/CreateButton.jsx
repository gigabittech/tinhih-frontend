import React from "react";
import { FaPlus } from "react-icons/fa";

function CreateButton({ onClick, create }) {
  return (
    <div className="px-5 py-3 hover:bg-gray-100 border-t border-gray-300">
      <button
        onClick={onClick}
        className="text-sm flex items-center gap-3 text-primary-800 font-bold"
      >
        <FaPlus />
        {create}
      </button>
    </div>
  );
}

export default CreateButton;
