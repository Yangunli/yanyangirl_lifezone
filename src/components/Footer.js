import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navList } from "../data/navList";
import classNames from "../function/classNames";
import { useWindowResize } from "../hooks/useWindowResize";
import { scrollWin } from "../function/group";
import { PureLogoSvg } from "./SvgComponents";
const Footer = () => {
  const pathArr = useLocation().pathname.split("/");
  const { width } = useWindowResize();
  return (
    <div className="footer-container">
      <footer className="footer">
        <PureLogoSvg />
        <div className="footer__nav">
          {navList.slice(1).map((city) => (
            <Link
              className="footer__li"
              to={city.link}
              aria-label={city.ariaLabel}
              onClick={scrollWin}
            >
              {city.pathName}
            </Link>
          ))}
        </div>
      </footer>
      <small>2023 © YANYANGIRL</small>
    </div>
  );
};

export default Footer;
