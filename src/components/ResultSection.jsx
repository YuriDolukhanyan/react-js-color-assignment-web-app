import React, { useContext, useState } from "react";
import { ResultContext } from "../contexts/ResultContext";
import UserItem from "./UserItem";

const ResultSection = () => {
  const { results } = useContext(ResultContext);

  return (
    <div className="game-result-section">
      <h2>Already Registered Users (RESULT AREA):</h2>
      {results.length === 0 ? (
        <p>No current results available. Loading...</p>
      ) : (
        results.map((userObj) => (
          <UserItem
            key={userObj.id}
            name={userObj.name}
            color={userObj.color}
            hex={userObj.hex}
          />
        ))
      )}
    </div>
  );
};

export default ResultSection;
