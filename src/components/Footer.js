import React from "react";
import { Link } from "react-router-dom";
import { navList } from "../data/navList";
import { scrollWin } from "../function/group";
import { PureLogoSvg } from "./SvgComponents";
const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <PureLogoSvg />
        <div className="footer__nav">
          {navList.slice(1).map((city) => (
            <Link
              className="footer__li"
              key={city.pathName}
              to={`/${city.pathName}`}
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
