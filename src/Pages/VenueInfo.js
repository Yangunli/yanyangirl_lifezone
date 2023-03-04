import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { taipeiVenues } from "../data/taipeiVenues";
import { taichungVenues } from "../data/taichungVenue";
import { tainanVenues } from "../data/tainanVenues";
import PageHeader from "../components/PageHeader";
import { isOpenChecked, translateWeekday } from "../function/weekdayFilter";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";
import { useExhibitonRefs } from "../hooks/useExhibitionRef";
import Loading from "../components/Loading";
import CardSwiper from "../components/Swiper/CardSwiper";
import PageTransition from "../components/PageTransition";

const VenueInfo = () => {
  const [imgsLoaded, setImgsLoaded] = useState(false);

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
  const venueOpenArr = venue.openDay.split("");
  const isVenueOpen = isOpenChecked(venueOpenArr);
  const exhibitions = useExhibitonRefs("venueLink");

  useEffect(() => {
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = url;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(url);
          }, 1000);
        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.allSettled(
      exhibitions.map((info) => info.imgUrl.map((url) => loadImage(url)))
    )
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));

    // Function call
  }, []);

  return (
    <div className="main venue-bg">
      <PageHeader />
      <PageTransition />
      <div className="pt-200 w-100 df">
        <img
          className="venue__img"
          src={venue.hostImgUrl ? venue.hostImgUrl : venue.venueImgUrl[0]}
          alt={venue.venue}
        />
        <h1>{venue.venue}</h1>
        <h3>
          {isVenueOpen
            ? isVenueOpen == "?"
              ? "不定休"
              : "今日有開"
            : "今日公休"}
        </h3>
        {isVenueOpen != "?" && (
          <p>
            營業日: {translateWeekday(venueOpenArr.at(0))}-
            {translateWeekday(venueOpenArr.at(-1))}
          </p>
        )}
      </div>

      <div className="card-container pt-100  w-70 pb-45">
        {imgsLoaded ? (
          <>
            {exhibitions.map(
              (exhibition) => (
                <CardSwiper
                  key={exhibition.imgUrl[0]}
                  exhibition={exhibition}
                  changeContent={changeContent}
                />
              )

              // <img
              //   key={url}
              //   src={url}
              //   alt=""
              //   className="card"
              // onClick={() => {
              //   changeContent([{ exhibition }, { index: i }]);
              // }}
              // />
              // ))
            )}
          </>
        ) : (
          <h1>loading...</h1>
        )}
      </div>
      {modalToggle && (
        <Modal
          changeContent={changeContent}
          modalContent={modalContent.current}
        />
      )}
    </div>
  );
};

export default VenueInfo;
