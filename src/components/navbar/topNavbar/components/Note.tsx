import { Minus, UserCircle } from "lucide-react";
import { RiCloseLine, RiExpandDiagonalLine } from "react-icons/ri";

function Note({onClose}) {
  return (
    <div className="fixed bottom-0 right-10 left-[65%] bg-white border border-gray-200 top-[15%] z-[201] rounded-t-xl">
      <div className="rounded-t-xl bg-amber-300 py-3 px-5 flex items-center justify-between cursor-pointer">
        <p className="flex items-center gap-2 font-bold text-lg">
          <UserCircle />
          Choose a client/contact to continue
        </p>
        <div className="flex items-center gap-3">
          <Minus />
          <RiExpandDiagonalLine size={20}/>
          <RiCloseLine size={20} onClick={onClose}/>
        </div>
      </div>
    </div>
  );
}

export default Note;
