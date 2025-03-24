import React from "react";
import { Modal } from "../ui/Modal";

function CreateWorkspace({ isOpen, onClose }) {
  return <Modal isOpen={isOpen} onClose={onClose}></Modal>;
}

export default CreateWorkspace;
