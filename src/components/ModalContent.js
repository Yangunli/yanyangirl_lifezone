import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { TextSpinner } from "./SvgComponents";
const ModalContent = ({ info }, ref) => {
  // useEffect(() => {
  //   const modalBodyEl = document.querySelector(".modal-body");
  //   const modalContainerEl = document.querySelector(".modal-container");
  //   function modalMoveOut() {
  //     modalBodyEl.style =
  //       "animation: modalMoveOut 0.3s ease-in-out forwards; transform-origin: bottom left; ";
  //     modalContainerEl.style = "opacity:0";
  //   }
  //   modalContainerEl.addEventListener("click", modalMoveOut);

  //   return () => modalContainerEl.removeEventListener("click", modalMoveOut);
  // }, []);

  return (
    <section
      className="modal-body"
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      <div className="spinner">
        <TextSpinner />
      </div>
      <h1 className="modal-title">{info.name}</h1>
      <dl>
        <dt>Artist</dt>
        <dd>{info.artist}</dd>
      </dl>
      <dl>
        <dt>Time</dt>
        <dd>{info.time}</dd>
      </dl>
    </section>
  );
};

export default React.forwardRef(ModalContent);
