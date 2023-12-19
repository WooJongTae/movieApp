import React, { useState } from "react";
import { Descriptions } from "antd";

function MovieInfo({ movie }) {
  return (
    <Descriptions title="영화 정보" bordered>
      <Descriptions.Item label="제목">{movie.original_title}</Descriptions.Item>
      <Descriptions.Item label="출시일">{movie.release_date}</Descriptions.Item>
      <Descriptions.Item label="수익">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="시간">{movie.runtime}</Descriptions.Item>
      <Descriptions.Item label="평점" span={2}>
        {movie.vote_average}
      </Descriptions.Item>
      <Descriptions.Item label="투표 수">{movie.vote_count}</Descriptions.Item>
      <Descriptions.Item label="상태">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="인기">{movie.popularity}</Descriptions.Item>
    </Descriptions>
  );
}

export default MovieInfo;
