import React, { useEffect, useState, useRef, useContext } from "react";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const Login = () => {
  const loginRefs = useRef([]);
  const { isLogin } = useOutletContext();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("logout");
        // window.location.href = window.location.origin;
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="main venue-bg login">
      {isLogin ? (
        <>
          <Link to="info">Info</Link>
        </>
      ) : (
        <>
          <input
            type="email"
            name=""
            ref={(element) => {
              loginRefs.current.email = element;
            }}
          />
          <input
            type="password"
            name=""
            ref={(element) => {
              loginRefs.current.password = element;
            }}
          />
        </>
      )}

      {isLogin ? (
        <button className="loginBtn" onClick={handleLogout}>
          LOG OUT
        </button>
      ) : (
        <button className="loginBtn" onClick={handleLogin}>
          LOG IN
        </button>
      )}
    </div>
  );
};

export default Login;
