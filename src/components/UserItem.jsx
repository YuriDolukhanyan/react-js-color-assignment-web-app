import React from "react";
import "../styles/userItem.css";

const UserItem = ({ name, color, hex }) => {
  return (
    <div className="user-item">
      <div className="user-color" style={{ backgroundColor: hex }}></div>
      <div className="user-info">
        <p className="user-name">{name}</p>
        <p className="user-color-name">
          {color}&nbsp;:&nbsp;<span className="user-hex">({hex})</span>
        </p>
      </div>
    </div>
  );
};

export default UserItem;
