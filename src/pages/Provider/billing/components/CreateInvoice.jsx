import Button from "../../../../components/ui/Button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../components/ui/Modal";
import { RiBillFill } from "react-icons/ri";

function CreateInvoice({ isOpen, onClose }) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader
          onClose={onClose}
          title={"New Invoice"}
          icon={<RiBillFill size={20} />}
        />
        <ModalBody>Coming soon</ModalBody>
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
