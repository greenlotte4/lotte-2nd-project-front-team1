/*

    날짜 : 2024/11/25
    이름 : 최영진
    내용 : api 설계

    추가내역
    2024-12-03 최영진 sandEmail, authEmail 추가

*/

import axios from "axios";
import { USER_CHECK, USER_EMAIL, USER_LIST, USER_LOGIN_URI, USER_URI } from "../URI";

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
    const response = await axios.post(`${USER_EMAIL}/send`, { email: email });
    return response;
  } catch (err) {
    console.log("이메일 인증 오류" + err);
    throw err;
  }
};
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
    const response = await axios.post(`${USER_CHECK}hpcheck`, {
      phoneNumber: fullPhoneNumber,
    });
    console.log("요청함");
    return response.data; // 예: { isAvailable: true/false }
  } catch (error) {
    console.error("폰번호 중복 체크 실패:", error);
    return { isAvailable: false }; // 에러 시 기본 false 반환
  }
};

export const getUserListAll = async () => {
  try {
    const response = await axios.get(USER_LIST);
    return response.data; // 유저의 즐겨찾기 게시물 목록을 반환
  } catch (err) {
    console.error("유저 목록을 불러오지 못함:", err);
    throw new Error("유저 목록을 불러오지 못했습니다.");
  }
};
