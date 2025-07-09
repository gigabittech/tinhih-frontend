import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
} from "../../../../../components/ui/Modal";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Button from "../../../../../components/ui/Button";
import axiosInstance from "../../../../../lib/axiosInstanceWithToken";
import { Notify } from "../../../../../components/ui/Toaster";
import useInvoiceStore from "../../../../../store/provider/invoiceStore";

function DropDown({ isOpen, onClose, id, serial_number, onCloseViewInvoice }) {
  const [openDelete, setOpenDelete] = useState(false);
  const { fetchInvoices } = useInvoiceStore();

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/invoices/${id}`);
      if (response.status === 200) {
        Notify("Invoice deleted successfully");
        setOpenDelete(false);
        onClose();
        fetchInvoices();
        onCloseViewInvoice()
      }
    } catch (error) {
      console.error("Delete error:", error);
      Notify("Failed to delete invoice");
    }
  };

  return (
    <div>
      {isOpen && <div onClick={onClose} className=" fixed inset-0"></div>}
      <div
        className={
          isOpen
            ? " absolute right-0 bg-white py-2 rounded shadow text-nowrap grid gap-3 font-semibold"
            : "hidden"
        }
      >
        <p className="px-3 cursor-not-allowed">Download</p>
        <p className="px-3 cursor-not-allowed">Print</p>
        <p className="px-3 cursor-not-allowed">Email</p>
        <p className="px-3 cursor-not-allowed">Mark as void</p>
        <p
          onClick={() => setOpenDelete(true)}
          className="border-t border-gray-200 text-red-400 px-3 py-2 cursor-pointer  "
        >
          Delete
        </p>
      </div>
      {/* ------------ delete popup--------- */}
      <Modal isOpen={openDelete} onClose={() => setOpenDelete(false)}>
        <ModalHeader
          icon={<RiDeleteBin2Fill size={20} className=" text-gray-500" />}
          title={"Delete invoice"}
          onClose={() => setOpenDelete(false)}
        />
        <ModalBody>
          <p>Are you sure you want to delete Invoice #{serial_number}?</p>
          <div className="w-full sm:w-auto flex justify-end mt-10 sm:flex-row items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white"
              onClick={handleDelete}
            >
              Yes, delete
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DropDown;
