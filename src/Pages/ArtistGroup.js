import React, { useState } from "react";
import { artists } from "../data/artists";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { kwList } from "../data/artistCategory";
import classNames from "../function/classNames";
import PageTransition from "../components/PageTransition";
import Loading from "../components/Loading";
import { useWindowResize } from "../hooks/useWindowResize";
import { usePromise } from "../hooks/usePromise";
const ArtistGroup = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { width } = useWindowResize();
  const artistsAfterFilter =
    categoryFilter == "all"
      ? artists
      : artists.filter((artist) => artist.category.includes(categoryFilter));

  const { imgsLoaded } = usePromise(artists);
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
          artistsAfterFilter.map(({ brand, id, artist, src }) => (
            <Link to={`${id}`} key={id} className="card">
              <img src={src} alt="" className="card__img" />
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

export default ArtistGroup;
