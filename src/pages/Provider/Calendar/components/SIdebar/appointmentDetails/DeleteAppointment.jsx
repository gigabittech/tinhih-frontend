import {
  Modal,
  ModalBody,
  ModalHeader,
} from "../../../../../../components/ui/Modal";
import { Notify } from "../../../../../../components/ui/Toaster";
import axiosInstance from "../../../../../../lib/axiosInstanceWithToken";
import useAppointmentStore from "../../../../../../store/provider/appointmentsStore";
import { MdDeleteForever } from "react-icons/md";

function DeleteAppointment({ isOpen, onClose, id }) {
  const { fetchAppointments } = useAppointmentStore();

  const handleDeleteApp = async () => {
    try {
      const response = await axiosInstance.delete(`/appointments/${id}`);
      if (response.status === 200) {
        onClose();
        fetchAppointments();
        Notify(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching appointment details:", err);
    }
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalHeader
        icon={<MdDeleteForever size={20} />}
        title={"Delete appointment"}
        onClose={onClose}
      />
      <ModalBody>
        <p>
          Are you sure you want to delete this appointment? You can restore it
          later.
        </p>
        <div className=" py-5 flex justify-end gap-3">
          <button onClick={onClose} className=" px-5 py-1 border rounded font-semibold">Cancel</button>
          <button onClick={handleDeleteApp} className=" px-5 py-1 bg-red-500 text-white rounded font-semibold">Yes, delete</button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default DeleteAppointment;
