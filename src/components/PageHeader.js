import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useScrollNavDisplay } from "../hooks/useScrollNavDisplay";
import { MenuSvg2, LifezoneSvg, ArrowSvg, PureLogoSvg } from "./SvgComponents";
import Menu from "./Menu";
import classNames from "../function/classNames";
import { scrollWin } from "../function/group";
import { navList } from "../data/navList";
import { useWindowResize } from "../hooks/useWindowResize";
const PageHeader = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const changeSideBar = () => {
    setSideBarToggle(!sideBarToggle);
  };

  const scrollDirection = useScrollNavDisplay();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const pathArr = path.split("/");
  const bg = pathArr.includes("venue");
  const { width } = useWindowResize();
  const navLi = width > 280 ? navList : navList.slice(1, -1);
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
              {navLi.map((li) => (
                <Link
                  to={li.link}
                  aria-label={li.ariaLabel}
                  onClick={scrollWin}
                  className={classNames(
                    pathArr[1] == li.pathName ? "ball" : ""
                  )}
                >
                  {li.pathName}
                </Link>
              ))}
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
