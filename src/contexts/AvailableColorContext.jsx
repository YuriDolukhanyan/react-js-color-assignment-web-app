import React, { createContext, useReducer } from "react";
import { ACTIONS } from "../constants/reducerActions";

const colorsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_COLORS:
      return action.payload;
    default:
      return state;
  }
};

export const AvailableColorContext = createContext();

export const AvailableColorProvider = ({ children }) => {
  const [availableColors, colorDispatch] = useReducer(colorsReducer, []);

  return (
    <AvailableColorContext.Provider value={{ availableColors, colorDispatch }}>
      {children}
    </AvailableColorContext.Provider>
  );
};
