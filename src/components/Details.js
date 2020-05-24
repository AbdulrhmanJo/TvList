import React, { Component } from "react";

class Details extends Component {
  getTime = (min) => {
    const afterDiv = min / 60;
    const hour = Math.floor(afterDiv);
    const m = Math.round((afterDiv - hour) * 60);
    return `${hour}h ${m}m`;
  };

  render() {
    const { data } = this.props;
    return (
      <div className="details-box">
        <div className="details-box-left">
          <div className="details-box-block">
            {/* <p className="details-box-block--header">Overview:</p> */}
            <p className="details-box-block--content">
              <span className="details-box-block--header">Overview:</span>
              {`${data.overview}`}
            </p>
          </div>
        </div>
        <div className="details-box-right">
          <div className="details-box-block">
            <p className="details-box-block--header">Release Date:</p>
            <p className="details-box-block--content">{data.release_date}</p>
          </div>
          <div className="details-box-block">
            <p className="details-box-block--header">Run time:</p>
            <p className="details-box-block--content">{this.getTime(data.runtime)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
