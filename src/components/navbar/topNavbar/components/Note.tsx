import { Minus, UserCircle } from "lucide-react";
import { useState } from "react";
import { RiCloseLine, RiExpandDiagonalLine } from "react-icons/ri";

function Note({ isOpen, onClose }) {
  const [expand, setExpand] = useState(false);
  const [minimize, setMinimize] = useState(false);

  return (
    <div
      className={`
        fixed bottom-0 z-50 bg-white border border-gray-200 transition-all duration-500 ease-in-out 
        ${expand ? "right-0 left-0 top-0 z-[202]" : "right-10 left-[65%] z-[201]"} 
        ${!expand && !minimize ? "top-[15%]" : ""}
        ${minimize && !expand ? "rounded-t-xl" : ""}
        ${isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"}
      `}
    >
      <div
        className={`
          bg-amber-300 py-3 px-5 flex items-center justify-between cursor-pointer
          ${minimize && !expand ? "rounded-t-xl" : ""}
        `}
      >
        <p className="flex items-center gap-2 font-bold text-lg">
          <UserCircle />
          Choose a client/contact to continue
        </p>
        <div className="flex items-center gap-3">
          <Minus onClick={() => setMinimize(!minimize)} className="cursor-pointer" />
          <RiExpandDiagonalLine
            size={20}
            onClick={() => {
              setExpand(!expand);
              setMinimize(false); // disable minimize when expanding
            }}
            className="cursor-pointer"
          />
          <RiCloseLine size={20} onClick={onClose} className="cursor-pointer" />
        </div>
      </div>

      {/* Main content (hidden when minimized) */}
      {!minimize && (
        <div className="p-5">
          {/* Replace with actual content */}
          <p className="text-gray-600">Main content goes here...</p>
        </div>
      )}
    </div>
  );
}

export default Note;


