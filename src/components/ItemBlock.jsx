import React, { useState } from "react";
import Modal from "./Modal"
import "./ItemBlock.css";

const ItemBlock = ({ data, date }) => {
  let backgroundColor = "#EDEDED";
  if (data >= 1 && data <= 9) {
    backgroundColor = "#ACD5F2";
  } else if (data >= 10 && data <= 19) {
    backgroundColor = "#7FA8C9";
  } else if (data >= 20 && data <= 29) {
    backgroundColor = "#527BA0";
  } else if (data >= 30 && data <= 39) {
    backgroundColor = "#254E77";
  }

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    
      <td style={{ whiteSpace: "nowrap", position:"relative" }}>
        {isFocused && <div style={{position:"absolute",bottom:"120%",left:"-450%"}}><Modal data={data} date={date} /></div>}
        <div
          onClick={handleFocus}
          onBlur={handleBlur}
          className="box"
          style={{ backgroundColor }}
          tabIndex={0}
        ></div>
      </td>

  );
};
export default ItemBlock;
