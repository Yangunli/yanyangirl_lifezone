import React from "react";
import { TextSpinner } from "./SvgComponents";
import { usePath } from "../hooks/usePath";
import { Link } from "react-router-dom";
import { translateWeekday } from "../function/weekdayFilter";
import ModalSwiper from "./Swiper/ModalSwiper";
const ModalContent = ({ info }, ref) => {
  const { isArtistInfo, isVenueInfo, pathArr } = usePath();
  const infoData = info[0] ? info[0].exhibition : info;
  const openDayArr = infoData.openDay ? infoData.openDay.split("") : undefined;
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
        <section className="modal--exhibition">
          <div className="modal__about">
            {" "}
            <h1 className="modal__title">
              {infoData.name || infoData.title}
            </h1>{" "}
            <small>{infoData.time}</small>
          </div>
          <div className="modal__about">
            {" "}
            <p>{infoData.artist}</p>
          </div>

          <p>活動資訊</p>
          <hr />
          <div className="modal__about">
            <p>{infoData.venue}</p>
            <p>{infoData.location}</p>
            <p>
              <span>活動票價</span>
              <span> {infoData.TicketType}</span>
            </p>
            <p>
              <span>營業日</span>
              <span>
                {translateWeekday(openDayArr.at(0))}-
                {translateWeekday(openDayArr.at(-1))}
              </span>
            </p>
            <p>
              <span>相關連結</span>
              <a href={infoData.link}>活動網址</a>
            </p>
          </div>
        </section>
      )}

      {isArtistInfo || isVenueInfo ? (
        <>
          <div className="modal__img">
            <ModalSwiper imgArr={info.imgUrl} />
          </div>
          <article className="modal__desc">
            <h4> {info.title} </h4>
            <div className="modal__tags">
              <p className="modal__tag">{whichCity}</p>
              <p className="modal__tag"> {whichYear} </p>
            </div>
            <Link to={info.artistLink}>{info.brand || info.artist}</Link>
            <Link to={info.venueLink}>{info.venue}</Link>

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
