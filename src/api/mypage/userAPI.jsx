/*

    날짜 : 2024/11/25
    이름 : 최영진
    내용 : api 설계

    추가내역
    2024-12-03 최영진 sandEmail, authEmail 추가

*/

import axios from "axios";
import { USER_CHANGE, USER_CHECK, USER_EMAIL, USER_FIND, USER_LIST, USER_LOGIN_URI, USER_URI } from "../URI";

export const postUser = async (data) => {
    try {
        const response = await axios.post(`${USER_URI}`, data);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const postUserLogin = async (data) => {
    try {
        const response = await axios.post(`${USER_LOGIN_URI}`, data);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const checkUserId = async (userId) => {
    try {
        const response = await axios.get(`${USER_CHECK}checkUserId/${userId}`);
        return response;
    } catch (err) {
        console.log("아이디 확인중 오류" + err);
    }
};

export const sandEmail = async (email) => {

    try {
        const response = await axios.post(`${USER_EMAIL}/send`, { email: email })
        return response;
    } catch (err) {

        console.log("이메일 인증 오류" + err)
        throw err;
    }
}
export const sendVerificationWithIdAndEmail = async (userId, email) => {
    try {
        const response = await axios.post(`${USER_EMAIL}/findPassEmail`, { userId, email });
        return response;
    } catch (err) {
        console.log("아이디와 이메일 인증 오류: " + err);
        throw err;
    }
}

export const checkEmail = async (email) => {
    try {
        const response = await axios.post(`${USER_EMAIL}/checkEmail`, {
            email: email,
        });
        console.log("Email check response:", response); // 응답 확인

        return response.data.isAvailable;
    } catch (err) {
        console.log("이메일 인증 오류" + err);
        return false; // 실패 시 false 반환
    }
};
export const authEmail = async (email, authCode) => {
    try {
        const response = await axios.post(`${USER_EMAIL}/verify`, {
            email: email,
            authCode: authCode,
        });
        return response;
    } catch (err) {
        console.log("이메일 인증 오류" + err);
        throw err;
    }
};

export const checkPhoneNumber = async (fullPhoneNumber) => {
    try {
        // 실제 API URL로 변경 필요 (여기서는 USER_CHECK를 API URL로 가정)
        const response = await axios.post(`${USER_CHECK}hpcheck`, { phoneNumber: fullPhoneNumber });
        console.log("요청함")
        return response.data; // 예: { isAvailable: true/false }
    } catch (error) {
        console.error('폰번호 중복 체크 실패:', error);
        return { isAvailable: false }; // 에러 시 기본 false 반환
    }
};

export const findByEmail = async (email) => {
    try {
        console.log("보내는 이메일: ", email);
        const response = await axios.post(`${USER_FIND}findEmail`, { email: email })
        console.log("보내는 이메일: ", email);
        return response;
    } catch (error) {
        console.error('아이디 조회 실패:', error);
        return error; // 에러 시 기본 false 반환
    }
}

export const getUserListAll = async () => {
    try {
        const response = await axios.get(USER_LIST);
        return response.data; // 유저의 즐겨찾기 게시물 목록을 반환
    } catch (err) {
        console.error("유저 목록을 불러오지 못함:", err);
        throw new Error("유저 목록을 불러오지 못했습니다.");
    }
};
export const changePassword = async (userId, newPassword) => { // 비번변경
    try {
        console.log("전송되는 데이터: ", { newPassword, userId });

        const response = await axios.post(`${USER_FIND}newPass`,
            {
                newPassword: newPassword,
                userId: userId
            }
        );
        console.log("서버 응답: ", response);  // 응답 데이터 출력

        return response;  // Handle response appropriately
    } catch (error) {
        console.error("비밀번호 변경중 오류 발생 :", error);
        throw error;  // Handle error
    }
}



export const changeNewHp = async (newHp) => {
    try {
        console.log("전송되는 데이터" + newHp);
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("localStorage에서 가져온 user: ", user);
        const userId = user.userid;

        const response = await axios.put(`${USER_CHANGE}/newHp`,
            { hp: newHp, userId: userId },
        );
        console.log("서버 응답: ", response);  // 응답 데이터 출력
        return response;
    } catch (error) {
        console.error("변경중 오류 발생 " + error);
    }
}

export const changeNewEmail = async (newEmail) => {
    try {
        console.log("전송되는 데이터" + newEmail);
        const user = JSON.parse(localStorage.getItem('user'));

        const userId = user.userid;

        const response = await axios.put(`${USER_CHANGE}/newEmail`,
            { email: newEmail, userId: userId },
        );
        console.log("서버 응답: ", response);  // 응답 데이터 출력
        return response;
    } catch (error) {
        console.error("변경중 오류 발생 " + error);
    }
}
export const changeStatusMessage = async (statusMessage) => {
    try {
        console.log("전송되는 데이터" + statusMessage);
        const user = JSON.parse(localStorage.getItem('user'));

        const userId = user.userid;

        const response = await axios.put(`${USER_CHANGE}/statusMessage`,
            { statusMessage: statusMessage, userId: userId },
        );
        console.log("서버 응답: ", response);  // 응답 데이터 출력
        return response;
    } catch (error) {
        console.error("변경중 오류 발생 " + error);
    }
}

export const uploadProfile = async (formData) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));

        const userId = user.userid;
        const response = await axios.post(`${USER_CHANGE}/profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                userId: userId  // userId를 URL 파라미터로 전달
            }
        });
        const filePath = response.data
        console.log(filePath)
        if (filePath) {
            console.log("파일 경로:", filePath);
            return getFileUrl(filePath);  // 경로를 절대 URL로 변환하여 반환
        } else {
            console.error("filePath가 없거나 잘못된 응답:", response.data);
            return null;  // filePath가 없으면 null 반환
        }
    } catch (error) {
        console.error("변경중 오류 발생 " + error);

    }
}

// 파일 경로를 절대 URL로 변환하는 함수
const getFileUrl = (filePath) => {
    const baseUrl = "http://localhost:8080";  // 서버 도메인 (배포 시 수정 필요)
    if (filePath && (filePath.startsWith("/upload/"))){
        return `${baseUrl}${filePath}`;
    }
    console.error("잘못된 파일 경로:", filePath);
    return null;  // 잘못된 경로인 경우 null 반환
};