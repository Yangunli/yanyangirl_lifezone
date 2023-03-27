import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  collection,
  doc,
  setDoc,
  query,
  onSnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { exhibitionList } from "../data/exhibitionList";
// import { useExhibitonRefs } from "../hooks/useExhibitionRef";

const Info = () => {
  const { isLogin } = useOutletContext();
  if (!isLogin) {
    window.location.href = window.location.origin;
    return;
  }
  const [exhibitions, setExhibitions] = useState([]);

  const exhibitionRef = collection(db, "exhibitions");
  const addIt = () => {
    exhibitionList.map(async (exhibition) => {
      await setDoc(doc(exhibitionRef, exhibition.id), {
        title: exhibition.title,
        venue: exhibition.venue,
        venueLink: exhibition?.venueLink,
        artist: exhibition.artist,
        brand: exhibition.brand ? exhibition.brand : null,
        artistLink: exhibition.artistLink,
        startDate: exhibition.startDate,
        endDate: exhibition.endDate,
        imgUrl: exhibition.imgUrl,
      });
    });
  };

  // const addBrandName = async () =>
  //   exhibitions.map(async (exhibition) => {
  //     await updateDoc(doc(db, "exhibitions", exhibition.id), {
  //       brand: "身體山島",
  //     });
  //   });

  // const updateInfo = async () =>
  //   exhibitions.map(async (exhibition) => {
  //     await updateDoc(doc(db, "exhibitions", exhibition.id), {});
  //   });

  // useEffect(() => {
  //   const q = query(exhibitionRef, where("title", "==", ""));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     let exhibitionArr = [];
  //     querySnapshot.forEach((doc) => {
  //       exhibitionArr.push({ ...doc.data(), id: doc.id });
  //     });
  //     setExhibitions(exhibitionArr);
  //     console.log(exhibitionArr);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const q = query(exhibitionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let venueArr = [];
      querySnapshot.forEach((doc) => {
        venueArr.push({ ...doc.data(), id: doc.id });
      });
      console.log(venueArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="info">
      <button onClick={addIt}>ADD List DATA</button>
      {/* <button onClick={updateInfo}>UPDATE</button> */}
    </div>
  );
};

export default Info;
