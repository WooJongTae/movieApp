import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

function Favorite({ movieInfo, userForm, movieId }) {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  const movieRunTime = movieInfo.runtime;

  let favoriteData = {
    userForm: userForm,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };

  const { refetch: favo } = useQuery(
    "favorite",
    () => {
      return axios
        .post("/api/favorite/favoriteNumber", favoriteData)
        .then((res) => {
          console.log(res.data);
          return () => {
            if (res.data.success) {
              console.log(res.data.FavoriteNumber);
              // return res.data.FavoriteNumber;
              setFavoriteNumber(res.data.FavoriteNumber);
            } else {
              alert("숫자 정보를 가져오는데 실패했습니다. 에러발생");
            }
          };
        });
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );

  const { refetch: favod } = useQuery(
    "favorited",
    () => {
      return axios.post("/api/favorite/favorited", favoriteData).then((res) => {
        console.log(res.data);
        return () => {
          if (res.data.success) {
            console.log(res.data.favorited);

            setFavorited(res.data.favorited);
          } else {
            alert("정보 가져오기 실패했습니다. 에러발생");
          }
        };
      });
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );
  const onClickFavorite = () => {
    if (Favorited) {
      console.log(Favorited);
      axios
        .post("/api/favorite/removeFormFavorite", favoriteData)
        .then((res) => {
          if (res.data.success) {
            console.log(1);
            setFavoriteNumber(FavoriteNumber - 1);
            favod();
            // favo();
          } else {
            alert("리스트에서 지우는 걸 실패했습니다.");
          }
        });
    } else {
      axios.post("/api/favorite/addToFavorite", favoriteData).then((res) => {
        if (res.data.success) {
          console.log(2);
          setFavoriteNumber(FavoriteNumber + 1);
          favod();
          // favo();
        } else {
          alert("리스트에서 추가하는 걸 실패했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <button onClick={onClickFavorite}>
        {Favorited ? "누름" : "아직 안누름!!"}
        {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
