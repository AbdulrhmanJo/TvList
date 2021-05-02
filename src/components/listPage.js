import React from "react";
import { connect } from "react-redux";
import ListCard from "./listCard";
const ListPage = ({ list }) => {
  return (
    <div className="listPage">
      <div className="listPage-header">
        <div className="listPage-header-card">
          <ListCard list={list} showName={false} />
        </div>
        <div className="listPage-info">
          <p className="listPage-info-label">watchlist</p>
          <p className="listPage-info-title">{list[1].name}</p>
          <p className="listPage-info-desc">{list[1].desc}</p>
        </div>
      </div>
    </div>
  );
  // return <div c  lassName="listPage">{list[1].name}</div>;
};

const mapStateToPorps = ({ lists }, { match }) => {
  const id = match.params.id;

  return {
    list: Object.entries(lists).filter((list) => list[0] === id)[0],
  };
};
export default connect(mapStateToPorps)(ListPage);
