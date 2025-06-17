import React from "react";

function Title({ icon, title }) {
  return (
    <div className="text-xl font-bold mb-2 flex items-center gap-2">
      {icon}
      {title}
    </div>
  );
}

export default Title;
