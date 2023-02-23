import React from "react";
import { TextSpinner } from "./SvgComponents";
import { usePath } from "../hooks/usePath";
import { Link } from "react-router-dom";
import { scrollWin } from "../function/group";
const ModalContent = ({ info }, ref) => {
  const { isArtistInfo, isVenueInfo } = usePath();
  const infoData = info[0] ? info[0].exhibition : info;
  const imgIndex = info[1] ? info[1].index : undefined;

  return (
    <section
      className="modal-body"
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      <div className="spinner">
        <TextSpinner />
      </div>

      <h1 className="modal-title">{infoData.name || infoData.title}</h1>

      <dl>
        <dt>Artist</dt>
        <dd>{infoData.artist}</dd>
      </dl>
      <dl>
        <dt>Venue</dt>
        <dd>{infoData.venue}</dd>
      </dl>
      {isArtistInfo && infoData.venueLink && (
        <Link to={infoData.venueLink} onClick={scrollWin}>
          看空間的展覽照片
        </Link>
      )}
      {isVenueInfo && infoData.artistLink && (
        <Link to={infoData.artistLink} onClick={scrollWin}>
          看藝術家更多作品
        </Link>
      )}
    </section>
  );
};

export default React.forwardRef(ModalContent);
