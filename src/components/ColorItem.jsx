import React from "react";
import "../styles/colorItem.css";

const ColorItem = ({ color, hex }) => {
  return (
    <div
      className="color-item"
      style={{ backgroundColor: hex }}
      title={color}
    >
      {color.charAt(0)}
    </div>
  );
};

export default ColorItem;
