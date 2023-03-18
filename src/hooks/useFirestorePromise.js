import { useEffect, useState } from "react";
import { usePath } from "./usePath";
export const useFirestorePromise = (exhibitions) => {
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const { isArtistInfo } = usePath();

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

    if (!isArtistInfo) {
      Promise.all(
        exhibitions.map((info) => info.imgUrl.map((url) => loadImage(url)))
      )
        .then(() => setImgsLoaded(true))
        .catch((err) => console.log("Failed to load images", err));
    }
    if (isArtistInfo && exhibitions.length) {
      Promise.all(
        exhibitions.map((info) => info.imgUrl.map((url) => loadImage(url)))
      )
        .then(() => setImgsLoaded(true))
        .catch((err) => console.log("Failed to load images", err));
    }

    // Function call
  }, [exhibitions]);

  return { imgsLoaded };
};
