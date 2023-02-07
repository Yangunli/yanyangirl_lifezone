import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useScrollNavDisplay } from "../hooks/useScrollNavDisplay";
import { MenuSvg2, LifezoneSvg, ArrowSvg, PureLogoSvg } from "./SvgComponents";
import Menu from "./Menu";
import classNames from "../function/classNames";
const PageHeader = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const changeSideBar = () => {
    setSideBarToggle(!sideBarToggle);
  };

  const scrollDirection = useScrollNavDisplay();
  const navigate = useNavigate();
  const pathArr = useLocation().pathname.split("/");
  const bg = pathArr.includes("venue");
  return (
    <>
      <header
        className={classNames(
          bg ? "venue-bg" : "exhibition-bg",
          scrollDirection == "up" ? "opacity-1" : "opacity-0",
          "page-header"
        )}
      >
        <nav className="nav-desktop">
          <button
            className="goToback-btn"
            onClick={() => navigate(-1)}
            alt="back to previous page"
            aria-label="back to previous page"
            title="goback"
          >
            <LifezoneSvg /> <ArrowSvg />
          </button>
          <div className="nav__center">
            <PureLogoSvg />
            <div className="nav-container">
              <Link to="/" aria-label="Back to the homepage">
                home
              </Link>
              <Link to="/taipei" aria-label="Read more about Taipei">
                taipei
              </Link>
              <Link to="/artist" aria-label="The page about taiwan's artists. ">
                artist
              </Link>
              <Link to="/taichung" aria-label="Read more about Taichung">
                taichung
              </Link>
              <Link to="/tainan" aria-label="Read more about Tainan">
                tainan
              </Link>
            </div>
          </div>
          <button
            onClick={changeSideBar}
            className="menuBtn"
            aria-label="menu button"
          >
            <MenuSvg2 />
          </button>
        </nav>
      </header>
      {sideBarToggle && <Menu changeSideBar={changeSideBar} />}
    </>
  );
};

export default PageHeader;
