import React from "react";
import { Col } from "antd";
function GridCards({ image, movieId, movieName, landing, castName }) {
  if (landing) {
    return (
      // 호버시 이름 나오게
      <Col lg={6} md={8} xs={24}>
        <div className={`relative`}>
          <img src={image} alt={castName} className={`w-full h-80`} />
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div className={`relative`}>
          <a href={`/movie/${movieId}`}>
            <img src={image} alt={movieName} className={`w-full h-80`} />
          </a>
        </div>
      </Col>
    );
  }
}

export default GridCards;
