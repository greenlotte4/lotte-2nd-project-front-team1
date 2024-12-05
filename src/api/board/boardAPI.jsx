import axios from "axios";
import {BOARD_ARTICLE_WRITE_URI, BOARD_TYPE, BOARD_FAVORITE_UPDATE , BOARD_USER_FAVORITE } from "../URI";

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

export const updateFavorite = async (boardId, isFavorite) => {
    try {
        const response = await axios.put(
            `${BOARD_FAVORITE_UPDATE.replace("{boardId}", boardId)}`,
            { boardId, isFavorite } // boardId와 isFavorite 값을 객체로 보내기
        );
        console.log("즐겨찾기 업데이트:", response.data);
        return response.data;
    } catch (err) {
        console.error("즐겨찾기 에러:", err);
        throw new Error("즐겨찾기를 실패했습니다.");
    }
};

export const getUserFavorites = async () => {
    try {
        // 새로운 경로로 API 호출
        const response = await axios.get(BOARD_USER_FAVORITE);
        return response.data; // 유저의 즐겨찾기 게시물 목록을 반환
    } catch (err) {
        console.error("즐겨찾기 목록을 가져오는 에러:", err);
        throw new Error("즐겨찾기 목록을 가져오지 못했습니다.");
    }
};