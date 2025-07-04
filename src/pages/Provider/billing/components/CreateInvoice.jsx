import { useState } from "react";
import Button from "../../../../components/ui/Button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../components/ui/Modal";
import { RiBillFill } from "react-icons/ri";
import { ChevronDown, Plus, X } from "lucide-react";
import SettingsInput from "../../settings/components/SettingsInput";
import useUserStore from "../../../../store/global/userStore";
import ClientSelectDropdown from "./ClientSelectDropdown";

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
  

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...invoiceData.services];
    updatedServices[index][field] = value;
    if (field === "price" || field === "units") {
      updatedServices[index].amount =
        parseFloat(updatedServices[index].units || 0) *
        parseFloat(updatedServices[index].price || 0);
    }
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

  const handleCloseModal = () => {
    setInvoiceData({
      invoiceNumber: "000007",
      issueDate: "Tuesday, 20 May 2025",
      dueDate: "Tuesday, 3 Jun 2025",
      practitioner: "Name",
      client: "",
      billTo: "",
      services: [],
    });
    setClientManuallySet(false);
    setBillToManuallySet(false);
    setEdit(false);
    onClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        className={"md:max-w-[95vw]"}
      >
        <ModalHeader
          onClose={handleCloseModal}
          title={"New Invoice"}
          icon={<RiBillFill size={20} />}
        />
        <ModalBody className={" overflow-y-scroll max-h-[600px] relative"}>
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
              />
              <SettingsInput
                label="Invoice #"
                isEditMode={edit}
                defaultValue={edit ? "" : "000015"}
                register={""}
                placeholder="000015"
                name="invoice"
              />
              <SettingsInput
                label="PO/SO number"
                isEditMode={edit}
                register={""}
                name="po_so"
              />
              <SettingsInput
                label="Tax ID"
                isEditMode={edit}
                register={""}
                name="tax"
              />
              <SettingsInput
                label="Issue date"
                isEditMode={edit}
                defaultValue={today}
                register={""}
                type="date"
                name="issue"
              />
              <SettingsInput
                label="Due date"
                isEditMode={edit}
                defaultValue={nextWeek}
                register={""}
                type="date"
                name="due"
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
              }}
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
              }}
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
                          handleServiceChange(index, "date", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <select
                        className="p-1 outline-none rounded w-full"
                        value={service.service}
                        onChange={(e) =>
                          handleServiceChange(index, "service", e.target.value)
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
                          handleServiceChange(index, "code", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        className="p-1 outline-none rounded w-full"
                        value={service.units}
                        onChange={(e) =>
                          handleServiceChange(index, "units", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        className="p-1 outline-none rounded w-full"
                        value={service.price}
                        onChange={(e) =>
                          handleServiceChange(index, "price", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        className="p-1 outline-none rounded w-full"
                        value={service.tax}
                        onChange={(e) =>
                          handleServiceChange(index, "tax", e.target.value)
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
          </div>

          <button
            onClick={addService}
            className="flex items-center gap-2 text-primary-700 border-b border-t border-gray-300 w-full py-3"
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
            <Button type="submit" className="w-full sm:w-auto">
              Create
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateInvoice;
