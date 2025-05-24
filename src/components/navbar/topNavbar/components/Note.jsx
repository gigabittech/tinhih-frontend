import { Calendar, Dot, Minus, Plus, UserCircle } from "lucide-react";
import { useState } from "react";
import { RiCloseLine, RiExpandDiagonalLine } from "react-icons/ri";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

function Note({ isOpen, onClose }) {
  const [expand, setExpand] = useState(false);
  const [minimize, setMinimize] = useState(true);
  const [selectedClient, setSelectedClient] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const editorRef = useRef(null);

  const handleClose = () => {
    onClose();
    setIsDropdownOpen(true);
    setSelectedClient("");
    setMinimize(false);
    setExpand(false);
  };

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setMinimize((prev) => !prev);
  };

  const toggleExpand = () => {
    setExpand((prev) => !prev);
    setMinimize(false);
  };

  return (
    <div
      className={`
        fixed bottom-0 bg-white border border-gray-200 transition-all duration-500 ease-in-out 
        ${
          expand
            ? "right-0 left-0 top-0 z-40"
            : "right-10 left-[65%] top-[15%] z-50"
        } 
        ${!expand ? "rounded-t-xl" : ""}
        ${minimize ? "" : "right-10 left-[65%] top-[95%]"}
        ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        }
      `}
    >
      <div
        onClick={toggleMinimize}
        className={`
          bg-amber-300 py-3 px-5 flex items-center justify-between cursor-pointer
          ${!expand ? "rounded-t-xl" : ""}
        `}
      >
        <div className="flex items-center gap-2">
          <UserCircle />
          <p className="font-bold text-lg">
            {selectedClient === ""
              ? "Choose a client/contact to continue"
              : `${selectedClient} - Untitled note`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Minus onClick={toggleMinimize} className="cursor-pointer" />
          <RiExpandDiagonalLine
            size={20}
            onClick={toggleExpand}
            className="cursor-pointer"
          />
          <RiCloseLine
            size={20}
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="p-5 relative">
        {selectedClient === "" && (
          <div
            onClick={() => setIsDropdownOpen(false)}
            className="fixed top-12 inset-0 bg-[#fffffff6] flex justify-center pt-60 z-20"
          >
            <div>
              <p className="font-bold text-lg">
                Choose a client/contact to continue
              </p>
              <div className="grid">
                <label className="text-sm">Client or contact</label>
                <input
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(true);
                  }}
                  placeholder="Search"
                  type="search"
                  className="border border-gray-300 rounded px-3 py-1 outline-none focus:border-primary-400 cursor-text z-10"
                />
                {isDropdownOpen && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="shadow-2xl rounded py-2"
                  >
                    <p
                      onClick={() => {
                        setSelectedClient("John Doe");
                        setIsDropdownOpen(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 duration-100 transition-all cursor-pointer"
                    >
                      John Doe
                    </p>
                    <p className="px-3 py-2 border-t border-gray-300 hover:bg-gray-100 duration-100 transition-all cursor-pointer flex items-center gap-1 text-primary-700">
                      <Plus size={15} />
                      New client
                    </p>
                    <p className="px-3 py-2 hover:bg-gray-100 duration-100 transition-all cursor-pointer flex items-center gap-1 text-primary-700">
                      <Plus size={15} />
                      New contact
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="z-50">
          <div className="pb-5 flex items-center gap-5">
            <div className="flex items-center">
              <Calendar />
              &nbsp; Sun, 25 May <Dot /> 22:06
            </div>
          </div>
          <Editor
            apiKey="no-api-key"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Note;
