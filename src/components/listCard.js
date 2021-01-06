import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsPencil } from "react-icons/bs";
import { AiOutlineFileImage } from "react-icons/ai";
import Modal from "./modal";

const ListCard = ({ list }) => {
  const listData = list[1];
  const [isModalOpen, openModel] = React.useState(false);
  const handleClose = () => {
    openModel(false);
  };

  return (
    <div className="list">
      <Modal
        open={isModalOpen}
        modalLabel="Edit List Details"
        handleClose={handleClose}
        buttonLabel="save"
        data={{ name: listData.name, desc: listData.desc, id: list[0] }}
      />
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
            <button className="list-card--overlay-wrapper-dots">
              <HiDotsHorizontal />
            </button>
            <button
              onClick={() => openModel(true)}
              className="list-card--overlay-wrapper-pencil"
            >
              <BsPencil />
            </button>
          </div>
        </div>
      </div>
      <p className="list-name">{listData.name}</p>
    </div>
  );
};

export default ListCard;
