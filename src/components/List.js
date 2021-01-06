import React from "react";
import EmptyLists from "./emptyLists";
import ListCard from "./listCard";
import Modal from "./modal";
const Lists = ({ lists }) => {
  const [isModalOpen, openModel] = React.useState(false);

  const handleClose = () => {
    openModel(false);
  };
  return (
    <div className="lists">
      <div className="lists-header">
        <p className="lists-header-text">My lists</p>
        <button className="lists-header-btn" onClick={() => openModel(true)}>
          create list
        </button>
      </div>
      <Modal
        open={isModalOpen}
        modalLabel="Create List"
        handleClose={handleClose}
      />
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
