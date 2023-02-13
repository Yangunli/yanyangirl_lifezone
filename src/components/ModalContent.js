import React from "react";
import { TextSpinner } from "./SvgComponents";
import { usePath } from "../hooks/usePath";
import { Link } from "react-router-dom";
const ModalContent = ({ info }, ref) => {
  const { isArtistInfo, isVenueInfo } = usePath();
  return (
    <section
      className="modal-body"
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      <div className="spinner">
        <TextSpinner />
      </div>
      <h1 className="modal-title">{info.name || info.title}</h1>
      <dl>
        <dt>Artist</dt>
        <dd>{info.artist}</dd>
      </dl>
      <dl>
        <dt>Venue</dt>
        <dd>{info.venue}</dd>
      </dl>
      {isArtistInfo && <Link to={info.venueLink}>看空間的展覽照片</Link>}
      {isVenueInfo && <Link to={info.artistLink}>看藝術家更多作品</Link>}
    </section>
  );
};

export default React.forwardRef(ModalContent);
