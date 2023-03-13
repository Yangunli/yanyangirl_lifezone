import { useEffect, useState } from "react";

export const usePromise = (infos) => {
  const [imgsLoaded, setImgsLoaded] = useState(false);
  useEffect(() => {
    const loadImage = (info) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = info.venueImgUrl[0] ? info.venueImgUrl[0] : info.src;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(info.venueImgUrl[0] ? info.venueImgUrl[0] : info.src);
          }, 800);
        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.allSettled(infos.map((info) => loadImage(info)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));

    // Function call
  }, []);

  return { imgsLoaded };
};
