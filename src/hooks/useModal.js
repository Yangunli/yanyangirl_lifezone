import { useState, useRef } from "react";

export const useModal = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const modalContent = useRef([]);
  const changeContent = (info) => {
    modalContent.current = [info];
    setModalToggle(!modalToggle);
  };

  return { modalContent, modalToggle, changeContent };
};
