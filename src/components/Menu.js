import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { navList } from "../data/navList";
import { recommendedList } from "../data/recommendedLst";
import { scrollWin } from "../function/scroll";
const Menu = ({ changeMenu }) => {
  const menuRef = useRef();
  function menuOut() {
    menuRef.current.style =
      "animation: MenuOut 0.5s ease-in-out forwards;transform-origin:bottom left ";
  }
  const [home, ...cityArr] = navList;
  const menuNavList = [...cityArr, ...recommendedList];
  return (
    <div
      ref={menuRef}
      role="menu"
      className="menu-container "
      onClick={() => {
        menuOut();
        setTimeout(() => {
          changeMenu();
        }, 500);
      }}
    >
      <nav className="menu__items  pb-45">
        {menuNavList.map((li) => (
          <Link
            key={`menu_${li.venueLink || li.pathName}`}
            to={li.venueLink ? li.venueLink : `/${li.pathName}`}
            aria-label={li.ariaLabel}
            onClick={scrollWin}
            className="menu__item"
          >
            <img
              className="menu__item__img"
              src="https://firebasestorage.googleapis.com/v0/b/yanyangirl-lifezone.appspot.com/o/venue%2F%E4%BD%94%E7%A9%BA%E9%96%93%2FR0001381.webp?alt=media&token=e39c44c1-b674-4c29-95ac-abb15e512e69"
              alt=""
            />
            <p className="menu__item__name">{li.venue || li.pathName}</p>
          </Link>
        ))}
      </nav>
      <div className="menu__links">
        <a
          target="_blank"
          className="menu__link"
          href="https://www.instagram.com/yanyangirl_tw/"
          rel="noreferrer noopenner"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="menu__link__icon">
            <img src="/images/ig.svg" alt="" />
          </div>
          <span className="menu__link__name">instagram</span>
        </a>
        <a
          className="menu__link"
          href="https://github.com/Yangunli"
          target="_blank"
          rel="noreferrer noopenner"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="menu__link__icon">
            <img src="/images/github.svg" alt="" />
          </div>
          <span className="menu__link__name">github</span>
        </a>
        <a
          className="menu__link"
          href="https://yangunli.github.io/yanyangirl/"
          aria-label={home.ariaLabel}
          target="_blank"
          rel="noreferrer noopenner"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="menu__link__icon">
            <img src="/images/home.svg" alt="" />
          </div>
          <span className="menu__link__name"> YANYANGIRL 1.0 </span>
        </a>
      </div>
    </div>
  );
};

export default Menu;
