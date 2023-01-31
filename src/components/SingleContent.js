import React from "react";

const SingleContent = ({ exhibition, changeContent }) => {
  return (
    <div className="card">
      <img
        className="card__img"
        onClick={() => changeContent(exhibition)}
        src={exhibition.src}
        alt={exhibition.name}
      />
      <h2> {exhibition.name} </h2>
      <h3>{exhibition.venue}</h3>
    </div>
  );
};

export default SingleContent;
