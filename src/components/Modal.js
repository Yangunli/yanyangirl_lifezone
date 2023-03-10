import React, { useRef } from "react";
import ModalContent from "./ModalContent";
import { usePath } from "../hooks/usePath";
import classNames from "../function/classNames";
const Modal = ({ changeContent, modalContent }) => {
  const modalContainerRef = useRef();
  const modalRef = useRef();
  function modalMoveOut() {
    modalRef.current.style =
      "animation:modalMoveOut 0.2s ease-in-out forwards;transform-origin:  bottom left ;";
    modalContainerRef.current.style = "opacity:0;";
  }
  const { pathArr } = usePath();
  return (
    <div
      ref={modalContainerRef}
      className={classNames(
        pathArr.includes("artist")
          ? "twillBg"
          : pathArr.includes("venue")
          ? "twillBg"
          : "",
        "modal-container"
      )}
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
