import React, { useRef } from "react";
import ModalContent from "./ModalContent";

const Modal = ({ changeContent, modalContent }) => {
  const modalContainerRef = useRef();
  const modalRef = useRef();
  function modalMoveOut() {
    modalRef.current.style.animation = "modalMoveOut 0.2s ease-in-out forwards";
    modalRef.current.style.transformOrigin = " bottom left ";
    modalContainerRef.style = "opacity:0";
  }
  return (
    <div
      ref={modalContainerRef}
      className="modal-container"
      onClick={() => {
        modalMoveOut();
        setTimeout(() => {
          changeContent();
        }, 200);
      }}
    >
      {modalContent.map((modal) => (
        <ModalContent info={modal} ref={modalRef} key="modal" />
      ))}
    </div>
  );
};

export default Modal;
