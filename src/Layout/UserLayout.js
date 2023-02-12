import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  const [isLogin, setIsLogin] = useState("");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setIsLogin(uid);
    } else {
      setIsLogin("");
    }
  });

  return (
    <>
      <Outlet context={{ isLogin: isLogin }} />
    </>
  );
};

export default UserLayout;
