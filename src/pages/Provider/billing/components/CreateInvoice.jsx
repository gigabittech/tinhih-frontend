import { useState } from "react";
import Button from "../../../../components/ui/Button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../components/ui/Modal";
import { RiBillFill } from "react-icons/ri";
import { ChevronDown, Plus } from "lucide-react";
import SettingsInput from "../../settings/components/SettingsInput";

function CreateInvoice({ isOpen, onClose }) {
  const [edit, setEdit] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "000007",
    issueDate: "Tuesday, 20 May 2025",
    dueDate: "Tuesday, 3 Jun 2025",
    practitioner: "Name",
    client: "",
    services: [
      {
        date: "",
        service: "",
        code: "",
        units: 1,
        price: 0,
        tax: 0,
        amount: 0,
      },
    ],
  });

  const today = new Date().toISOString().split("T")[0];
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  const nextWeek = oneWeekLater.toISOString().split("T")[0];

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...invoiceData.services];
    updatedServices[index][field] = value;

    // Calculate amount if price or units change
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
          date: "",
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

  const handleCloseModal = () => {
    onClose();
    setEdit(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        className={" md:max-w-max"}
      >
        <ModalHeader
          onClose={handleCloseModal}
          title={"New Invoice"}
          icon={<RiBillFill size={20} />}
        />
        <ModalBody className={" overflow-y-scroll max-h-[600px] relative"}>
          <div className="flex items-start justify-between">
            <div className="grid grid-cols-3 gap-5 w-full">
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
                name="po/so"
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
                edit ? "hidden" : " "
              }`}
            >
              Edit
            </button>
          </div>

          {/* -----------------description ---------------- */}
          <div className="py-5">

          <SettingsInput
            label="Description"
            isEditMode={edit}
            register={""}
            name="description"
          />
          </div>

          {/* -------------- Client and Practitioner Section  ----------------------- */}
          <div className="grid grid-cols-2 gap-4 mb-6 pt-3 px-3 bg-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client or contact
              </label>
              <div className="flex">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    className="block w-full px-3 py-1 border bg-white border-gray-300 rounded-l focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search"
                    value={invoiceData.client}
                    onChange={(e) =>
                      setInvoiceData({ ...invoiceData, client: e.target.value })
                    }
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown size={16} color="#3b3b3b" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Practitioner
              </label>
              <div className="flex">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    className="block w-full px-3 py-1 bg-white border border-gray-300 rounded-l focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search"
                    value={invoiceData.practitioner}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        practitioner: e.target.value,
                      })
                    }
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown size={16} color="#3b3b3b" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Bill to
              </label>
              <div className="flex">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    className="block w-full px-3 py-1 bg-white border border-gray-300 rounded-l focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown size={16} color="#3b3b3b" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------Services Table -------------------*/}
          <div className=" overflow-x-auto">
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoiceData.services.map((service, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        className="p-1 outline-none rounded w-full"
                        placeholder="Add date"
                        value={service.date}
                        onChange={(e) =>
                          handleServiceChange(index, "date", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        className="p-1 outline-none rounded w-full"
                        placeholder="Add service"
                        value={service.service}
                        onChange={(e) =>
                          handleServiceChange(index, "service", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        className="p-1 outline-none rounded w-full"
                        placeholder="Add code"
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Service Button */}
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
              onClick={() => {
                onClose();
              }}
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
