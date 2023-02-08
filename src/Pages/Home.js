import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MenuSvg1, LogoSvg } from "../components/SvgComponents";
import { useScrollBgColor } from "../hooks/useScrollBgColor";
import { useScrollNavDisplay } from "../hooks/useScrollNavDisplay";
import { taipeiExp } from "../data/taipeiExhibition";
import { taichungExp } from "../data/taichungExhibition";
import { tainanExp } from "../data/tainanExhibition";
import SingleContent from "../components/SingleContent";
import HomeSlider from "../components/HomeSlider";
import Menu from "../components/Menu";
import classNames from "../function/classNames";
import PageHeader from "../components/PageHeader";
import { currentFilter } from "../function/exhibitionFilter";
import { isOpenChecked } from "../function/weekdayFilter";
import Modal from "../components/Modal";

const Home = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [size, setSize] = useState(0);
  const modalContent = useRef([]);

  const exhibition = [
    ...currentFilter(taipeiExp).slice(-5, -1),
    ...currentFilter(taichungExp).slice(-5, -1),
    ...currentFilter(tainanExp).slice(-5, -1),
  ];

  const changeSideBar = () => {
    setSideBarToggle(!sideBarToggle);
  };
  const changeContent = (info) => {
    modalContent.current = [info];
    setModalToggle(!modalToggle);
  };
  const scrollDirection = useScrollNavDisplay();

  useEffect(() => {
    window.addEventListener("load", function () {
      setSize(window.innerWidth);
    });
    window.addEventListener("resize", function () {
      setSize(window.innerWidth);
    });

    return () => {
      window.removeEventListener("load", function () {
        setSize(window.innerWidth);
      });
      window.removeEventListener("resize", function () {
        setSize(window.innerWidth);
      });
    };
  }, [size]);

  return (
    <div className="home exhibition-bg">
      {/* <div className="home-animation"></div> */}
      {!size || size >= 800 ? (
        <>
          <button onClick={changeSideBar}>
            <MenuSvg1 />
          </button>
          {sideBarToggle ? <Menu changeSideBar={changeSideBar} /> : null}
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
                <Link to="/taichung" aria-label="Read more about Taichung">
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

      <HomeSlider />
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
    </div>
  );
};

export default Home;
