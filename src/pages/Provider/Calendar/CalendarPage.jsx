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
import ViewInvoice from "../billing/viewInvoice/ViewInvoice";

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

  // 🔐 Fix: safely handle undefined selectedDate
  const selected = selectedDate || new Date();
  const dateSlots = getMonthSlots(selected.getFullYear(), selected.getMonth());

  const handleDateSelect = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    // Allow creating appointment only for today or future
    if (selected < today) {
      return;
    }

    setSelectedDate(date);
    setContentName("Appointment");
    setOpenSideModal(true);
  };

  const handleCloseSideModal = () => {
    setOpenSideModal(false);
    setSelectedDate(new Date());
    setContentName("");
  };

  // ✅ Called from MonthlyCalendar for ANY date (past or future) if there’s an appointment
  const handleSeeDetails = (id, date) => {
    setSelectedDate(date);
    setAppointmentId(id);
    setContentName("details");
    setOpenSideModal(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <ViewInvoice isOpen={isOpen} onClose={closePopup} invoice_id={1} />

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
