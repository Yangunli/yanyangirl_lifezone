import { useEffect, useState } from "react";

export const usePromise = (infos) => {
  const [imgsLoaded, setImgsLoaded] = useState(false);
  useEffect(() => {
    const loadImage = (info) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = info.src ? info.src : info.venueImgUrl[0];
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(info.src ? info.src : info.venueImgUrl[0]);
          }, 0);
        loadImg.onerror = (err) => reject(info);
      });
    };

    Promise.all(infos.map((info) => loadImage(info)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.error("Failed to load images", err));

    // Function call
  }, []);

  return { imgsLoaded };
};
