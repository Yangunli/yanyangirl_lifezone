import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const Menu = ({ changeSideBar }) => {
  useEffect(() => {
    const menuContainerEl = document.querySelector(".menu-container");
    function homeAnimate() {
      menuContainerEl.style =
        "animation: sidebarOut 0.6s ease-in-out forwards; transform-origin: bottom left; ";
    }
    menuContainerEl.addEventListener("click", homeAnimate);

    return () => menuContainerEl.removeEventListener("click", homeAnimate);
  }, []);

  return (
    <div
      className="menu-container"
      onClick={() => {
        setTimeout(() => {
          changeSideBar();
        }, 600);
      }}
    >
      <Link to="/">home</Link>
      <Link to="/taipei">taipei</Link>
      <Link to="/artist">artist</Link>
      <Link to="/taichung">taichung</Link>
      <Link to="/tainan">tainan</Link>
    </div>
  );
};

export default Menu;
