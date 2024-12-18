import axios from "axios";
import { File } from "../URI";
import { folder } from "jszip";

export const savedFile = async (formData) => {

    try {
        const user =
            JSON.parse(localStorage.getItem("user")) ||
            JSON.parse(sessionStorage.getItem("user"));

        const userId = user.userId;

        const response = await axios.post(`${File}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더 설정
            },
            params: {
                userId: userId,
            }
        });

        return response; // 서버의 응답 반환
    } catch (err) {
        console.log("파일 업로드 실패:", err); // 오류 처리
        throw err; // 오류를 호출한 곳으로 던져서 처리할 수 있도록 함
    }
};

export const createFolder = async (folderName, driveId) => {
    const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));

    const userId = user.userid;
    console.log("보낼거", userId, folderName, driveId); // 확인용 로그
    try {
        const response = await axios.post(`${File}/create/folder`, {
            folderName: folderName, // 폴더 이름
            driveId: driveId,        // 드라이브 ID 추가
            userId: userId,         // 유저 ID
        });
        return response;
    } catch (err) {
        console.log("오류남 ㅋ", err); // 오류 로그
    }
}
