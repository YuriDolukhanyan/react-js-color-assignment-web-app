import React, { useContext, useState } from "react";
import { AvailableColorContext } from "../contexts/AvailableColorContext";
import { StorageService } from "../services/StorageService";
import { COLOR_STORAGE_KEY } from "../constants/storageKeys";
import { ResultContext } from "../contexts/ResultContext";
import { ACTIONS } from "../constants/reducerActions";
import { fetchColors, resetColors } from "../api/googleSheetApi";
import Toast from "./Toast";
import "../styles/enter.css";

const AdminResetSection = () => {
  const { resultDispatch } = useContext(ResultContext);
  const { colorDispatch } = useContext(AvailableColorContext);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
  };

  const handleReset = async () => {
    StorageService.setItem(COLOR_STORAGE_KEY, JSON.stringify([]));
    resultDispatch({ type: ACTIONS.RESET_USERS });

    await resetColors();

    const updatedColors = await fetchColors();
    colorDispatch({ type: ACTIONS.SET_COLORS, payload: updatedColors });

    showToast("Game Reseted Successfully...");
  };

  return (
    <>
      {toastMessage && (
        <Toast
          key={toastMessage}
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
      <button className="submit-button" onClick={handleReset}>
        Reset Game
      </button>
    </>
  );
};

export default AdminResetSection;
