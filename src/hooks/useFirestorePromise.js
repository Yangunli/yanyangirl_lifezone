import { useEffect, useState } from "react";
export const useFirestorePromise = (exhibitions) => {
  const [imgsLoaded, setImgsLoaded] = useState(false);

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
        .catch((err) => console.error("Failed to load images", err));
    }

    // Function call
  }, [exhibitions]);

  return { imgsLoaded };
};
