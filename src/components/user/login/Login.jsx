/* 
    날짜 : 2024/11/26
    이름 : 최영진
    내용 : 홈 로그인 페이지생성

    추가내역
    -------------
    2024/11/27 박수정 - 로그인페이지 jsx 및 css 수정
    2024/12/03 이도영 - 로그인 기능 추가
*/

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../../../slices/UserSlice";
import { postUserLogin } from "../../../api/user/userAPI";


const initState = {
  userId: "",
  pass: "",
};
export default function Login() {
  const [user, setUser] = useState({ ...initState });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false); // 로그인 상태유지 체크박스 상태 관리

  // 로그인된 상태 자동 처리
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.accessToken) {
      dispatch(login(savedUser));
      navigate("/");
    } else {
      dispatch(logout());
    }
  }, [dispatch, navigate]);

  const changeHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });

  };

  const subMitHandler = async (e) => {
    e.preventDefault();
    console.log("전송 전 user 객체 확인:", user); // userId와 pass 값 확인
    const tokens = await postUserLogin(user);
    if (tokens) {

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(tokens));
        sessionStorage.removeItem("user"); // sessionStorage에서 삭제

      } else {
        sessionStorage.setItem("user", JSON.stringify(tokens));  // 토큰을 localStorage에 저장
        localStorage.removeItem("user"); // localStorage에서 삭제

      }

      dispatch(login(tokens));
      console.log("토큰:", tokens.accessToken);  // 정확하게 토큰을 출력
      console.log("리프레시 토큰:", tokens.refreshToken);  // 리프레시 토큰도 마찬가지
      navigate("/app/home");
    } else if(response.status === "정지된 회원입니다") {
      alert("정지된 회원입니다.");
    } else if(response.status === "탈퇴한 회원입니다") {
      alert("탈퇴한 회원입니다.");
    }
  };
  const handleRemember = (e) => {
    setRememberMe(e.target.checked); // 체크박스 상태 변경
  };
  return (
    <div className="login-container">
      <form onSubmit={subMitHandler}>
        <div className="loginImg">
          <div className="findHeader">
            <img src="/images/logo.png" alt="로그인 화면 이미지" />
            <h3>로그인으로 더 나은 서비스를 누리세요</h3>
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="userId"
                    placeholder="아이디 입력"
                    value={user.userId}
                    onChange={changeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td className="form-row">
                  <input
                    type="password"
                    name="pass"
                    placeholder="비밀번호 입력"
                    value={user.pass}
                    onChange={changeHandler}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="loginDiv">
            <div className="userFind">
              <input type="checkbox"
                value="기억하기"
                checked={rememberMe}
                onChange={handleRemember}
              />
              로그인 상태유지
              <Link to="/user/findId" className="findId">
                아이디찾기
              </Link>
              <Link to="/user/findPass" className="findPass">
                비밀번호찾기
              </Link>
              <div className="findPass">
                <Link to="/user/terms">회원가입</Link>
              </div>
            </div>
            <button className="loginBtn blueButton">로그인</button>
          </div>
        </div>
      </form>
    </div>
  );
}
