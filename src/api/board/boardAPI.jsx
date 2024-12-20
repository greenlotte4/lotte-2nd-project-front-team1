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
  BOARD_ARTICLE_BOARD,
  BOARD_ALL,
  BOARD_ARTICLE_MOVE,
  BOARD_ARTICLE_USER,
  BOARD_IMPORTANT_ARTICLE,
  BOARD_COMMENT_ADD,
  BOARD_COMMENT_VIEW,
  BOARD_REPLY_ADD,
  BOARD_REPLY_VIEW,
  BOARD_ARTICLE_IMPORTANT_VIEW,
  BOARD_MUST_READ,
  BOARD_MUST_READ_main,
  BOARD_RECENT_ARTICLE,
  BOARD_RECENT_ARTICLE_TEN,
  BOARD_TITLE_SEARCH,
  BOARD_CREATE_URI,
  BOARD_UPDATE_URI,
  BOARD_DELETE_URI,
  BOARD_FREEBOARD_VIEW,
} from "../URI";


export const postBoardArticleWrite = async (data) => {
  try {
    // 데이터가 제대로 전달되는지 확인
    console.log("Sending Data:", data);

    // POST 요청으로 데이터 전송
    const response = await axios.post(BOARD_ARTICLE_WRITE_URI, data, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const getTrashArticles = async (userId, page = 0, size = 10) => {
  try {
    // 서버에서 휴지통 게시글 데이터 가져오기 (사용자 ID와 페이징 전달)
    const response = await axios.get(BOARD_TRASH_VIEW, {
      params: {
        userId, // 사용자 ID
        page,   // 현재 페이지 번호
        size,   // 한 페이지에 표시할 게시글 수
      },
    });
    console.log("Fetched Trash Articles with Pagination:", response.data); // 응답 데이터 확인
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


export const getArticlesByBoard = async (boardId, page = 0, size = 20) => {
  try {
      const url = BOARD_ARTICLE_BOARD(boardId, page, size); // URI 생성
      console.log(`Fetching articles for board ID ${boardId} at page ${page}, size ${size}: ${url}`);
      
      const response = await axios.get(url); // GET 요청
      console.log("Response:", response.data);
      return response.data; // 서버 응답 데이터 반환
  } catch (err) {
    console.error(`Error fetching articles for board ID ${boardId}:`, err);
    console.log(err.response?.data); // 추가된 부분
      throw new Error("게시판 게시글을 가져오는 데 실패했습니다.");
      
  }
};


// 게시글 이동
export const moveArticlesToBoard = async (articleIds, boardId) => {
  try {
    // 요청 데이터
    const requestData = {
      articleIds, // 이동할 게시글 ID 리스트
      boardId,    // 이동할 대상 게시판 ID
    };

    console.log("Sending move request:", requestData); // 전송 데이터 확인

    // POST 요청으로 데이터 전송
    const response = await axios.post(BOARD_ARTICLE_MOVE, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Move Response:", response.data); // 응답 데이터 확인
    return response.data; // 성공 시 응답 데이터 반환
  } catch (err) {
    console.error("Error while moving articles to board:", err.response?.data || err.message);
    throw new Error("게시글 이동에 실패했습니다.");
  }
};

export const getArticlesByUser = async (userId, page = 0, size = 10) => {
  try {
    const url = BOARD_ARTICLE_USER(userId, page, size); // 사용자 ID, 페이지 번호, 크기를 기반으로 URI 생성
    console.log(`Fetching articles for user ID ${userId} at page ${page} with size ${size}: ${url}`);

    const response = await axios.get(url); // GET 요청으로 데이터 가져오기
    console.log("유저별 글:", response.data); // 응답 데이터 확인
    return response.data; // 성공 시 데이터 반환
  } catch (err) {
    console.error(`Error fetching articles for user ID ${userId}:`, err);
    throw new Error("사용자가 작성한 게시글을 가져오는 데 실패했습니다.");
  }
};

export const getImportantArticles = async (userId, page = 0, size = 10) => {
  try {
    const response = await axios.get(BOARD_ARTICLE_IMPORTANT_VIEW(userId, page, size));
    console.log("중요글 API 응답 데이터:", response.data); // 디버깅용
    return response.data; // 백엔드에서 반환된 데이터
  } catch (error) {
    console.error("중요글 API 호출 오류:", error.message);
    throw error; // 오류 전달
  }
};

export const toggleImportantArticle = async (articleId, userId) => {
  try {
    const response = await axios.post(
      BOARD_IMPORTANT_ARTICLE(articleId), // URL 생성
      null, // PATCH 요청은 데이터가 필요하지 않음
      {
        params: { userId }, // 사용자 ID를 쿼리 파라미터로 전달
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Important Article Toggled:", response.data); // 응답 데이터 확인
    return response.data; // 서버에서 반환된 데이터 반환
  } catch (err) {
    console.error("Error while toggling important article:", err.response?.data || err.message); // 에러 출력
    throw new Error("중요 게시글 여부를 변경하는 데 실패했습니다.");
  }
};

// 댓글 추가 함수
export const addComment = async (articleId, userId, content) => {
  try {
    const response = await axios.post(BOARD_COMMENT_ADD, {
      boardArticleId: articleId, // 게시글 ID
      userId: userId, // 작성자 ID
      content: content, // 댓글 내용
    });
    console.log("여기" +articleId, userId, content); 
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error.message);
    throw error;
  }
};

// 댓글 보기 함수
export const getCommentsByArticle = async (commentId) => {
  try {
    const response = await axios.get(BOARD_COMMENT_VIEW(commentId)); // GET 요청
    console.log("댓글 조회 성공:", response.data);
    return response.data; // 댓글 데이터 반환
  } catch (error) {
    console.error("댓글 조회 실패:", error);
    throw new Error("댓글을 가져오는 데 실패했습니다.");
  }
};

// 답글 추가 함수
export const addReply = async ({ commentId, userId, content }) => {
  try {
    const response = await axios.post(BOARD_REPLY_ADD(commentId), {
      commentId,
      userId, // 사용자 ID
      content, // 답글 내용
    });

    console.log("답글 등록 성공:", response.data);
    return response.data; // 서버 응답 반환
  } catch (error) {
    console.error("답글 등록 실패:", error);
    throw new Error("답글 등록에 실패했습니다.");
  }
};

// 답글 조회 함수
export const getRepliesByComment = async (commentId) => {
  try {
    const response = await axios.get(BOARD_REPLY_VIEW(commentId)); // GET 요청
    console.log("답글 조회 성공:", response.data);
    return response.data; // 답글 데이터 반환
  } catch (error) {
    console.error("답글 조회 실패:", error);
    throw new Error("답글을 가져오는 데 실패했습니다.");
  }
};

export const getMustReadArticles = async (page = 0, size = 10) => {
  try {
    // 페이지와 크기를 파라미터로 전달
    const response = await axios.get(BOARD_MUST_READ, {
      params: { page, size },
    });
    console.log("필독 게시글 데이터:", response.data); // 디버깅 로그
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("필독 게시글 API 호출 오류:", error.message);
    throw error; // 오류를 호출한 쪽으로 전달
  }
};

export const getMainMustReadArticles = async () => {
  try {
    const response = await axios.get(BOARD_MUST_READ_main);
    console.log("필독 게시글 데이터:", response.data); // 디버깅 로그
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("필독 게시글 API 호출 오류:", error.message);
    throw error; // 오류를 호출한 쪽으로 전달
  }
};

// 최근 게시글 가져오기
export const getRecentArticles = async (page = 0, size = 10) => {
  try {
    // 서버에서 페이지 번호와 크기에 따라 데이터를 가져오는 GET 요청
    const response = await axios.get(BOARD_RECENT_ARTICLE, {
      params: { page, size }, // 쿼리 파라미터로 page와 size 전달
    });

    console.log("Fetched Recent Articles:", response.data); // 응답 데이터 확인
    return response.data; // 서버에서 가져온 데이터 반환
  } catch (err) {
    console.error("Error while fetching recent articles:", err); // 에러 출력
    throw new Error("최근 게시글 목록을 가져오는 데 실패했습니다.");
  }
};

export const getTenRecentArticles = async () => {
  try {
    const response = await axios.get(BOARD_RECENT_ARTICLE_TEN); // `/recent` 호출
    return response.data;
  } catch (error) {
    console.error("Error fetching recent articles:", error.message);
    throw error;
  }
};

export const searchArticlesByTitle = async (boardId, keyword) => {
  try {
    const response = await fetch(`${BOARD_TITLE_SEARCH(boardId)}?keyword=${encodeURIComponent(keyword)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`검색 요청 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("검색 중 오류 발생:", error);
    throw error;
  }
};

export const createBoard = async (boardDTO, userId) => {
  try {
    // API 요청을 보낼 데이터를 확인
    console.log("Creating Board:", { boardDTO, userId });

    // POST 요청으로 새 게시판 생성
    const response = await axios.post(BOARD_CREATE_URI, boardDTO, {
      params: { userId }, // 쿼리 파라미터로 userId 전달
      headers: {
        "Content-Type": "application/json", // JSON 데이터 전달
      },
    });

    console.log("Board Created Successfully:", response.data); // 응답 확인
    return response.data; // 성공 시 서버에서 반환된 데이터 반환
  } catch (error) {
    console.error("Error while creating board:", error.response?.data || error.message);
    throw new Error("게시판 생성에 실패했습니다.");
  }
};

export const updateBoard = async (boardId, boardDTO, userId) => {
  try {
    console.log("Updating Board:", { boardId, boardDTO, userId });

    // PUT 요청으로 게시판 수정
    const response = await axios.put(BOARD_UPDATE_URI(boardId), boardDTO, {
      params: { userId }, // 사용자 ID를 쿼리 파라미터로 전달
      headers: {
        "Content-Type": "application/json", // JSON 데이터 전달
      },
    });

    console.log("Board Updated Successfully:", response.data); // 응답 데이터 로그
    return response.data; // 서버에서 반환된 데이터 반환
  } catch (error) {
    console.error("Error while updating board:", error.response?.data || error.message); // 에러 로그
    throw new Error("게시판 수정에 실패했습니다.");
  }
};

export const deleteBoard = async (boardId, userId) => {
  try {
    console.log("Deleting Board:", { boardId, userId }); // 요청 데이터 로그

    // DELETE 요청으로 게시판 삭제
    const response = await axios.delete(BOARD_DELETE_URI(boardId), {
      params: { userId }, // 사용자 ID를 쿼리 파라미터로 전달
    });

    console.log("Board Deleted Successfully:", response.data); // 성공 메시지
    return response.data; // 서버에서 반환된 데이터 반환
  } catch (error) {
    console.error("Error while deleting board:", error.response?.data || error.message); // 에러 로그
    throw new Error("게시판 삭제에 실패했습니다.");
  }
};

export const getRecentFreeBoardArticles = async () => {
  try {
    // 서버에서 자유게시판 최신 글 5개를 가져오는 GET 요청
    const response = await axios.get(BOARD_FREEBOARD_VIEW); // BOARD_FREEBOARD_VIEW는 `/article/freerecent`를 가리킴
    console.log("Freeboard API Response:", response.data); // API 응답 데이터 확인
    return response.data; // 서버에서 반환된 데이터 반환
  } catch (error) {
    console.error("Error fetching freeboard articles:", error.message); // 에러 로그
    throw new Error("자유게시판 글을 가져오는 데 실패했습니다.");
  }
};