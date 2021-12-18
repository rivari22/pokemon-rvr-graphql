import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#__next");

const customStyles = (loading?: boolean) => {
  return {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: 300,
      borderRadius: 20,
      backgroundColor: loading ? "transparent" : "white",
      border: loading ? 'none' : '1px solid black'
    },
  };
};

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  loading?: boolean;
}

const Modal = ({ children, isOpen, loading }: IModalProps) => {
  return (
    <ReactModal isOpen={isOpen} style={customStyles(loading)}>
      {children}
    </ReactModal>
  );
};

export default Modal;
