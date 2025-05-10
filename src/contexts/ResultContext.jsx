import React, { createContext, useReducer } from "react";
import { ACTIONS } from "../constants/reducerActions";
import { StorageService } from "../services/StorageService";
import { COLOR_STORAGE_KEY } from "../constants/storageKeys";

const resultsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USERS:
      return action.payload;
    case ACTIONS.ADD_USER: {
      const updatedResult = [...state, { ...action.payload }];
      StorageService.setItem(COLOR_STORAGE_KEY, JSON.stringify(updatedResult));
      return updatedResult;
    }
    case ACTIONS.RESET_USERS: {
      return [];
    }
    default:
      return state;
  }
};

export const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [results, resultDispatch] = useReducer(resultsReducer, []);

  return (
    <ResultContext.Provider value={{ results, resultDispatch }}>
      {children}
    </ResultContext.Provider>
  );
};
