import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuSvg1, MenuSvg2, LogoSvg } from "../components/SvgComponents";
import { cityList } from "../data/cityList";
import { useScrollBgColor } from "../hooks/useScrollBgColor";
import { useScrollNavDisplay } from "../hooks/useScrollNavDisplay";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import { taipeiExp } from "../data/taipeiExhibition";
import { taichungExp } from "../data/taichungExhibition";
import { tainanExp } from "../data/tainanExhibition";
import SingleContent from "../components/SingleContent";
import ModalContent from "../components/ModalContent";
const Home = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const changeContent = (info) => {
    setModalContent([info]);
    setModalToggle(!modalToggle);
  };
  const bgColor = useScrollBgColor();
  const scrollDirection = useScrollNavDisplay();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const exhibition = [
    ...taipeiExp.slice(-5, -1),
    ...taichungExp.slice(-5, -1),
    ...tainanExp.slice(-5, -1),
  ];
  return (
    <div className="home" style={{ backgroundColor: `hsl(${bgColor},28%,76%` }}>
      <header
        className={classNames(
          scrollDirection == "up" ? "opacity-1" : "opacity-0",
          "home__header"
        )}
      >
        <button
          onClick={() => {
            console.log("menu1");
          }}
        >
          <MenuSvg1 />
        </button>
        <button
          className="menu"
          onClick={() => {
            console.log("menu2");
          }}
        >
          <MenuSvg2 />
        </button>
        <div className="home__nav-container">
          <nav className="home__nav">
            <Link to="/">home</Link>
            <Link to="/taipei">taipei</Link>
            <Link to="/artist">artist</Link>
            <Link to="/taichung">taichung</Link>
            <Link to="/tainan">tainan</Link>
          </nav>
          <LogoSvg />
        </div>
      </header>
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
              <Link to={city.name}>
                <img src={city.img} alt="" />
                {/* <p className="desc">{city.desc}</p> */}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="info-title">
        <h1>CURRENT EXHIBITION</h1>
      </div>
      <div className="card-container">
        {exhibition.map((exp) => (
          <SingleContent
            exhibition={exp}
            key={exp.id}
            changeContent={changeContent}
          />
        ))}
        {modalToggle && (
          <div className="modal-container" onClick={changeContent}>
            {modalContent.map((modal) => (
              <ModalContent info={modal} key="1111" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
