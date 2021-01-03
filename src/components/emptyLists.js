import React from "react";
import Wait from "../icons/wait.svg";

const EmptyLists = (props) => {
  return (
    <div className="emptyList">
      <div className="emptyList-img">
        <img src={Wait} alt="wait image" />
      </div>
      <div className="emptyList-content">
        <p className="emptyList-content--header">No lists... yet</p>
        <p className="emptyList-content--desc">
          All your lists will appear here
        </p>
      </div>
    </div>
  );
};

export default EmptyLists;
