import React, { useState } from "react";
import { SideModal } from "../../../../../components/ui/SideModal";
import useCalendarPage from "../../../../../FormSchema/Provider/calendarPage";

function Sidebar() {
  const { isOpenCalendarSideBar, closeCalendarSideBar } = useCalendarPage();

  return (
    <SideModal isOpen={isOpenCalendarSideBar} onClose={closeCalendarSideBar}>
      <div>
        <header>1</header>
        <main>2</main>
        <footer>3</footer>
      </div>
    </SideModal>
  );
}

export default Sidebar;
