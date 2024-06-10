import React, { ReactNode } from "react";
import Input from "./Input";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalStyle = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg z-50 transition-opacity w-2/4 max-w-4xl ${
    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  }`;

  const overlayStyle = `fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 ${
    isOpen ? "block" : "hidden"
  }`;

  return (
    <>
      <div className={modalStyle}>
        {children}

        <button
          onClick={onClose}
          className="block mt-4 px-4 py-2 text-black rounded border border-black"
        >
          Close
        </button>
      </div>
      <div className={overlayStyle} onClick={onClose}></div>
    </>
  );
};

export default Modal;
