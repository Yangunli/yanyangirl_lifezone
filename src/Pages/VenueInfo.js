import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { taipeiVenues } from "../data/taipeiVenues";
import { taichungVenues } from "../data/taichungVenue";
import { tainanVenues } from "../data/tainanVenues";
import PageHeader from "../components/PageHeader";
import Loading from "../components/Loading";
import CardSwiper from "../components/Swiper/CardSwiper";
import Modal from "../components/Modal";
import PageTransition from "../components/PageTransition";
import { isOpenChecked, translateWeekday } from "../function/weekdayFilter";
import { useModal } from "../hooks/useModal";
import { useExhibitonRefs } from "../hooks/useExhibitionRef";
import { useWindowResize } from "../hooks/useWindowResize";
import { useFirestorePromise } from "../hooks/useFirestorePromise";
const VenueInfo = () => {
  const { width } = useWindowResize();
  const { Id } = useParams();
  const { city } = useOutletContext();
  const { modalContent, changeContent, modalToggle } = useModal();
  const venues =
    city === "taipei"
      ? taipeiVenues
      : city === "taichung"
      ? taichungVenues
      : tainanVenues;

  const venue = venues.find((venue) => venue.id == Id);
  const desc = venue.desc ? venue.desc : "走進展覽以及美好的所在";
  const venueOpenArr = venue.openDay.split("");
  const isVenueOpen = isOpenChecked(venueOpenArr);
  const exhibitions = useExhibitonRefs("venueLink");
  const { imgsLoaded } = exhibitions ? useFirestorePromise(exhibitions) : null;

  return (
    <div className="main venue-bg">
      <PageHeader />
      {imgsLoaded && <PageTransition />}
      <div className="pt-200 venueInfo  h-100">
        <div className="venue__imgContainer">
          <img
            className="venue__img"
            src={venue.hostImgUrl ? venue.venueImgUrl[1] : venue.venueImgUrl[0]}
            alt={venue.venue}
          />
        </div>
        <section className="venue__desc">
          <h1>{desc}</h1>
          <h2 className="venue__desc__title">{venue.venue}</h2>

          {isVenueOpen != ("?"||"預") ? (
            <p>
              營業日: {translateWeekday(venueOpenArr[0])}-
              {translateWeekday(venueOpenArr[venueOpenArr.length - 1])}
            </p>
          ) : (
            <p>不定休/預約制</p>
          )}
          <small>{venue.location}</small>
          {width >= 600 && <img src="/images/walking.png" alt="" />}
        </section>
      </div>

      <div className="card-container pt-100  w-60 pb-45">
        {imgsLoaded ? (
          <>
            {exhibitions.map((exhibition) => (
              <CardSwiper
                key={exhibition.imgUrl[0]}
                exhibition={exhibition}
                changeContent={changeContent}
              />
            ))}
          </>
        ) : (
          <Loading />
        )}
      </div>
      {modalToggle && (
        <Modal
          modalBg="twillBg"
          modalContentType="isVenueInfo"
          changeContent={changeContent}
          modalContent={modalContent.current}
        />
      )}
    </div>
  );
};

export default VenueInfo;
