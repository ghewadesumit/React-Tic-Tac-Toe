import React from "react";
import "./boxes.styles.scss";
const Boxes = (props) => {
  let boxHolder = [];
  let boxId = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      boxId = `${i}${j}`;
      boxHolder.push(
        <div
          key={boxId}
          onClick={props.clickBox}
          className="box"
          id={boxId}
        ></div>
      );
    }
  }

  return (
    <div className="grid-wrapper">
      <div className={props.gridStyle}></div>
      <div className="grid-container">{boxHolder}</div>
    </div>
  );
};
export default Boxes;
