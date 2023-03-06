import { useEffect, useState } from "react";

export const usePromise = (infos) => {
  const [imgsLoaded, setImgsLoaded] = useState(false);
  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.venueImgUrl[0] ? image.venueImgUrl[0] : image.src;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image.venueImgUrl[0] ? image.venueImgUrl[0] : image.src);
          }, 1000);
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
