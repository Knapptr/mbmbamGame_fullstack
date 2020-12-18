import React from "react";

const ScoreBox = (props) => {
  return (
    <div>
      <p>
        <span>{props.correctAnswers}</span> out of{" "}
        <span>{props.totalQuestions}</span>
      </p>
    </div>
  );
};

export default ScoreBox;
