import React, { useState, useContext } from "react";
import { AvailableColorContext } from "../contexts/AvailableColorContext";
import { ResultContext } from "../contexts/ResultContext";
import { ACTIONS } from "../constants/reducerActions";
import { fetchColors, getRandomColor } from "../api/googleSheetApi";
import { StorageService } from "../services/StorageService";
import { USER_STORAGE_KEY } from "../constants/storageKeys";
import ColorItem from "./ColorItem";
import Toast from "./Toast";
import "../styles/colorList.css";
import "../styles/enter.css";

const generateId = () => Math.floor(Math.random() * Date.now());

const ColorList = () => {
  const { availableColors, colorDispatch } = useContext(AvailableColorContext);
  const { results, resultDispatch } = useContext(ResultContext);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const hasParticipated = StorageService.getItem(USER_STORAGE_KEY);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Name is required...");
      return;
    }

    if (
      results.find((entry) => entry.name.toLowerCase() === name.toLowerCase())
    ) {
      setError("You have already been assigned a color...");
      return;
    }

    try {
      const data = await getRandomColor(name);

      if (data.error) {
        setError(data.error);
        return;
      }

      const newUser = {
        id: generateId(),
        name: data.name,
        color: data.color,
        hex: data.hex,
      };

      resultDispatch({ type: ACTIONS.ADD_USER, payload: newUser });

      const updatedColors = await fetchColors();
      colorDispatch({ type: ACTIONS.SET_COLORS, payload: updatedColors });

      setName("");
      setError("Color assigned!");
      showToast(
        `THANK YOU: The color "${data.color}" was assigned to the user "${data.name}"!`
      );
    } catch (error) {
      console.error("Submit error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="color-list">
      <h2>Available Colors:</h2>
      <div className="color-grid">
        {availableColors.length === 0 ? (
          <p>No colors available. Loading...</p>
        ) : (
          availableColors.map((colorObj, index) => (
            <ColorItem key={index} color={colorObj.color} hex={colorObj.hex} />
          ))
        )}
      </div>
      <div className="enter-section">
        {toastMessage && (
          <Toast
            key={toastMessage}
            message={toastMessage}
            onClose={() => setToastMessage("")}
          />
        )}
        {hasParticipated ? ("You have already been assigned a color during this session...") : (
          <>
            <h2>Enter Your Name</h2>
            <input
              type="text"
              placeholder="YOUR NAME:"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="name-input"
            />
            &nbsp;
            <button onClick={handleSubmit} className="submit-button">
              Submit!
            </button>
          </>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default ColorList;
