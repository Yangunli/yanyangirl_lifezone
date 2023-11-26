import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useScrollNavDisplay } from "../hooks/useScrollNavDisplay";
import { MenuSvg2, LifezoneSvg, ArrowSvg, PureLogoSvg } from "./SvgComponents";
import Menu from "./Menu";
import classNames from "../function/classNames";
import { scrollWin } from "../function/scroll";
import { navList } from "../data/navList";
import { useWindowResize } from "../hooks/useWindowResize";
import { usePath } from "../hooks/usePath";
import { useMenu } from "../hooks/useMenu";

const PageHeader = () => {
  const { menuToggle, changeMenu } = useMenu();
  const scrollDirection = useScrollNavDisplay();
  const navigate = useNavigate();
  const { pathArr } = usePath();
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
                  key={li.pathName}
                  to={
                    li.pathName.toLowerCase() == "home"
                      ? "/"
                      : `/${li.pathName}`
                  }
                  aria-label={li.ariaLabel}
                  onClick={scrollWin}
                  className={classNames(
                    pathArr[1] == li.pathName ? "ball" : "",
                    "nav__link"
                  )}
                >
                  {li.pathName}
                </Link>
              ))}
            </div>
          </div>
          <button
            onClick={changeMenu}
            className="menuBtn"
            aria-label="menu button"
          >
            <MenuSvg2 />
          </button>
        </nav>
      </header>
      {menuToggle && <Menu changeMenu={changeMenu} />}
    </>
  );
};

export default PageHeader;
