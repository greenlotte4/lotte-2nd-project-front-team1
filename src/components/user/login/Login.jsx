/* 
    날짜 : 2024/11/26
    이름 : 최영진
    내용 : 홈 로그인 페이지생성

    추가내역
    -------------
    11.27 박수정 - 로그인페이지 jsx 및 css 수정
*/

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../slices/userSlice";
import { postUserLogin } from "../../../api/user/userAPI";

const initState = {
  uid: "",
  pass: "",
};
// 토큰이 아직 아보내져서 나중에 따로 다시 해야함
export default function Login() {
  const [user, setUser] = useState({ ...initState });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const subnitHandler = async (e) => {
    e.preventDefault();

    const tokens = await postUserLogin(user);
    if (tokens) {
      dispatch(login(tokens));
      navigate("/");
    } else {
      alert("로그인실패");
    }
  };
  
  return (
    <div className="login">
      <form onSubmit={subnitHandler}>
        <div>
            <h1>로그인</h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="uid"
                    placeholder="아이디 입력"
                    value={user.uid}
                    onChange={changeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
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
            <input type="checkbox" value="기억하기" />
            로그인 상태유지
            <div class="userFind">
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
