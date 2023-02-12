import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { scrollWin } from "../function/group";
const Menu = ({ changeSideBar }) => {
  const menuRef = useRef();
  function menuOut() {
    menuRef.current.style =
      "animation: sidebarOut 0.5s ease-in-out forwards;transform-origin:bottom left ";
  }

  return (
    <div
      ref={menuRef}
      role="menu"
      className="menu-container"
      onClick={() => {
        menuOut();
        setTimeout(() => {
          changeSideBar();
        }, 500);
      }}
    >
      <Link
        to="/"
        aria-label="come back to homepage"
        role="menuitem"
        onClick={scrollWin}
      >
        home
      </Link>
      <Link
        to="/taipei"
        aria-label="read more taipei"
        role="menuitem"
        onClick={scrollWin}
      >
        taipei
      </Link>
      <Link
        to="/artist"
        aria-label="read more taipei"
        role="menuitem"
        onClick={scrollWin}
      >
        artist
      </Link>
      <Link
        to="/taichung"
        aria-label="read more taichung"
        role="menuitem"
        onClick={scrollWin}
      >
        taichung
      </Link>
      <Link
        to="/tainan"
        aria-label="read more tainan"
        role="menuitem"
        onClick={scrollWin}
      >
        tainan
      </Link>
    </div>
  );
};

export default Menu;
