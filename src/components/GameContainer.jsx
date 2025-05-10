import React, { useContext, useEffect, useState } from "react";
import { ACTIONS } from "../constants/reducerActions";
import { fetchColors } from "../api/googleSheetApi";
import { StorageService } from "../services/StorageService";
import { COLOR_STORAGE_KEY } from "../constants/storageKeys";
import { ResultContext } from "../contexts/ResultContext";
import { AvailableColorContext } from "../contexts/AvailableColorContext";
import { AuthContext } from "../contexts/AuthContext";
import ColorList from "./ColorList";
import ResultSection from "./ResultSection";
import AdminResetSection from "./AdminResetSection";
import Login from "./Login";

const getInitialState = () => {
  const stored = StorageService.getItem(COLOR_STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
};

const GameContainer = () => {
  const { resultDispatch } = useContext(ResultContext);
  const { colorDispatch } = useContext(AvailableColorContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const storedResults = getInitialState();
    if (storedResults && storedResults.length > 0) {
      resultDispatch({ type: ACTIONS.SET_USERS, payload: storedResults });
    }
    fetchColors()
      .then((data) => {
        colorDispatch({ type: ACTIONS.SET_COLORS, payload: data });
      })
      .catch((err) => console.error("Error fetching colors:", err));
  }, []);

  return (
    <div className="load-page">
      <Login />
      {user?.name === "admin" && <AdminResetSection />}
      <ColorList />
      <ResultSection />
    </div>
  );
};

export default GameContainer;
