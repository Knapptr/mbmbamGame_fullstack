import React from "react";

const FlagButton = (props) => {
  return (
    <div>
      {props.loading ? (
        ""
      ) : (
        <button
          onClick={() => {
            props.flagTrack(props.track._id);
          }}
        >
          Flag Lyrics
        </button>
      )}
    </div>
  );
};

export default FlagButton;
