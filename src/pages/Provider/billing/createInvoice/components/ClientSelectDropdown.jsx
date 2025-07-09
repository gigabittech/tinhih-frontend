import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Avatar from "../../../../../components/ui/Avatar";

const ClientSelectDropdown = ({ label, value, onChange, options, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef();

  const selectedClient = options.find((client) => client.id === value);

  const filteredOptions =
    search.trim() === ""
      ? options
      : options.filter((option) =>
          (option.first_name + " " + (option.last_name || ""))
            .toLowerCase()
            .includes(search.toLowerCase())
        );

  const handleSelect = (id) => {
    onChange(id);
    setIsOpen(false);
  };

  // Clear selected client & reset search
  const clearSelection = (e) => {
    e.stopPropagation(); // Prevent dropdown open on clear click
    onChange(null);
    setSearch("");
    setIsOpen(true); // open dropdown so user can type immediately
  };

  useEffect(() => {
    if (!isOpen) {
      if (selectedClient) {
        setSearch(
          selectedClient.first_name + " " + (selectedClient.last_name || "")
        );
      } else {
        setSearch("");
      }
    }
  }, [isOpen, selectedClient]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={`w-full px-3 py-2 border rounded bg-white text-left flex justify-between items-center cursor-text
          ${error ? "border-red-600" : "border-gray-300"}`}
        onClick={() => setIsOpen(true)}
      >
        {selectedClient ? (
          <>
            <input
              type="text"
              value={
                selectedClient.first_name +
                " " +
                (selectedClient.last_name || "")
              }
              readOnly
              className="outline-none w-full text-sm bg-transparent cursor-default"
              onFocus={() => setIsOpen(true)}
            />
            <button
              onClick={clearSelection}
              className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear selection"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={isOpen ? search : ""}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="outline-none w-full text-sm bg-transparent"
              onFocus={() => setIsOpen(true)}
            />
            <ChevronDown size={18} className="ml-2 shrink-0" />
          </>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-y-auto">
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((client) => (
                <li
                  key={client.id}
                  onClick={() => handleSelect(client.id)}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <Avatar
                    size={24}
                    src={client.avatar_url || ""}
                    alt={client.first_name}
                    fallback={
                      client.first_name
                        ? client.first_name[0].toUpperCase()
                        : "?"
                    }
                  />
                  <span className="text-sm">
                    {client.first_name} {client.last_name || ""}
                  </span>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No clients found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientSelectDropdown;
