import React from "react";
import { useWindowResize } from "../hooks/useWindowResize";
import { taipeiExp } from "../data/taipeiExhibition";
import { taichungExp } from "../data/taichungExhibition";
import { tainanExp } from "../data/tainanExhibition";
import SingleContent from "../components/SingleContent";
import HomeSwiper from "../components/Swiper/HomeSwiper";
import Modal from "../components/Modal";
import classNames from "../function/classNames";
import PageHeader from "../components/PageHeader";
import { currentFilter } from "../function/exhibitionFilter";
import { isOpenChecked } from "../function/weekdayFilter";
import Footer from "../components/Footer";
import { useModal } from "../hooks/useModal";
import { navList } from "../data/navList";
import { usePromise } from "../hooks/usePromise";
import HomeHeader from "../components/HomeHeader";
import PageTransition from "../components/PageTransition";
import Loading from "../components/Loading";
const Home = () => {
  const cityList = navList.filter((li) => li.src);
  const { imgsLoaded } = usePromise(cityList);
  const { width } = useWindowResize();
  const isOpenCurrentExhibition = [
    ...currentFilter(taipeiExp),
    ...currentFilter(taichungExp),
    ...currentFilter(tainanExp),
  ].filter((exhibition) => isOpenChecked(exhibition.openDay.split("")));
  const exhibitions =
    isOpenCurrentExhibition.length >= 12
      ? isOpenCurrentExhibition.slice(-12)
      : isOpenCurrentExhibition;

  const { modalContent, modalToggle, changeContent } = useModal();

  return (
    <>
      <div className="home exhibition-bg">
        {imgsLoaded ? (
          <>
            {width >= 800 ? <HomeHeader /> : <PageHeader />}
            <PageTransition />
            <HomeSwiper cityList={cityList} />
            <div className="info-title">
              <h1>CURRENT EXHIBITION</h1>
            </div>
            <div
              className={classNames(
                width < 450 ? "w-60" : "",
                "card-container",
                "pb-45",
                "pi-20"
              )}
            >
              {exhibitions.map((exhibition) => (
                <SingleContent
                  classNames={classNames}
                  isOpenChecked={isOpenChecked}
                  exhibition={exhibition}
                  key={exhibition.id}
                  changeContent={changeContent}
                />
              ))}
              {modalToggle && (
                <Modal
                  changeContent={changeContent}
                  modalContent={modalContent.current}
                />
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      {imgsLoaded ? <Footer /> : null}
    </>
  );
};

export default Home;
