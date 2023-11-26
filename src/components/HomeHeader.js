import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { useMenu } from "../hooks/useMenu";
import { useScrollNavDisplay } from "../hooks/useScrollNavDisplay";
import { scrollWin } from "../function/scroll";
import { navList } from "../data/navList";
import { MenuSvg1, LogoSvg } from "./SvgComponents";
import classNames from "../function/classNames";
const HomeHeader = () => {
  const { menuToggle, changeMenu } = useMenu();
  const scrollDirection = useScrollNavDisplay();
  return (
    <>
      <button onClick={changeMenu} aria-label="menu button">
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
            {navList.map(({ pathName, ariaLabel }) => (
              <Link
                className="nav__link"
                key={pathName}
                to={pathName.toLowerCase() == "home" ? "/" : `/${pathName}`}
                aria-label={ariaLabel}
                onClick={scrollWin}
              >
                {pathName}
              </Link>
            ))}
          </nav>
          <LogoSvg />
        </div>
      </header>
    </>
  );
};

export default HomeHeader;
