import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useScrollNavDisplay } from "../hooks/useScrollNavDisplay";
import {
  MenuSvg2,
  LogoSvg,
  LifezoneSvg,
  ArrowSvg,
  PureLogoSvg,
} from "./SvgComponents";
const PageHeader = () => {
  const scrollDirection = useScrollNavDisplay();
  const navigate = useNavigate();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
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

        <MenuSvg2 />
      </nav>
    </header>
  );
};

export default PageHeader;
