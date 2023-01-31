import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  return (
    <>
      <header
        className={classNames(
          scrollDirection == "up" ? "opacity-1" : "opacity-0",
          "page-header"
        )}
      >
        <nav className="nav-desktop">
          <button
            className="goToback-btn"
            onClick={() => navigate(-1)}
            alt="goback"
          >
            <LifezoneSvg /> <ArrowSvg />
          </button>
          <div className="nav__center">
            <PureLogoSvg />
            <div className="nav-container">
              <Link to="/">home</Link>
              <Link to="/taipei">taipei</Link>
              <Link to="/artist">artist</Link>
              <Link to="/taichung">taichung</Link>
              <Link to="/tainan">tainan</Link>
            </div>
          </div>
          <button onClick={changeSideBar} className="menuBtn">
            <MenuSvg2 />
          </button>
        </nav>
      </header>
      {sideBarToggle && <Menu changeSideBar={changeSideBar} />}
    </>
  );
};

export default PageHeader;
