/*
    날짜 : 2024/12/03
    이름 : 이도영
    내용 : 관리자 백 API

    추가내역
    -------------
*/
import axios from "axios";
import { ADMIN_USERLIST_INFO } from "../URI";

export const getAdminUserList = async (pg) => {
  try {
    const response = await axios.get(`${ADMIN_USERLIST_INFO}/${pg}`);
    console.log("response.data : " + response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
