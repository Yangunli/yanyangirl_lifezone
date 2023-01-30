import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { PureLogoSvg } from "../components/SvgComponents";
const OptionLayout = () => {
  const pathName = useOutletContext();
  const cityObj = pathName.cityObj;
  return (
    <div className="main exhibition-bg ">
      <PageHeader />
      <div className="banner" role="banner"></div>

      <div className="card-container  pt-200">
        <Link to={`/${cityObj.name}/exhibition`} className="card">
          展覽
        </Link>
        <Link to={`/${cityObj.name}/venue`} className="card">
          空間
        </Link>
      </div>
    </div>
  );
};

export default OptionLayout;
