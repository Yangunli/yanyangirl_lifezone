import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cityList } from "../data/cityList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useWindowResize } from "../hooks/useWindowResize";
import { scrollWin } from "../function/group";
const HomeSwiper = () => {
  const [scrollHight, setScrollHight] = useState(window.screenY);
  const { width, height } = useWindowResize();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollHight(window.scrollY);
    });
    return () =>
      window.removeEventListener("scroll", () => {
        setScrollHight(window.scrollY);
      });
  }, [scrollHight]);

  return (
    <div className="home__city-slider">
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
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
            <Link to={city.name} aria-label={city.alt} onClick={scrollWin}>
              <img src={city.img} alt="" />
              {/* <p className="desc">{city.desc}</p> */}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {width > 1000 && scrollHight <= 450 && (
        <img className="home__img" src="images/clickColorPng.png" alt="" />
      )}
      {width > 1000 && scrollHight > 450 && (
        <img className="home__img2" src="images/clickColorPng.png" alt="" />
      )}
    </div>
  );
};

export default HomeSwiper;
