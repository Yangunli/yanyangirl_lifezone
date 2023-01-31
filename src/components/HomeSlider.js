import React from "react";
import { Link } from "react-router-dom";
import { cityList } from "../data/cityList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomeSlider = () => {
  return (
    <div className="home__city-slider">
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        pagination={{
          el: ".swiper-pagination",
          type: "fraction",
        }}
        loop={true}
        centeredSlides={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{ delay: 3000 }}
        simulateTouch={false}
        preloadImages={false}
        // Enable lazy loading
        lazy={true}
      >
        {cityList.map((city) => (
          <SwiperSlide key={city.name}>
            <Link to={city.name}>
              <img src={city.img} alt="" />
              {/* <p className="desc">{city.desc}</p> */}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
