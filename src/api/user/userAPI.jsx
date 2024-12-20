/*

    날짜 : 2024/11/25
    이름 : 최영진
    내용 : api 설계

    추가내역
    2024-12-03 최영진 sandEmail, authEmail 추가

*/

import axios from "axios";
import {
  USER_CHANGE,
  USER_CHECK,
  USER_EMAIL,
  USER_FIND,
  USER_LIST,
  USER_LIST_BYUSERID,
  USER_LOGIN_URI,
  USER_LOGOUT_URI,
  USER_URI,
} from "../URI";

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
    console.log("반환값" + response.status);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 403) {
      alert(err.response.data);
    } else {
      console.log(err);
    }
  }
};
export const postUserLogout = async (userId) => {
  try {
    const response = await axios.post(`${USER_LOGOUT_URI}`, userId);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 403) {
      alert(err.response.data);
    } else {
      console.log(err);
    }
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
    const response = await axios.post(`${USER_EMAIL}/send`, { email: email });
    return response;
  } catch (err) {
    console.log("이메일 인증 오류" + err);
    throw err;
  }
};
export const sendVerificationWithIdAndEmail = async (userId, email) => {
  try {
    const response = await axios.post(`${USER_EMAIL}/findPassEmail`, {
      userId,
      email,
    });
    return response;
  } catch (err) {
    console.log("아이디와 이메일 인증 오류: " + err);
    throw err;
  }
};

export const checkEmail = async (email) => {
  try {
    const response = await axios.post(`${USER_EMAIL}/checkEmail`, {
      email: email,
    });

    return response.data.isAvailable;
  } catch (err) {
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
    throw err;
  }
};

export const checkPhoneNumber = async (fullPhoneNumber) => {
  try {
    // 실제 API URL로 변경 필요 (여기서는 USER_CHECK를 API URL로 가정)
    const response = await axios.post(`${USER_CHECK}hpcheck`, {
      phoneNumber: fullPhoneNumber,
    });
    return response.data; // 예: { isAvailable: true/false }
  } catch (error) {
    console.error("폰번호 중복 체크 실패:", error);
    return { isAvailable: false }; // 에러 시 기본 false 반환
  }
};

export const findByEmail = async (email) => {
  try {
    const response = await axios.post(`${USER_FIND}findEmail`, {
      email: email,
    });
    return response;
  } catch (error) {
    console.error("아이디 조회 실패:", error);
    return error; // 에러 시 기본 false 반환
  }
};
//유저 정보 전부 가지고 오기
export const getUserListAll = async () => {
  try {
    const response = await axios.get(USER_LIST);
    return response.data; // 유저의 즐겨찾기 게시물 목록을 반환
  } catch (err) {
    console.error("유저 목록을 불러오지 못함:", err);
    throw new Error("유저 목록을 불러오지 못했습니다.");
  }
};
export const getUserListbyuserid = async (userId) => {
  try {
    const response = await axios.post(`${USER_LIST_BYUSERID}`, {
      userId: userId,
    });
    return response.data; // 유저의 즐겨찾기 게시물 목록을 반환
  } catch (err) {
    console.error("유저 목록을 불러오지 못함:", err);
    throw new Error("유저 목록을 불러오지 못했습니다.");
  }
};
export const changePassword = async (userId, newPassword) => {
  // 비번변경
  try {
    const response = await axios.post(`${USER_FIND}newPass`, {
      newPassword: newPassword,
      userId: userId,
    });

    return response; // Handle response appropriately
  } catch (error) {
    console.error("비밀번호 변경중 오류 발생 :", error);
    throw error; // Handle error
  }
};

export const changeNewHp = async (newHp) => {
  try {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
    const userId = user.userid;

    const response = await axios.put(`${USER_CHANGE}/newHp`, {
      hp: newHp,
      userId: userId,
    });
    return response;
  } catch (error) {
    console.error("변경중 오류 발생 " + error);
  }
};

export const changeNewEmail = async (newEmail) => {
  try {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    const userId = user.userid;

    const response = await axios.put(`${USER_CHANGE}/newEmail`, {
      email: newEmail,
      userId: userId,
    });
    return response;
  } catch (error) {
    console.error("변경중 오류 발생 " + error);
  }
};
export const changeStatusMessage = async (statusMessage) => {
  try {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    const userId = user.userid;

    const response = await axios.put(`${USER_CHANGE}/statusMessage`, {
      statusMessage: statusMessage,
      userId: userId,
    });
    return response;
  } catch (error) {
    console.error("변경중 오류 발생 " + error);
  }
};

export const uploadProfile = async (formData) => {
  try {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    const userId = user.userid;
    const response = await axios.post(`${USER_CHANGE}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        userId: userId, // userId를 URL 파라미터로 전달
      },
    });
    const filePath = response.data;
    console.log(filePath);
    if (filePath) {
      console.log("파일 경로:", filePath);
      return getFileUrl(filePath); // 경로를 절대 URL로 변환하여 반환
    } else {
      console.error("filePath가 없거나 잘못된 응답:", response.data);
      return null; // filePath가 없으면 null 반환
    }
  } catch (error) {
    console.error("변경중 오류 발생 " + error);
  }
};

// 파일 경로를 절대 URL로 변환하는 함수
export const getFileUrl = (filePath) => {
  const baseUrl = "http://localhost:8080"; // 서버 도메인 (배포 시 수정 필요)
  const bepoUrl = "http://13.125.166.237:8080";
  if (filePath && filePath.startsWith("/user/thumb/")) {
    return `${baseUrl}${filePath}`;
  }
  console.error("잘못된 파일 경로:", filePath);
  return null; // 잘못된 경로인 경우 null 반환
};

export const deleteuser = async () => {
  try {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    const userId = user.userid;
    const response = await axios.put(`${USER_CHANGE}/delete`, {
      userId: userId, // userId를 URL 파라미터로 전달
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const profileUrl = async () => {
  try {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
    const userId = user.userid;
    const response = await axios.get(`${USER_CHANGE}/profileUrl`, {
      params: {
        userId: userId, // URL 쿼리 파라미터로 userId 전달
      },
    });
    const imageUrl = response.data; // 서버에서 반환된 이미지 URL

    return imageUrl; // 이미지 URL을 반환
  } catch (error) {
    console.log(error);
  }
};

export const loginStatus = async (userStatus) => {
  try {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    const userId = user.userid;
    const response = await axios.put(`${USER_CHANGE}/loginStatus`, {
      userId: userId,
      userStatus: userStatus, // userId를 URL 파라미터로 전달
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const selectLoginStatus = async () => {
  try {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    const userId = user.userid;
    const response = await axios.get(`${USER_CHANGE}/selectLoginStatus`, {
      params: {
        userId: userId, // URL 쿼리 파라미터로 userId 전달
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
