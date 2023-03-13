import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { artists } from "../data/artists";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";
import { useExhibitonRefs } from "../hooks/useExhibitionRef";
import CardSwiper from "../components/Swiper/CardSwiper";
import PageTransition from "../components/PageTransition";
import { useWindowResize } from "../hooks/useWindowResize";
import Loading from "../components/Loading";
const ArtistInfo = () => {
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const { Id } = useParams();
  const exhibitions = useExhibitonRefs("artistLink");
  const { changeContent, modalContent, modalToggle } = useModal();
  const artist = artists.find((artist) => artist.id == Id);
  const { width, height } = useWindowResize();

  useEffect(() => {
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = url;
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(url);
          }, 0);
        loadImg.onerror = (err) => reject(err);
      });
    };
    if (exhibitions.length) {
      Promise.all(
        exhibitions.map((info) => info.imgUrl.map((url) => loadImage(url)))
      )
        .then(() => setImgsLoaded(true))
        .catch((err) => console.log("Failed to load images", err));
    }

    // Function call
  }, [exhibitions]);

  return (
    <>
      <PageHeader />
      {imgsLoaded && <PageTransition />}

      <div className="pt-200 main ">
        <h1 className="pb-45 artist__name">{artist.brand || artist.artist}</h1>
        {width >= 450 && height >= 400 && exhibitions.length <= 2 && (
          <img className="artist__empty" src="../images/reading.svg" alt="" />
        )}
        {width >= 1200 && height >= 400 && exhibitions.length <= 3 && (
          <img className="artist__empty" src="../images/reading.svg" alt="" />
        )}
        <div className="card-container  pi-20 w-60 pb-45">
          {imgsLoaded ? (
            exhibitions.map((exhibition) => (
              <CardSwiper
                key={exhibition.id}
                exhibition={exhibition}
                changeContent={changeContent}
              />
            ))
          ) : (
            <Loading />
          )}
        </div>
        {modalToggle && (
          <Modal
            changeContent={changeContent}
            modalContent={modalContent.current}
          />
        )}
      </div>
    </>
  );
};

export default ArtistInfo;
