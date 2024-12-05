/*
    날짜 : 2024/12/03
    이름 : 이도영
    내용 : 관리자 백 API

    추가내역
    -------------
    2024/12/05 이도영 사용자 정보 수정,삭제
*/
import axios from "axios";
import {
  ADMIN_DELETE_USERS,
  ADMIN_UPDATE_USERS,
  ADMIN_USERLIST_INFO,
} from "../URI";

export const getAdminUserList = async (pg) => {
  try {
    const response = await axios.get(`${ADMIN_USERLIST_INFO}/${pg}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteAdminUserList = async (userIds) => {
  try {
    console.log("userIds : " + userIds);
    const response = await axios.delete(`${ADMIN_DELETE_USERS}`, {
      data: userIds, // 요청 데이터에 userIds 포함
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("삭제 API 호출 중 오류 발생:", error);
    throw error;
  }
};

export const updateAdminUsers = async (users) => {
  try {
    const response = await axios.put(`${ADMIN_UPDATE_USERS}`, users, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("수정 API 호출 중 오류 발생:", error);
    throw error;
  }
};
