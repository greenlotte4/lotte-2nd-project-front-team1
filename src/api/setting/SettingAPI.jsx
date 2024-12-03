/*
    날짜 : 2024/12/03
    이름 : 이도영
    내용 : 세팅 백 API

    추가내역
    -------------
*/
import axios from "axios";
import { SETTING_USER_INFO } from "../URI";

export const getSettingUser = async (userid) => {
  try {
    const response = await axios.get(`${SETTING_USER_INFO}/${userid}`);
    console.log("response.data : " + response.data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
