import React from "react";

const ListCard = ({ list }) => {
  const listData = list[1];
  return (
    <div className="list">
      <div className="list-card">
        <div className="list-card--cover">
          {listData.content.map((item, index) => {
            if (index < 4) {
              return (
                <img
                  src={`https://image.tmdb.org/t/p/w185${item.image}`}
                  alt={item.name}
                />
              );
            }
          })}
        </div>
      </div>
      <p className="list-name">{listData.name}</p>
    </div>
  );
};

export default ListCard;
