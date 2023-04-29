import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { usePath } from "../../hooks/usePath";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Autoplay } from "swiper";

const CardSwiper = ({ exhibition, changeContent }) => {
  const { pathArr } = usePath();
  const { id, startDate } = exhibition;
  const cityId = id.slice(0, 3);
  const exhibitedYear = startDate.split("/")[0];
  const city =
    cityId == "TPE"
      ? "TAIPEI"
      : cityId == "TXG"
      ? "TAICHUNG"
      : cityId == "TNN"
      ? "TAINAN"
      : "OTHER";
  return (
    <Swiper
      onClick={() => changeContent(exhibition)}
      spaceBetween={5}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="cardSwiper"
    >
      {exhibition.imgUrl.map((url) => (
        <SwiperSlide key={url}>
          <img src={url} alt="" draggable="false" />
        </SwiperSlide>
      ))}
      <article className="cardSwiper__article">
        <p>
          <span className="artcle__tag">
            #
            {pathArr.includes("artist")
              ? city
              : exhibition.brand
              ? exhibition.brand
              : exhibition.artist}
          </span>
          {exhibitedYear && (
            <span className="artcle__tag">#{exhibitedYear}</span>
          )}
        </p>
        <h2>{exhibition.title}</h2>
      </article>
    </Swiper>
  );
};

export default CardSwiper;
