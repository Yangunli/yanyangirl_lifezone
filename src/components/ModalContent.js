import React from "react";

const ModalContent = ({ info }) => {
  return (
    <section className="modal-body" onClick={(e) => e.stopPropagation()}>
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
