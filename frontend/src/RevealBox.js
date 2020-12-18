import React from "react";

const RevealInfoBox = (props) => {
  return (
    <div>
      <p>-{props.track.artist.name}</p>
      <p>{props.track.name}</p>
    </div>
  );
};
export default RevealInfoBox;
