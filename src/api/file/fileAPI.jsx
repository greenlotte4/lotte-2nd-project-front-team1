import axios from "axios";
import { File } from "../URI";
import { folder } from "jszip";

export const savedFile = async (formData) => {
    try {
        // LocalStorage나 SessionStorage에서 사용자 정보 가져오기
        const user =
            JSON.parse(localStorage.getItem("user")) ||
            JSON.parse(sessionStorage.getItem("user"));

        const userId = user.userid;

        // 파일 업로드 요청
        const response = await axios.post(`${File}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더 설정
            },
            params: {
                userId: userId, // 쿼리 파라미터로 userId 전달
            }
        });

        return response.data; // 서버의 응답 반환
    } catch (err) {
        console.log("파일 업로드 실패:", err); // 오류 처리
        throw err; // 오류를 호출한 곳으로 던져서 처리할 수 있도록 함
    }
};

export const createFolder = async (folderName, driveId, folderId) => {

    const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));

    const userId = user.userid;
    console.log("보낼거", userId, folderName, driveId, folderId); // 확인용 로그
    try {
        const response = await axios.post(`${File}/create/folder`, {
            folderName: folderName, // 폴더 이름
            driveId: driveId,        // 드라이브 ID 추가
            userId: userId,         // 유저 ID
            folderId: folderId || null,
        });
        return response;
    } catch (err) {
        console.log("오류남 ㅋ", err); // 오류 로그
    }
}

export const selectDriveData = async (driveId) => {
    try {
        const user =
            JSON.parse(localStorage.getItem("user")) ||
            JSON.parse(sessionStorage.getItem("user"));

        const userId = user.userid;

        const response = await axios.post(`${File}/select/driveData`, null, {
            params: { userId: userId, driveId: driveId },
        });
        return response;
    } catch (error) {
        console.error("변경중 오류 발생 " + error);
    }
}

export const getChildFolders = async (folderId) => {
    try {
        const response = await axios.post(`${File}/child/folder`, { folderId });
        if (response.status === 200) {
            return response.data; // 실제 필요한 데이터만 반환
        } else {
            // 200번 외의 상태 코드 처리
            console.error('폴더 데이터를 가져오는 데 실패했습니다.', response.status);
            return [];
        }
    } catch (error) {
        console.error("변경중 오류 발생 " + error);
        return [];  // 오류 발생 시 빈 배열 반환

    }
}