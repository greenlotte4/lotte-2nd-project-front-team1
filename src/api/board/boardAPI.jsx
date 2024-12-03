import axios from "axios";
import {BOARD_ARTICLE_WRITE_URI } from "../URI";

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