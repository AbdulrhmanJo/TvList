import React from "react";
import Wait from "../icons/wait.svg";

const List = () => {
  return (
    <div className="list">
      <div className="list-header">
        <p className="list-header-text">My lists</p>
        <button className="list-header-btn">create list</button>
      </div>
      <div className="list-content">
        <div className="list-content-holder">
          <div className="list-content-holder--img">
            <img src={Wait} alt="wait image" />
          </div>
          <div className="list-content-holder--text">
            <p className="list-content-holder--text-header">No lists... yet</p>
            <p className="list-content-holder--text-desc">
              All your lists will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
