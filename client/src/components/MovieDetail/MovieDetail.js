import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API_KEY, API_USER, IMAGE_BASE_URL } from "../../Config";
import axios from "axios";
import MainImage from "../LoadingPage/MainImage.js/MainImage";
import MovieInfo from "./MovieInfo/MovieInfo";
import { Row } from "antd";
import GridCards from "../commons/GridCards";

function MovieDetail() {
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [CastToggle, setCastToggle] = useState(false);

  const params = useParams();

  const movieCredits = `${API_USER}movie/${params.movieId}/credits?api_key=${API_KEY}`;
  const detailUrl = `${API_USER}movie/${params.movieId}?api_key=${API_KEY}`;

  const { isLoading, isError, data, error, refetch } = useQuery(
    "detailMovie",
    () => {
      return axios.get(detailUrl).then((res) => {
        return res.data;
      });
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setMovie(data);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );

  const {} = useQuery(
    "movieInfo",
    () => {
      return axios.get(movieCredits).then((res) => {
        setCasts(res.cast);
        return res.data;
      });
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setCasts(data.cast);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );

  const castToggleActive = () => {
    setCastToggle((pre) => !pre);
  };
  return (
    <div>
      {Movie && (
        <MainImage
          image={`${IMAGE_BASE_URL}original${Movie.backdrop_path}`}
          title={Movie.original_title || Movie.title}
          text={Movie.overview}
        />
      )}
      <div className={` w-[85%] my-4 mx-auto`}>
        <MovieInfo movie={Movie} />
        <br />
        <div className={`flex justify-center m-8`}>
          <button onClick={castToggleActive}>작품 배우 보기</button>
        </div>

        {CastToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => {
                return (
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    castName={cast.name}
                    landing={true}
                    key={index}
                  />
                );
              })}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
