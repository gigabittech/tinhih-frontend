import React, { useState } from "react";
import { SideModal } from "../../../../../components/ui/Modal";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>open</button>
      <SideModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        asffasdfas
      </SideModal>
    </>
  );
}

export default Sidebar;
