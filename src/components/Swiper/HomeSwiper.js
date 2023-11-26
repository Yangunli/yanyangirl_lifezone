import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useWindowResize } from "../../hooks/useWindowResize";
import { scrollWin } from "../../function/scroll";
const HomeSwiper = ({ cityList }) => {
  const [scrollHight, setScrollHight] = useState(window.screenY);
  const { width } = useWindowResize();
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
        loop={true}
        centeredSlides={true}
        // allowTouchMove={false}
        modules={[Pagination, Autoplay]}
        className="homeSwiper"
        autoplay={{ delay: 3000 }}
        simulateTouch={false}
        preloadImages={true}
      >
        {cityList.map((city) => (
          <SwiperSlide key={`home__${city.pathName}`}>
            <Link to={city.pathName} aria-label={city.alt} onClick={scrollWin}>
              <img src={city.src} alt="" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {width > 1000 && scrollHight <= 450 && (
        <img className="home__clickImg" src="images/clickColorPng.png" alt="" />
      )}
      {width > 1000 && scrollHight > 450 && (
        <img
          className="home__clickImg2"
          src="images/clickColorPng.png"
          alt=""
        />
      )}
    </div>
  );
};

export default HomeSwiper;
