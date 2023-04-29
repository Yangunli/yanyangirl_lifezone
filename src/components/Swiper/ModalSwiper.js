import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative, Autoplay } from "swiper";
const ModalSwiper = ({ imgArr }) => {
  return (
    <Swiper
      // grabCursor={true}
      effect={"creative"}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: ["-20%", 0, -1],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      modules={[EffectCreative, Autoplay]}
    >
      {imgArr.map((url) => (
        <SwiperSlide key={url}>
          <img src={url} alt={url} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ModalSwiper;
