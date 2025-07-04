import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/ui/Button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../components/ui/Modal";
import { RiBillFill } from "react-icons/ri";
import { Plus, X } from "lucide-react";
import SettingsInput from "../../settings/components/SettingsInput";
import useUserStore from "../../../../store/global/userStore";
import ClientSelectDropdown from "./ClientSelectDropdown";
import axiosInstance from "../../../../lib/axiosInstanceWithToken";

function CreateInvoice({ isOpen, onClose }) {
  const [edit, setEdit] = useState(false);
  const [clientManuallySet, setClientManuallySet] = useState(false);
  const [billToManuallySet, setBillToManuallySet] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  const nextWeek = oneWeekLater.toISOString().split("T")[0];

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "000007",
    issueDate: "Tuesday, 20 May 2025",
    dueDate: "Tuesday, 3 Jun 2025",
    practitioner: "Name",
    client: "",
    billTo: "",
    services: [],
  });

  const { user } = useUserStore();

  // React Hook Form for validation & errors only
  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const handleServiceChange = (index, value) => {
    const updatedServices = [...invoiceData.services];
    const serviceId = Number(value);

    const selectedService = user?.currentWorkspace?.services.find(
      (s) => s.id === serviceId
    );

    if (selectedService) {
      const price = parseFloat(selectedService.price) || 0;
      updatedServices[index] = {
        ...updatedServices[index],
        service: value,
        price: price,
        amount: price,
      };

      //Only clear error here when a valid service is selected
      clearErrors("services");
    } else {
      updatedServices[index] = {
        ...updatedServices[index],
        service: "",
        price: 0,
        amount: 0,
      };
    }

    setInvoiceData({ ...invoiceData, services: updatedServices });
  };

  const handleFieldChange = (index, field, value) => {
    const updatedServices = [...invoiceData.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]:
        field === "units" || field === "price" || field === "tax"
          ? parseFloat(value) || 0
          : value,
    };

    setInvoiceData({ ...invoiceData, services: updatedServices });
  };

  const addService = () => {
    setInvoiceData({
      ...invoiceData,
      services: [
        ...invoiceData.services,
        {
          date: today,
          service: "",
          code: "",
          units: 1,
          price: 0,
          tax: 0,
          amount: 0,
        },
      ],
    });
  };

  const removeService = (index) => {
    const updatedServices = invoiceData.services.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, services: updatedServices });
  };

  const onSubmit = async () => {
    clearErrors();

    let hasError = false;

    if (!invoiceData.client) {
      setError("client", { type: "required", message: "Client is required" });
      hasError = true;
    }

    if (!invoiceData.billTo) {
      setError("billTo", { type: "required", message: "Bill To is required" });
      hasError = true;
    }

    if (!invoiceData.services.length) {
      setError("services", {
        type: "required",
        message: "At least one service is required",
      });
      hasError = true;
    }

    if (hasError) return;

    const payload = {
      client_id: Number(invoiceData.client),
      biller_id: Number(invoiceData.billTo),
      title: invoiceData.title || "Invoice",
      serial_number: invoiceData.invoiceNumber || "000007",
      po_so_number: invoiceData.po_so || "",
      tax_id: invoiceData.tax || null,
      issue_date: invoiceData.issueDate || today,
      due_date: invoiceData.dueDate || nextWeek,
      description: invoiceData.description || "",
      services: invoiceData.services.map((s) => ({
        id: Number(s.service),
        price: Number(s.price),
        unit: Number(s.units),
        date: s.date,
        taxes: s.tax ? [Number(s.tax)] : [],
        code: s.code || "",
      })),
    };

    try {
      const response = await axiosInstance.post("/invoices", payload);

      if (response.status === 200) {
        alert("Invoice created successfully!");
        onClose();
      } else {
        alert("Failed to create invoice. Please try again.");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("An error occurred while creating the invoice.");
    }
  };

  const resetInvoiceData = () => {
    setEdit(false);
    setClientManuallySet(false);
    setBillToManuallySet(false);
    clearErrors(); // Clear all react-hook-form errors
    setInvoiceData({
      invoiceNumber: "000007",
      issueDate: today,
      dueDate: nextWeek,
      practitioner: "Name",
      client: "",
      billTo: "",
      services: [],
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetInvoiceData();
        setEdit(false);
        onClose();
      }}
      className={"md:max-w-[95vw]"}
    >
      <ModalHeader
        onClose={() => {
          resetInvoiceData();
          setEdit(false);
          onClose();
        }}
        title={"New Invoice"}
        icon={<RiBillFill size={20} />}
      />
      <ModalBody className={"overflow-y-scroll max-h-[600px] relative"}>
        {/* Header Inputs */}
        <div className="flex items-start justify-between">
          <div className="grid grid-cols-3 gap-3 w-full">
            <SettingsInput
              label="Title"
              defaultValue={"Invoice"}
              isEditMode={edit}
              register={""}
              placeholder="Invoice"
              name="title"
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, title: e.target.value })
              }
            />
            <SettingsInput
              label="Invoice #"
              isEditMode={edit}
              defaultValue={edit ? "" : "000015"}
              register={""}
              placeholder="000015"
              name="invoiceNumber"
              onChange={(e) =>
                setInvoiceData({
                  ...invoiceData,
                  invoiceNumber: e.target.value,
                })
              }
            />
            <SettingsInput
              label="PO/SO number"
              isEditMode={edit}
              register={""}
              name="po_so"
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, po_so: e.target.value })
              }
            />
            <SettingsInput
              label="Tax ID"
              isEditMode={edit}
              register={""}
              name="tax"
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, tax: e.target.value })
              }
            />
            <SettingsInput
              label="Issue date"
              isEditMode={edit}
              defaultValue={today}
              register={""}
              type="date"
              name="issueDate"
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, issueDate: e.target.value })
              }
            />
            <SettingsInput
              label="Due date"
              isEditMode={edit}
              defaultValue={nextWeek}
              register={""}
              type="date"
              name="dueDate"
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, dueDate: e.target.value })
              }
            />
          </div>
          <button
            onClick={() => setEdit(true)}
            className={` text-primary-800 font-bold cursor-pointer absolute right-5 ${
              edit ? "hidden" : ""
            }`}
          >
            Edit
          </button>
        </div>

        {/* Description */}
        <div className="py-5">
          <SettingsInput
            label="Description"
            isEditMode={edit}
            register={""}
            name="description"
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, description: e.target.value })
            }
          />
        </div>

        {/* Client and Bill To */}
        <div className="grid grid-cols-2 gap-4 mb-6 py-5 px-3 bg-gray-100">
          <ClientSelectDropdown
            label="Client or contact"
            name="client"
            value={invoiceData.client}
            options={user?.currentWorkspace?.clients || []}
            onChange={(value) => {
              setClientManuallySet(true);
              setInvoiceData((prev) => ({
                ...prev,
                client: value,
                billTo: billToManuallySet ? prev.billTo : value,
              }));

              clearErrors("client");
              if (!billToManuallySet) clearErrors("billTo"); //  Also clear billTo error
            }}
            error={errors.client?.message}
          />

          <ClientSelectDropdown
            label="Bill to"
            name="billTo"
            value={invoiceData.billTo}
            options={user?.currentWorkspace?.clients || []}
            onChange={(value) => {
              setBillToManuallySet(true);
              setInvoiceData((prev) => ({
                ...prev,
                billTo: value,
                client: clientManuallySet ? prev.client : value,
              }));

              clearErrors("billTo");
              if (!clientManuallySet) clearErrors("client"); //  Also clear client error
            }}
            error={errors.billTo?.message}
          />
        </div>

        {/* Services Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tax
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoiceData.services.map((service, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input
                      type="date"
                      className="p-1 outline-none rounded w-full"
                      value={service.date}
                      onChange={(e) =>
                        handleFieldChange(index, "date", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <select
                      className="p-1 outline-none rounded w-full"
                      value={service.service}
                      onChange={(e) =>
                        handleServiceChange(index, e.target.value)
                      }
                    >
                      <option value="">Select service</option>
                      {user?.currentWorkspace?.services?.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.service_name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input
                      type="text"
                      className="p-1 outline-none rounded w-full"
                      placeholder="Code"
                      value={service.code}
                      onChange={(e) =>
                        handleFieldChange(index, "code", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input
                      type="number"
                      className="p-1 outline-none rounded w-full"
                      value={service.units}
                      onChange={(e) =>
                        handleFieldChange(index, "units", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input
                      type="number"
                      className="p-1 outline-none rounded w-full"
                      value={service.price}
                      onChange={(e) =>
                        handleFieldChange(index, "price", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input
                      type="number"
                      className="p-1 outline-none rounded w-full"
                      value={service.tax}
                      onChange={(e) =>
                        handleFieldChange(index, "tax", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="p-1">{service.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {errors.services && (
            <p className="mt-2 text-sm text-red-600 px-3">
              {errors.services.message}
            </p>
          )}
        </div>

        <button
          onClick={addService}
          className="flex items-center gap-2 text-primary-700 border-b border-t border-gray-300 w-full py-3 mt-4"
        >
          <Plus size={15} />
          Add service
        </button>
      </ModalBody>
      <ModalFooter className="justify-end">
        <div className="w-full sm:w-auto flex flex-col-reverse sm:flex-row items-center gap-3">
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
            className="w-full sm:w-auto"
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default CreateInvoice;
