import React from "react";

const AnswerBox = (props) => {
  return (
    <div>
      <div>
        {props.loading
          ? ""
          : props.artists.map((artist) => (
              <button
                disabled={props.answered}
                key={`${artist.name}_button`}
                onClick={() => {
                  props.submitAnswer(artist._id);
                }}
              >
                {artist.name}
              </button>
            ))}
        {props.answered ? (
          <button
            onClick={() => {
              props.nextQuestion();
            }}
          >
            Try Another
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AnswerBox;
