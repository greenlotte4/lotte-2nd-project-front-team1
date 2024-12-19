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
import { loginStatus, postUserLogout } from "../api/user/userAPI";
const statusChange = async (state) => {
  await loginStatus(state); // 서버에 상태 변경 요청
};
const loadStateFromCookie = () => {
  const auth = Cookies.get("auth");
  if (!auth) return initState; // 쿠키가 없으면 초기 상태 반환
  const parsedAuth = JSON.parse(auth);
  const { username, role, accessToken, userid, email, profile } =
    parsedAuth || {};
  console.log(username, email, profile);
  return { username, role, accessToken, userid, email, profile };
};
const logoutid = async (userid) => {
  await postUserLogout(userid); // 서버에 상태 변경 요청
};
const initState = {
  username: null,
  role: null,
  accessToken: null,
  userid: null,
  email: null,
  profile: null,
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
      state.profile = data.profile;

      // 쿠키 저장(영구저장을 위해 쿠키 사용)
      Cookies.set("auth", JSON.stringify(data), {
        path: "/",
        sameSite: "strict",
      });
      statusChange("online");
    },
    logout: (state) => {
      console.log("로그아웃...");
      logoutid(state.userid);
      // 상태 초기화
      statusChange("logout");
      state.username = null;
      state.role = null;
      state.accessToken = null;
      state.userid = null;
      state.email = null;
      state.profile = null;

      // 쿠키 삭제
      Cookies.remove("auth", { path: "/" });
      localStorage.removeItem("user", { path: "/" });
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
