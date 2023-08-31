import React from "react";

import "./LearningOptions.css";

const LearningOptions = (props) => {
  const options = [
    {
      text: "COVID",
      handler: props.actionProvider.handleCovidList,
      id: 1,
    },
    { text: "option 2", handler: () => {}, id: 2 },
    { text: "option 3", handler: () => {}, id: 3 },
    { text: "option 4", handler: () => {}, id: 4 },
    { text: "option 5", handler: () => {}, id: 5 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;
