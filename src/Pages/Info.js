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
  // const venuesRef = collection(db, "venues");
  // const addIt = () => {
  //   tainanVenues.map(async (venue) => {
  //     await setDoc(doc(venuesRef, venue.id.toString()), {
  //       id: Number(venue.id),
  //       category: venue?.category,
  //       venue: venue?.venue,
  //       openDay: venue?.openDay,
  //       city: venue?.city,
  //       location: venue?.location,
  //       link: venue?.link,
  //       venueImgUrl: venue?.venueImgUrl,
  //     });
  //   });
  // };

  const exhibitionRef = collection(db, "exhibitions");
  const addIt = () => {
    exhibitionList.map(async (exhibition) => {
      await setDoc(doc(exhibitionRef, exhibition.id), {
        title: exhibition.title,
        venue: exhibition.venue,
        venueLink: exhibition?.venueLink,
        artist: exhibition.artist,
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

  // useEffect(() => {
  //   const q = query(exhibitionRef, where("artist", "==", "曾岩懌"));
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
      {/* <button onClick={addBrandName}>UPDATE</button> */}
    </div>
  );
};

export default Info;
