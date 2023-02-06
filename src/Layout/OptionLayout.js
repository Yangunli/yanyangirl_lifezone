import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
const OptionLayout = () => {
  return (
    <div className="main exhibition-bg ">
      <PageHeader />
      <div className="banner" role="banner"></div>

      <div className="card-container  pt-200">
        <Link to="exhibition" className="card">
          展覽
        </Link>
        <Link to="venue" className="card">
          空間
        </Link>
      </div>
    </div>
  );
};

export default OptionLayout;
