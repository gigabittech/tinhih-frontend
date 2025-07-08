import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiBillFill } from "react-icons/ri";
import { Plus, X } from "lucide-react";
import useUserStore from "../../../../store/global/userStore";
import useInvoice from "../services/useInvoice";
import axiosInstance from "../../../../lib/axiosInstanceWithToken";
import { Notify } from "../../../../components/ui/Toaster";
import ClientSelectDropdown from "../createInvoice/components/ClientSelectDropdown";
import SettingsInput from "../../settings/components/SettingsInput";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../components/ui/Modal";
import Button from "../../../../components/ui/Button";
import useInvoiceStore from "../../../../store/provider/invoiceStore";

function EditInvoice({ isOpen, onClose, invoiceId }) {
  const { user } = useUserStore();
  const { invoiceData: fetchedInvoice, loading } = useInvoice(invoiceId);
  const { fetchInvoices } = useInvoiceStore();
  const [edit, setEdit] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [clientManuallySet, setClientManuallySet] = useState(false);
  const [billToManuallySet, setBillToManuallySet] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  useEffect(() => {
    if (fetchedInvoice) {
      setInvoiceData({
        invoiceNumber: fetchedInvoice.serial_number,
        issueDate: fetchedInvoice.issue_date,
        dueDate: fetchedInvoice.due_date,
        practitioner: "Name",
        client: String(fetchedInvoice.client_id),
        billTo: String(fetchedInvoice.biller_id),
        title: fetchedInvoice.title,
        po_so: fetchedInvoice.po_so_number,
        tax: fetchedInvoice.tax_id,
        description: fetchedInvoice.description,
        services: fetchedInvoice.services.map((s) => ({
          date: s.date,
          service: String(s.id),
          price: s.price,
          units: s.unit,
          tax: s.taxes?.[0] || 0,
          code: s.code,
          amount: s.price * s.unit,
        })),
      });
    }
  }, [fetchedInvoice]);

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
        price,
        amount: price * (updatedServices[index].units || 1),
      };
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
    const service = updatedServices[index];
    const parsedValue =
      field === "units" || field === "price" || field === "tax"
        ? parseFloat(value) || 0
        : value;
    service[field] = parsedValue;
    const price = field === "price" ? parsedValue : service.price || 0;
    const units = field === "units" ? parsedValue : service.units || 0;
    service.amount = price * units;
    updatedServices[index] = service;
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

    if (
      !invoiceData.services.length ||
      invoiceData.services.every((s) => !s.service)
    ) {
      setError("services", {
        type: "required",
        message: "At least one service must be selected",
      });
      hasError = true;
    }

    if (hasError) return;

    const payload = {
      services: invoiceData.services.map((s) => ({
        id: Number(s.service),
        price: Number(s.price),
        unit: Number(s.units),
        date: s.date,
        taxes: s.tax ? [Number(s.tax)] : [],
        code: s.code || "",
      })),
      is_paid: false,
    };

    try {
      const response = await axiosInstance.put(
        `/invoices/${invoiceId}`,
        payload
      );
      if (response.status === 200) {
        Notify(response.data.message);
        onClose();
        fetchInvoices();
      } else {
        alert("Failed to update invoice. Please try again.");
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("An error occurred while updating the invoice.");
    }
  };

  const resetAndClose = () => {
    setClientManuallySet(false);
    setBillToManuallySet(false);
    clearErrors();
    onClose();
  };

  if (!invoiceData) return null;

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} className="md:max-w-[95vw]">
      <ModalHeader
        onClose={resetAndClose}
        title="Edit Invoice"
        icon={<RiBillFill size={20} />}
      />
      <ModalBody className="overflow-y-scroll max-h-[600px] relative">
        <div className="grid grid-cols-3 gap-3 w-full">
          <SettingsInput
            label="Title"
            isEditMode={edit}
            name="title"
            defaultValue={invoiceData.title}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, title: e.target.value })
            }
          />
          <SettingsInput
            label="Invoice #"
            isEditMode={edit}
            name="invoiceNumber"
            defaultValue={invoiceData.invoiceNumber}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })
            }
          />
          <SettingsInput
            label="PO/SO number"
            isEditMode={edit}
            name="po_so"
            defaultValue={invoiceData.po_so}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, po_so: e.target.value })
            }
          />
          <SettingsInput
            label="Tax ID"
            isEditMode={edit}
            name="tax"
            defaultValue={invoiceData.tax}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, tax: e.target.value })
            }
          />
          <SettingsInput
            label="Issue date"
            isEditMode={edit}
            type="date"
            name="issueDate"
            defaultValue={invoiceData.issueDate}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, issueDate: e.target.value })
            }
          />
          <SettingsInput
            label="Due date"
            isEditMode={edit}
            type="date"
            name="dueDate"
            defaultValue={invoiceData.dueDate}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, dueDate: e.target.value })
            }
          />
        </div>

        <div className="py-5">
          <SettingsInput
            label="Description"
            isEditMode={edit}
            name="description"
            defaultValue={invoiceData.description}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, description: e.target.value })
            }
          />
        </div>

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
              if (!billToManuallySet) clearErrors("billTo");
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
              if (!clientManuallySet) clearErrors("client");
            }}
            error={errors.billTo?.message}
          />
        </div>

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
                      <option value="" disabled>
                        Select service
                      </option>
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
            variant="outline"
            onClick={resetAndClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} className="w-full sm:w-auto">
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default EditInvoice;
