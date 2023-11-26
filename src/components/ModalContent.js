import React from "react";
import { Link } from "react-router-dom";
import { translateWeekday } from "../function/weekdayFilter";
import ModalSwiper from "./Swiper/ModalSwiper";
const ModalContent = ({ info, modalContentType }, ref) => {
  const openDayArr = info?.openDay ? info?.openDay.split("") : undefined;
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
    <section className="modal" onClick={(e) => e.stopPropagation()} ref={ref}>
      {!modalContentType && (
        <section className="modal--exhibition">
          <div className="modal__about">
            <h1 className="modal__title">{info?.name || info?.title}</h1>{" "}
            <small>{info?.time}</small>
          </div>
          <div className="modal__about">
            {info?.artistLink ? (
              <Link to={info?.artistLink}> #{info?.artist} </Link>
            ) : (
              <p>{info?.artist}</p>
            )}
          </div>
          <p>活動資訊</p>
          <hr />
          <div className="modal__about">
            <p>{info?.venue}</p>
            <p>{info?.location}</p>
            <p>
              <span>活動票價</span>
              <span> {info?.TicketType}</span>
            </p>
            {Array.isArray(openDayArr) && (
              <p>
                <span>營業日</span>
                <span>
                  {translateWeekday(openDayArr[0])!==('預'||'休')?
                  `${translateWeekday(openDayArr[0])}～ ${translateWeekday(openDayArr[openDayArr.length - 1])}`:
                  translateWeekday(openDayArr[0])==='預'?'預約制':'不定休'}
                </span>
              </p>
            )}

            <p>
              <span>相關連結</span>
              <a href={info?.link} target="_blank" rel="noreferrer noopenner">
                活動網址
              </a>
            </p>
          </div>
        </section>
      )}

      {modalContentType ? (
        <>
          <div className="modal__img">
            <ModalSwiper imgArr={info?.imgUrl} />
          </div>
          <article className="modal__desc">
            <h4> {info?.title} </h4>
            <div className="modal__tags">
              <p className="modal__tag">{whichCity}</p>
              <p className="modal__tag"> {whichYear} </p>
            </div>
            <Link to={info?.artistLink}>{info?.brand || info?.artist}</Link>
            <Link to={info?.venueLink}>{info?.venue}</Link>

            <p>
              {info?.startDate} {info?.endDate ? `～${info?.endDate}` : null}
            </p>
          </article>
        </>
      ) : null}
    </section>
  );
};

export default React.forwardRef(ModalContent);
