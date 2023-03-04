import React from "react";
import { TextSpinner } from "./SvgComponents";
import { usePath } from "../hooks/usePath";
import { Link } from "react-router-dom";
import { scrollWin } from "../function/group";
import ModalSwiper from "./Swiper/ModalSwiper";
const ModalContent = ({ info }, ref) => {
  const { isArtistInfo, isVenueInfo, pathArr } = usePath();
  const infoData = info[0] ? info[0].exhibition : info;

  const { id, startDate } = info;
  const whichYear = startDate ? startDate.split("/")[0] : undefined;
  const cityId = id.length >= 4 ? id.slice(0, 3) : undefined;
  const whichCity = cityId
    ? cityId == "TPE"
      ? "TAIPEI"
      : cityId == "TXG"
      ? "TAICHUNG"
      : cityId == "TNN"
      ? "TAINAN"
      : "OTHER"
    : undefined;

  return (
    <section
      className="modal-body"
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      <div className="spinner">
        <TextSpinner />
      </div>
      {!isArtistInfo && !isVenueInfo && (
        <>
          <h1 className="modal-title">{infoData.name || infoData.title}</h1>

          <dl>
            <dt>Artist</dt>
            <dd>{infoData.artist}</dd>
          </dl>
          <dl>
            <dt>Venue</dt>
            <dd>{infoData.venue}</dd>
          </dl>
        </>
      )}

      {isArtistInfo || isVenueInfo ? (
        <>
          <div className="modal__img">
            <ModalSwiper imgArr={info.imgUrl} />
          </div>
          <article className="modal__desc">
            <h4> {info.title} </h4>
            <div className="modal__tags">
              <p className="modal__tag">
                {isArtistInfo
                  ? whichCity
                  : info.brand
                  ? info.brand
                  : info.artist}
              </p>
              <p className="modal__tag"> {whichYear} </p>
            </div>
            <p> {info.brand || info.artist} </p>
            <p>{info.venue}</p>
            <p>
              {info.startDate} {info.endDate ? `-${info.endDate}` : null}{" "}
            </p>
          </article>
        </>
      ) : null}
    </section>
  );
};

export default React.forwardRef(ModalContent);
