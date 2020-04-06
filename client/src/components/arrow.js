import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Arrow = props => {
  const { onClick } = props;
  return (
    <div>
      {props.type === "prev" ? (
        <div className="arrow arrow-left" onClick={onClick}>
          <IoIosArrowBack size={40} color="white" />
        </div>
      ) : (
        <div className="arrow arrow-right" onClick={onClick}>
          <IoIosArrowForward size={40} color="white" />
        </div>
      )}
    </div>
  );
};

export default Arrow;
