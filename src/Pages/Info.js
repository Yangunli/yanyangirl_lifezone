import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { tainanVenues } from "../data/tainanVenues";
import { taichungVenues } from "../data/taichungVenue";
import { taipeiVenues } from "../data/taipeiVenues";
import { collection, doc, setDoc, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { exhibitionList } from "../data/exhibitionList";

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

  const venuesRef = collection(db, "exhibitions");
  const addIt = () => {
    exhibitionList.map(async (exhibition) => {
      await setDoc(doc(venuesRef, exhibition.id), {
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

  useEffect(() => {
    const q = query(venuesRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let venueArr = [];
      querySnapshot.forEach((doc) => {
        venueArr.push({ ...doc.data() });
      });
      console.log(venueArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="info">
      <button onClick={addIt}>ADD DATA</button>
    </div>
  );
};

export default Info;
