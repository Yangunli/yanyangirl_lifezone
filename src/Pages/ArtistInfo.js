import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { artists } from "../data/artists";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";
import { useExhibitonRefs } from "../hooks/useExhibitionRef";
import { exhibitionList } from "../data/exhibitionList";
import { usePath } from "../hooks/usePath";
import CardSwiper from "../components/Swiper/CardSwiper";
import PageTransition from "../components/PageTransition";
const ArtistInfo = () => {
  // const { path } = usePath();
  const { Id } = useParams();
  const exhibitions = useExhibitonRefs("artistLink");
  const { changeContent, modalContent, modalToggle } = useModal();
  const artist = artists.find((artist) => artist.id == Id);
  // const exhibitions = exhibitionList.filter(
  //   (exhibition) => exhibition.artistLink == path
  // );
  return (
    <>
      <PageHeader />
      <PageTransition />
      <div className="pt-200 main ">
        <h1 className="pb-45">{artist.brand || artist.artist}</h1>
        <div className="card-container  pi-20 w-70 pb-45">
          {exhibitions.map((exhibition, i) => (
            <CardSwiper
              key={exhibition.id}
              exhibition={exhibition}
              changeContent={changeContent}
            />
          ))}
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
