import { useState } from "react";
import CalendarHeader from "./components/Header/CalendarHeader";
import { useCalendarStore } from "../../../FormSchema/Provider/calendarStore";
import ShortCalendar, {
  getMonthSlots,
} from "../../../components/ui/ShortCalendar";
import MonthlyCalendar from "./components/FullCalendar/MonthlyCalendar";
import Sidebar from "./components/SIdebar/Sidebar";
import DeleteAppointment from "./components/SIdebar/Appointment/appointmentDetails/DeleteAppointment";
import { useCreateInvoiceStore } from "../../../store/provider/createInvoiceStore";
import CreateInvoice from "./components/SIdebar/Appointment/appointmentDetails/createInvoice/CreateInvoice";

function CalendarPage() {
  const [openSideModal, setOpenSideModal] = useState(false);
  const [contentName, setContentName] = useState("Appointment");
  const [appointmentId, setAppointmentId] = useState(0);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const { isOpen, closePopup } = useCreateInvoiceStore();

  const {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    setGoToToday,
  } = useCalendarStore();

  const dateSlots = getMonthSlots(
    selectedDate.getFullYear(),
    selectedDate.getMonth()
  );

  const handleDateSelect = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison

    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    if (selected < today) {
      // If the selected date is in the past, don't open the sidebar
      return;
    }

    setSelectedDate(date);
    setOpenSideModal(true);
  };

  const handleCloseSideModal = () => {
    setOpenSideModal(false);
    setSelectedDate(new Date());
    setContentName("");
  };

  const handleSeeDetails = (id) => {
    setContentName("details");
    setAppointmentId(id);
  };

  return (
    <div className=" flex flex-col h-screen">
      <CreateInvoice isOpen={isOpen} onClose={closePopup} />

      <Sidebar
        isOpen={openSideModal}
        onClose={handleCloseSideModal}
        contentName={contentName ? contentName : "Appointment"}
        setSiderbarContent={setContentName}
        appointmentId={appointmentId}
        setDeletePopupOpen={() => setOpenDeletePopup(true)}
      />
      <DeleteAppointment
        isOpen={openDeletePopup}
        onClose={() => setOpenDeletePopup(false)}
        id={appointmentId}
        closeSidebar={handleCloseSideModal}
      />
      <CalendarHeader />
      <div className="flex gap-3 h-full md:pl-5 border-t border-outline-medium">
        <section className="hidden md:block md:w-[17rem] pt-3">
          <ShortCalendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            setGoToToday={setGoToToday}
          />
        </section>
        <section className="w-full border-l border-outline-medium">
          <MonthlyCalendar
            dateSlots={dateSlots}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            seeDetails={handleSeeDetails}
          />
        </section>
      </div>
    </div>
  );
}

export default CalendarPage;
