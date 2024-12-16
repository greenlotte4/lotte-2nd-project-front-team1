import axios from "axios";
import { File } from "../URI";

export const savedFile = async (files) => {

    const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));

    const userId = user.userId;

    try {
        console.log("업로드보낼 파일", files);

        const response = await axios.post(`${File}/upload`, {
            userId: userId, files: files,
        });

        return response; // 서버의 응답 반환
    } catch (err) {
        console.log("파일 업로드 실패:", err); // 오류 처리
        throw err; // 오류를 호출한 곳으로 던져서 처리할 수 있도록 함
    }
};
