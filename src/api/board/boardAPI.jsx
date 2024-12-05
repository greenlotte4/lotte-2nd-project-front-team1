import axios from "axios";
import {BOARD_ARTICLE_WRITE_URI, BOARD_TYPE, BOARD_FAVORITE, BOARD_BRING_FAVORITE} from "../URI";

export const postBoardArticleWrite = async (data) => {
    try {
        // 데이터가 제대로 전달되는지 확인
        console.log("Sending Data:", data);
        
        // POST 요청으로 데이터 전송
        const response = await axios.post(BOARD_ARTICLE_WRITE_URI, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("Response:", response.data);
        return response.data;
    } catch (err) {
        console.error("Error:", err);
        throw new Error("게시글 등록에 실패했습니다.");
    }
};

export const getBoards = async () => {
    try {
        // 서버에서 보드 데이터를 가져오는 GET 요청
        const response = await axios.get(BOARD_TYPE);
        
        console.log("Fetched Board Articles:", response.data);
        return response.data; // 서버에서 가져온 데이터 반환
    } catch (err) {
        console.error("Error while fetching board articles:", err);
        throw new Error("게시글 목록을 가져오는 데 실패했습니다.");
    }
};

// 즐겨찾기 추가 또는 삭제 API
export const addFavoriteBoard = async ({ boardId, isFavorite, userId }) => {
    try {
      console.log("Sending to API:", { boardId, isFavorite, userId }); // 요청 데이터 확인
      const response = await axios.post(
        BOARD_FAVORITE,
        { boardId, isFavorite, userId }, // 요청 데이터에 userId 추가
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log("즐찾 업뎃:", response.data); // 응답 데이터 확인
      return response.data;
    } catch (err) {
      console.error("Error response:", err.response?.data || err.message);
      throw new Error("즐겨찾기 상태를 변경하는 데 실패했습니다.");
    }
  };

  export const getFavoriteBoards = async (userId) => {
    try {
      const response = await axios.get(`${BOARD_BRING_FAVORITE}?userId=${userId}`);
      console.log("Fetched Favorite Boards:", response.data);
      return response.data; // 서버에서 가져온 데이터 반환
    } catch (err) {
      console.error("Error while fetching favorite boards:", err);
      if (err.response) {
        // 서버 응답 오류의 경우
        console.error("Response error data:", err.response.data);
        console.error("Response error status:", err.response.status);
      }
      throw new Error("즐겨찾기 보드를 가져오는 데 실패했습니다.");
    }
  };