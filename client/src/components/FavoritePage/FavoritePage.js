import { Popover } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [FavoriteMovie, setFavoriteMovie] = useState([]);
  const { refetch } = useQuery(
    "favoritePage",
    () => {
      return axios
        .post("/api/favorite/getFavoredMovie", {
          userForm: JSON.parse(localStorage.getItem("loginSuccess")).userId,
        })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            setFavoriteMovie(res.data.data);
          } else {
            alert("정보 가져오기 실패");
          }
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
  //   const {} = useQuery(
  //     "favoritePage",
  //     () => {
  //       return axios
  //         .post("/api/favorite/removeFormFavorite", variables)
  //         .then((res) => {
  //           if (res.data.success) {
  //           } else {
  //             alert("지우기 가져오기 실패");
  //           }
  //         });
  //     },
  //     {
  //       refetchOnWindowFocus: false,
  //       retry: 0,
  //       onSuccess: (data) => {
  //         console.log(data);
  //       },
  //       onError: (e) => {
  //         console.log(e.message);
  //       },
  //     }
  //   );

  const onClickDelete = (movieId, userForm) => {
    const variables = {
      movieId,
      userForm,
    };
    axios.post("/api/favorite/removeFormFavorite", variables).then((res) => {
      if (res.data.success) {
        refetch();
        // 꼼수
      } else {
        alert("지우기 가져오기 실패");
      }
    });
  };

  return (
    <div className="w-[85%] mx-auto my-12">
      <h2 className="text-3xl font-semibold mb-4">좋아하는 영화</h2>
      <hr className="mb-4" />
      <table className="w-full border border-collapse">
        <thead>
          <tr>
            <th className="border p-2">제목</th>
            <th className="border p-2">런타임</th>
            <th className="border p-2">??</th>
          </tr>
        </thead>
        <tbody>
          {FavoriteMovie.map((FavoriteData, index) => {
            const content = (
              <div>
                {FavoriteData.moviePost ? (
                  <img src={`${IMAGE_BASE_URL}w500${FavoriteData.moviePost}`} />
                ) : (
                  "이미지 없음"
                )}
              </div>
            );

            return (
              <tr key={index}>
                <Popover content={content} title={FavoriteData.movieTitle}>
                  <td>{FavoriteData.movieTitle}</td>
                </Popover>

                <td>{FavoriteData.movieRunTime}</td>
                <td>
                  <button
                    onClick={() =>
                      onClickDelete(FavoriteData.movieId, FavoriteData.userForm)
                    }
                  >
                    제거
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
