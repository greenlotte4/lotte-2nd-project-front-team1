/*
    날짜 : 2024/11/25
    이름 : 최영진
    내용 : 쿠키 저장

    추가내역
    -------------
    2024/12/03 이도영 쿠키 데이터 추가
*/
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const loadStateFromCookie = () => {
  const auth = JSON.parse(Cookies.get("auth") || null);
  const username = auth?.username;
  const role = auth?.role;
  const accessToken = auth?.accessToken;
  const userid = auth?.userid;
  const email = auth?.email;
  console.log(username);
  console.log(email);
  return { username, role, accessToken, userid, email };
};

const initState = {
  username: null,
  role: null,
  accessToken: null,
  userid: null,
  email: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: loadStateFromCookie() || initState, // 쿠키 값으로 리덕스 상태 초기화
  reducers: {
    login: (state, action) => {
      const data = action.payload;
      console.log("userSlice login data : " + JSON.stringify(data));

      // 리덕스 상태 초기화
      state.username = data.username;
      state.role = data.role;
      state.accessToken = data.accessToken;
      state.userid = data.userid;
      state.email = data.email;
      // 쿠키 저장(영구저장을 위해 쿠키 사용)
      Cookies.set("auth", JSON.stringify(data)); 
    },
    logout: (state) => {
      console.log("로그아웃...");

      // 상태 초기화

      state.username = null;
      state.role = null;
      state.accessToken = null;
      state.userid = null;
      state.email = null;
      // 쿠키 삭제
      Cookies.remove("auth");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
