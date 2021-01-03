import React from "react";
import EmptyLists from "./emptyLists";
import ListCard from "./listCard";

const Lists = ({ lists }) => {
  return (
    <div className="lists">
      <div className="lists-header">
        <p className="lists-header-text">My lists</p>
        <button className="lists-header-btn">create list</button>
      </div>
      <div className="lists-content">
        {Object.keys(lists).length === 0 ? (
          <EmptyLists />
        ) : (
          Object.entries(lists).map((list, index) => (
            <ListCard key={index} list={list} />
          ))
        )}
      </div>
    </div>
  );
};

export default Lists;
