import React from "react";
import { useParams } from "react-router-dom";
import { artists } from "../data/artists";
import PageHeader from "../components/PageHeader";
import { exhibitionList } from "../data/exhibitionList";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";
const ArtistInfo = () => {
  const { Id } = useParams();
  const { changeContent, modalContent, modalToggle } = useModal();
  const artist = artists.find((artist) => artist.id == Id);
  const exhibitions = exhibitionList.filter(
    (exhibition) => exhibition.artist == artist.artist
  );

  return (
    <>
      <PageHeader />
      <div className="pt-200 main">
        <h1>{artist.artist}</h1>
        <div className="card-container pt-200 ">
          {exhibitions.map((exhibition) =>
            exhibition.imgUrl?.map((url) => (
              <img
                key={url}
                src={url}
                className="card"
                alt=""
                onClick={() => changeContent(exhibition)}
              />
            ))
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
