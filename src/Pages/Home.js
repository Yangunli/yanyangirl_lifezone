import React, { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { MenuSvg1, MenuSvg2, LogoSvg } from "../components/SvgComponents";
import { useScrollBgColor } from "../hooks/useScrollBgColor";
import { useScrollNavDisplay } from "../hooks/useScrollNavDisplay";
import { taipeiExp } from "../data/taipeiExhibition";
import { taichungExp } from "../data/taichungExhibition";
import { tainanExp } from "../data/tainanExhibition";
import SingleContent from "../components/SingleContent";
import ModalContent from "../components/ModalContent";
import HomeSlider from "../components/HomeSlider";
import Menu from "../components/Menu";

import classNames from "../function/classNames";

const Home = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const exhibition = [
    ...taipeiExp
      .filter((exhibit) => new Date(exhibit.time.split("-")[1]) > new Date())
      .slice(-5, -1),
    ...taichungExp
      .filter((exhibit) => new Date(exhibit.time.split("-")[1]) > new Date())
      .slice(-5, -1),
    ...tainanExp
      .filter((exhibit) => new Date(exhibit.time.split("-")[1]) > new Date())
      .slice(-5, -1),
  ];

  const changeSideBar = () => {
    setSideBarToggle(!sideBarToggle);
  };
  const changeContent = (info) => {
    setModalContent([info]);
    setModalToggle(!modalToggle);
  };
  const bgColor = useScrollBgColor();
  const scrollDirection = useScrollNavDisplay();

  // useEffect(() => {
  //   const homeAnimationEl = document.querySelector(".home-animation");
  //   function homeAnimate() {
  //     homeAnimationEl.style =
  //       "transition: opacity 2s ease-in-out; opacity:0; pointer-events:none; ";
  //   }
  //   homeAnimationEl.addEventListener("animationend", homeAnimate);

  //   return () => window.removeEventListener("animationend", homeAnimate);
  // }, []);

  return (
    <div className="home" style={{ backgroundColor: `hsl(${bgColor},28%,76%` }}>
      {/* <div className="home-animation"></div> */}
      <button onClick={changeSideBar}>
        <MenuSvg1 />
      </button>
      <button onClick={changeSideBar}>
        <MenuSvg2 />
      </button>
      {sideBarToggle ? <Menu changeSideBar={changeSideBar} /> : null}

      <header
        className={classNames(
          scrollDirection == "up" ? "opacity-1" : "opacity-0",
          "home__header"
        )}
      >
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
      <HomeSlider />
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
