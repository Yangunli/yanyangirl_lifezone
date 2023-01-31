import React from "react";
import { Link } from "react-router-dom";
const Menu = ({ changeSideBar }) => {
  return (
    <div className="menu-container" onClick={changeSideBar}>
      <Link to="/">home</Link>
      <Link to="/taipei">taipei</Link>
      <Link to="/artist">artist</Link>
      <Link to="/taichung">taichung</Link>
      <Link to="/tainan">tainan</Link>
    </div>
  );
};

export default Menu;
