import React, { useEffect, useState } from "react";
import { API_KEY, API_USER, IMAGE_BASE_URL } from "../../Config";
import axios from "axios";
import { useQuery } from "react-query";
import MainImage from "./MainImage.js/MainImage";
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function LoadingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieIamge, setMainMovieIamge] = useState("");
  const [page, setPage] = useState(1);

  const movieUrl = `${API_USER}movie/popular?api_key=${API_KEY}&language=ko&page=${page}`;

  const fetchData = () => {
    return axios.get(movieUrl).then((response) => response.data);
  };

  const { isLoading, isError, data, error, refetch } = useQuery(
    "todos",
    fetchData,
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setMovies((pre) => [...pre, ...data.results]);
        setMainMovieIamge(data.results[1]);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );

  const loadMoreItems = () => {
    setPage((pre) => pre + 1);
    refetch();
  };

  console.log(Movies);
  return (
    <div className={`m-0 w-full `}>
      {MainMovieIamge && (
        <MainImage
          image={`${IMAGE_BASE_URL}original${MainMovieIamge.backdrop_path}`}
          title={MainMovieIamge.original_title}
          text={MainMovieIamge.overview}
        />
      )}
      <div className={`w-10/12 my-4 mx-auto`}>
        <h2>최근 영화</h2>
        <hr />
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => {
              return (
                <GridCards
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                  key={index}
                />
              );
            })}
        </Row>
      </div>
      <div className={`flex justify-center`}>
        <button onClick={loadMoreItems} disabled={isLoading}>
          더 가져오기
        </button>
      </div>
    </div>
  );
}

export default LoadingPage;
