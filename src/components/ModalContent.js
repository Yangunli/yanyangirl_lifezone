import React from "react";
import { TextSpinner } from "./SvgComponents";
const ModalContent = ({ info }) => {
  return (
    <section className="modal-body" onClick={(e) => e.stopPropagation()}>
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

export default ModalContent;
