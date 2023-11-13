import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOffline, setOnline } from "../Store/OnlineSlice";

const useOnline = () => {
  const dispatch = useDispatch();
  function handleOnlineStatus() {
    dispatch(setOnline());
  }

  function handleOfflineStatus() {
    dispatch(setOffline());
  }

  useEffect(() => {
    addEventListener("online", () => handleOnlineStatus());
    addEventListener("offline", () => handleOfflineStatus());

    return () => {
      removeEventListener("online", () => {
        handleOnlineStatus();
      });
      removeEventListener("offline", () => {
        handleOfflineStatus();
      });
    };
  }, []);

  return null;
};

export default useOnline;
