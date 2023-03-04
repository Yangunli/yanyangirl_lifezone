import { useState, useEffect } from "react";
import { usePath } from "./usePath";
import {
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

export const useExhibitonRefs = (linkName) => {
  const [exhibitions, setExhibitions] = useState([]);
  const { path } = usePath();
  const exhibitionRef = collection(db, "exhibitions");
  useEffect(() => {
    const q = query(
      exhibitionRef,
      where(linkName, "==", path),
      orderBy("startDate", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let exhibitionArr = [];
      querySnapshot.forEach((doc) => {
        exhibitionArr.push({ ...doc.data(), id: doc.id });
      });
      setExhibitions(exhibitionArr);
      console.log(exhibitions);
    });
    return () => unsubscribe();
  }, []);
  return exhibitions;
};
