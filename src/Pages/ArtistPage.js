import React, { useState, useEffect } from "react";
import { artists } from "../data/artists";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { kwList } from "../data/artistCategory";
import classNames from "../function/classNames";
import PageTransition from "../components/PageTransition";
import Loading from "../components/Loading";
import { useWindowResize } from "../hooks/useWindowResize";
const ArtistPage = () => {
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { width } = useWindowResize();
  const artistsAfterFilter =
    categoryFilter == "all"
      ? artists
      : artists.filter((artist) => artist.category.includes(categoryFilter));
  useEffect(() => {
    const loadImage = (info) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = info.imgUrl;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(info.imgUrl);
          }, 1000);
        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.allSettled(artists.map((artist) => loadImage(artist)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));

    // Function call
  }, []);

  return (
    <>
      <PageHeader />
      {imgsLoaded && <PageTransition />}
      <div className="artist__filters">
        <p
          className={classNames(
            categoryFilter == "all" ? "artist__filter--active" : "",
            "artist__filter"
          )}
          onClick={() => {
            setCategoryFilter("all");
          }}
        >
          #ALL
        </p>
        {kwList.map((kw) => (
          <p
            key={kw}
            className={classNames(
              categoryFilter == kw ? "artist__filter--active" : "",
              "artist__filter"
            )}
            onClick={() => {
              setCategoryFilter(kw);
            }}
          >
            #{kw}
          </p>
        ))}
      </div>
      <div
        className={classNames(
          imgsLoaded ? "card-container" : "",
          width < 450 ? "w-60" : "",
          "pb-45",
          "pi-20"
        )}
      >
        {imgsLoaded ? (
          artistsAfterFilter.map(({ brand, id, artist, imgUrl }) => (
            <Link to={`${id}`} key={id} className="card">
              <img src={imgUrl} alt="" className="card__img" />
              <h2>{brand || artist}</h2>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default ArtistPage;
