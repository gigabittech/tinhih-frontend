import { useState } from "react";
import Button from "../../../../../../components/ui/Button";
import { Link2 } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalHeader,
} from "../../../../../../components/ui/Modal";
import { IoLink } from "react-icons/io5";
import { MdOutlineAddLink } from "react-icons/md";
import { MdOutlineSmartButton } from "react-icons/md";
import { ImEmbed } from "react-icons/im";
import { FaCopy } from "react-icons/fa";

function Booking() {
  const [openBookingPopup, setOpenBookingPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("link");
  const [copiedLink, setCopiedLink] = useState("");
  const bookingLink =
    "https://book.carepatron.com/New/member?p=5-is1ppiSq.psLaB9tpuaA";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookingLink).then(() => {
      setCopiedLink(bookingLink); 
      alert("Copied");
    });
  };

  return (
    <div>
      <Button
        onClick={() => setOpenBookingPopup(true)}
        variant="outline"
        size="header"
        className="hidden lg:flex"
      >
        <Link2 size={18} />
        <span>Booking</span>
      </Button>
      <Modal
        onClose={() => setOpenBookingPopup(false)}
        isOpen={openBookingPopup}
      >
        <ModalHeader
          icon={<IoLink size={22} />}
          title={"Share your booking link"}
          onClose={() => setOpenBookingPopup(false)}
        />
        <ModalBody>
          <div>
            {/* ------------------tabs-------------------- */}
            <div className="flex gap-10 text-gray-700">
              {[
                {
                  key: "link",
                  label: "Link",
                  icon: <MdOutlineAddLink size={20} />,
                },
                {
                  key: "button",
                  label: "Button",
                  icon: <MdOutlineSmartButton size={20} />,
                },
                {
                  key: "embed",
                  label: "Inline embed",
                  icon: <ImEmbed size={18} />,
                },
              ].map((tab) => (
                <div
                  key={tab.key}
                  className={`flex items-center gap-2 cursor-pointer pb-1 ${
                    activeTab === tab.key
                      ? "border-b-2 border-primary-600 font-semibold text-primary-700"
                      : "border-b-2 border-transparent "
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.icon}
                  {tab.label}
                </div>
              ))}
            </div>

            <div className="items-center gap-2 pt-5">
              <label className="text-sm">Copy link</label>
              <div className=" relative">
                <input
                  readOnly
                  value={bookingLink}
                  className="flex-1 border px-3 py-2 rounded-md text-sm w-full"
                />
                <button
                  onClick={handleCopyLink}
                  className="bg-primary-600 text-white px-2 rounded-md text-sm cursor-pointer
                       hover:bg-primary-700 flex items-center gap-2 absolute top-1 bottom-1 right-1"
                >
                  <FaCopy size={16} /> Copy
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">
                  Team
                </label>
                <select className="w-full border px-3 py-2 rounded-md text-sm mt-1">
                  <option>Team member1</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">
                  Services
                </label>
                <select className="w-full border px-3 py-2 rounded-md text-sm mt-1">
                  <option>All services</option>
                </select>
              </div>
            </div>

            {/*------------------- Button tab------------------------*/}
            {activeTab === "button" && (
              <div className="items-center gap-2 pt-5">
                <label className="text-sm">Button title</label>

                <input
                  defaultValue={"Book appointment"}
                  className="flex-1 border px-3 py-2 rounded-md text-sm w-full"
                />
              </div>
            )}
          </div>
          <div className=" py-5 flex justify-end gap-3">
            <button
              onClick={() => setOpenBookingPopup(false)}
              className=" px-5 py-1 border rounded font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Booking;
