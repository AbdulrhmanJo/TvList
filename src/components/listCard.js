import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsPencil } from "react-icons/bs";

const ListCard = ({ list }) => {
  const listData = list[1];
  return (
    <div className="list">
      <div className="list-card">
        <div className="list-card--cover">
          {listData.content.length >= 4 ? (
            listData.content.map((item, index) => {
              if (index < 4) {
                return (
                  <img
                    src={`https://image.tmdb.org/t/p/w342${item.image}`}
                    alt={item.name}
                    key={index}
                  />
                );
              }
            })
          ) : listData.content.length === 0 ? (
            <div className="list-card--cover-noImg">
              <AiOutlineFileImage />
            </div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w342${
                listData.content[listData.content.length - 1].image
              }`}
              alt={listData.content[listData.content.length - 1].name}
            />
          )}
        </div>
        <div className="list-card--overlay">
          <div className="list-card--overlay-wrapper">
            <div className="list-card--overlay-wrapper-dots">
              <HiDotsHorizontal />
            </div>
            <div className="list-card--overlay-wrapper-pencil">
              <BsPencil />
            </div>
          </div>
        </div>
      </div>
      <p className="list-name">{listData.name}</p>
    </div>
  );
};

export default ListCard;
