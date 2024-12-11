import axios from "axios";

import {
  BOARD_ARTICLE_WRITE_URI,
  BOARD_TYPE,
  BOARD_FAVORITE,
  BOARD_BRING_FAVORITE,
  BOARD_ARTICLE_VIEW,
  BOARD_ARTICLE_DETAIL,
  BOARD_MOVE_BASKET,
  BOARD_TRASH_VIEW,
  BOARD_TRASH_PERMANENT,
  BOARD_ARTICLE_EDIT,
} from "../URI";


export const postBoardArticleWrite = async (data) => {
  try {
    // 데이터가 제대로 전달되는지 확인
    console.log("Sending Data:", data);

    // POST 요청으로 데이터 전송
    const response = await axios.post(BOARD_ARTICLE_WRITE_URI, data, {
      headers: {
        "Content-Type": "application/json",
      },
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
        },
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
    const response = await axios.get(
      `${BOARD_BRING_FAVORITE}?userId=${userId}`
    );
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

// 게시글 목록 가져오기
export const getBoardArticles = async () => {
  try {
    // 서버에서 게시글 데이터를 가져오는 GET 요청
    const response = await axios.get(BOARD_ARTICLE_VIEW);
    console.log("Fetched Board Articles:", response.data); // 응답 데이터 확인
    return response.data; // 서버에서 가져온 데이터 반환
  } catch (err) {
    console.error("Error while fetching board articles:", err); // 에러 출력
    throw new Error("게시글 목록을 가져오는 데 실패했습니다.");
  }
};

export const ArticleDetail = async (id) => {
  try {
    const response = await axios.get(`${BOARD_ARTICLE_DETAIL}?id=${id}`); // URL과 파라미터 확인
    console.log("Fetched Article Detail:", response.data);
    return response.data;
  } catch (err) {
    console.error(`Error while fetching article with ID ${id}:`, err);
    throw new Error("게시글 정보를 가져오는 데 실패했습니다.");
  }
};

export const moveBoardToBasket = async (id, userId) => {
  try {

      console.log("Sending to server:", { id, userId });
      const response = await axios.delete(`${BOARD_MOVE_BASKET}`, {
          params: { id, userId },
      });
      console.log("게시글 휴지통 이동:", response.data); // 응답 데이터 확인
      return response.data;
  } catch (err) {
    console.error(`Error while moving article with ID ${id} to basket:`, err);
    throw new Error("게시글을 휴지통으로 이동하는 데 실패했습니다.");
  }
};

export const deleteBoardArticle = async (id, userId) => {
  try {
      const response = await axios.delete(`${BOARD_MOVE_BASKET}?id=${id}&userId=${userId}`);
      console.log("게시글 삭제 응답:", response.data);
      return response.data;
  } catch (error) {
      console.error(`게시글 삭제 중 오류 발생:`, error);
      throw new Error("게시글 삭제에 실패했습니다.");
  }
};

export const getTrashArticles = async () => {
  try {
    // 서버에서 휴지통 게시글 데이터 가져오기
    const response = await axios.get(BOARD_TRASH_VIEW);
    console.log("Fetched Trash Articles:", response.data); // 응답 데이터 확인
    return response.data; // 서버에서 반환된 데이터 반환
  } catch (err) {
    console.error("Error while fetching trash articles:", err); // 에러 출력
    if (err.response) {
      console.error("Response error data:", err.response.data);
      console.error("Response error status:", err.response.status);
    }
    throw new Error("휴지통 게시글 목록을 가져오는 데 실패했습니다.");
  }
};

export const deleteTrashArticles = async (articleIds) => {
  try {
    const queryString = articleIds.join(",");
    console.log("Query String:", queryString); // 쿼리 확인
    const response = await axios.delete(
      `${BOARD_TRASH_PERMANENT}?ids=${queryString}`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (err) {
    console.error("API Error:", err.response?.data || err.message);
    throw new Error("휴지통 게시글 영구 삭제에 실패했습니다.");
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const response = await axios.put(
      BOARD_ARTICLE_EDIT.replace(":id", id),
      articleData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패:", error);
    throw error;
  }
};

export const getAllBoards = async () => {
  try {
      const response = await axios.get(BOARD_ALL);
      console.log("Fetched Boards:", response.data); // 응답 데이터 확인
      console.log("BOARD_ALL URL:", BOARD_ALL); // BOARD_ALL 값 출력
      return response.data;
  } catch (err) {
      console.error("Error while fetching all boards:", err);
      throw new Error("게시판 데이터를 가져오는 데 실패했습니다.");
  }
};


export const getArticlesByBoard = async (boardId) => {
  try {
      const url = BOARD_ARTICLE_BOARD(boardId); // URI 생성
      console.log(`Fetching articles for board ID ${boardId}: ${url}`);
      
      const response = await axios.get(url); // GET 요청
      return response.data; // 서버 응답 데이터 반환
  } catch (err) {
      console.error(`Error fetching articles for board ID ${boardId}:`, err);
      throw new Error("게시판 게시글을 가져오는 데 실패했습니다.");
  }
};

