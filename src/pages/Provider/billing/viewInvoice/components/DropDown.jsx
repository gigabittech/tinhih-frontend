import React, { useRef, useState } from "react";
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
import useInvoice from "../../utilities/useInvoice";
import InvoicePreview from "./InvoicePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function DropDown({
  isOpen,
  onClose,
  id,
  serial_number,
  onCloseViewInvoice,
  currentWorkspace,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const { fetchInvoices } = useInvoiceStore();
  const { invoiceData, loading } = useInvoice(id);
  const elementRef = useRef();

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/invoices/${id}`);
      if (response.status === 200) {
        Notify("Invoice deleted successfully");
        setOpenDelete(false);
        onClose();
        fetchInvoices();
        onCloseViewInvoice();
      }
    } catch (error) {
      console.error("Delete error:", error);
      Notify("Failed to delete invoice");
    }
  };

  const [shouldRenderPreview, setShouldRenderPreview] = useState(false);

  const handleDownloadPDF = async () => {
    setShouldRenderPreview(true);

    requestAnimationFrame(() => {
      setTimeout(async () => {
        const element = elementRef.current;
        if (!element) return;

        try {
          const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true, // enable if you're loading remote images/fonts
          });

          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");

          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(`invoice-${serial_number}.pdf`);
        } catch (error) {
          console.error("PDF generation failed", error);
          Notify("Failed to generate PDF");
        } finally {
          setShouldRenderPreview(false);
        }
      }, 300);
    });
  };

  if (loading || !invoiceData) return null;

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
        <p onClick={() => handleDownloadPDF()} className="px-3 cursor-pointer">
          Download
        </p>
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

      {shouldRenderPreview && (
        <div className="absolute left-[-9999px] top-0 opacity-0 pointer-events-none">
          <div ref={elementRef}>
            <InvoicePreview
              currentWorkspace={currentWorkspace}
              invoiceData={invoiceData}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;
