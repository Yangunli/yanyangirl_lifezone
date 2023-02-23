import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuSvg1, LogoSvg } from "../components/SvgComponents";
import { useWindowResize } from "../hooks/useWindowResize";
import { useScrollBgColor } from "../hooks/useScrollBgColor";
import { useScrollNavDisplay } from "../hooks/useScrollNavDisplay";
import { taipeiExp } from "../data/taipeiExhibition";
import { taichungExp } from "../data/taichungExhibition";
import { tainanExp } from "../data/tainanExhibition";
import SingleContent from "../components/SingleContent";
import HomeSwiper from "../components/HomeSwiper";
import Menu from "../components/Menu";
import Modal from "../components/Modal";
import classNames from "../function/classNames";
import PageHeader from "../components/PageHeader";
import { currentFilter } from "../function/exhibitionFilter";
import { isOpenChecked } from "../function/weekdayFilter";
import Footer from "../components/Footer";
import { useModal } from "../hooks/useModal";
import { useMenu } from "../hooks/useMenu";
import { cityList } from "../data/cityList";
const Home = () => {
  const [imgsLoaded, setImgsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.img;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image.img);
          }, 2000);

        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(cityList.map((image) => loadImage(image)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, []);

  const windowSize = useWindowResize();
  const exhibition = [
    ...currentFilter(taipeiExp).slice(-5, -1),
    ...currentFilter(taichungExp).slice(-5, -1),
    ...currentFilter(tainanExp).slice(-5, -1),
  ];
  const { modalContent, modalToggle, changeContent } = useModal();
  const { menuToggle, changeMenu } = useMenu();
  const scrollDirection = useScrollNavDisplay();

  return (
    <>
      <div className="home exhibition-bg">
        {/* <div className="home-animation"></div> */}
        {imgsLoaded ? (
          <>
            {windowSize.width >= 800 ? (
              <>
                <button onClick={changeMenu}>
                  <MenuSvg1 />
                </button>
                {menuToggle ? <Menu changeMenu={changeMenu} /> : null}
                <header
                  className={classNames(
                    scrollDirection == "up" ? "opacity-1" : "opacity-0",
                    "home__header",
                    "exhibition-bg"
                  )}
                >
                  <div className="home__nav-container">
                    <nav className="home__nav">
                      <Link to="/" aria-label="Back to thehomepage">
                        home
                      </Link>
                      <Link to="/taipei" aria-label="Read more about Taipei">
                        taipei
                      </Link>
                      <Link
                        to="/artist"
                        aria-label="This page about taiwan/s artists"
                      >
                        artist
                      </Link>
                      <Link
                        to="/taichung"
                        aria-label="Read more about Taichung"
                      >
                        taichung
                      </Link>
                      <Link to="/tainan" aria-label="Read more about Tainan">
                        tainan
                      </Link>
                    </nav>
                    <LogoSvg />
                  </div>
                </header>
              </>
            ) : (
              <PageHeader />
            )}

            <HomeSwiper cityList={cityList} />
            <div className="info-title">
              <h1>CURRENT EXHIBITION</h1>
            </div>
            <div className="card-container">
              {exhibition.map((exp) => (
                <SingleContent
                  classNames={classNames}
                  isOpenChecked={isOpenChecked}
                  exhibition={exp}
                  key={exp.id}
                  changeContent={changeContent}
                />
              ))}
              {modalToggle && (
                <Modal
                  changeContent={changeContent}
                  modalContent={modalContent.current}
                />
              )}
            </div>
          </>
        ) : (
          <h1>Loading images...</h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
