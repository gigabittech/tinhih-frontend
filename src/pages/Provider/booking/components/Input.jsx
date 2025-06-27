import React from "react";

function Input({ label, type, name,value }) {
  return (
    <div className="grid">
      <label className="text-sm">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={value}
        className="border rounded border-gray-400 px-2 py-1 outline-none focus:border-primary-600"
      />
    </div>
  );
}

export default Input;
