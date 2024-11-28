/* 
    날짜 : 2024/11/26
    이름 : 최영진
    내용 : 로그인 페이지 생성

    추가내역
    -------------
    11.27 박수정 - 헤더추가
*/

import Header from "../../components/main/Header";
import Login from "../../components/user/login/Login";
import "../../styles/Login.scss";

export default function LoginPage() {
  return (
    <div className="LoginPage">
      <Header />
      <section className="loginBody">
        <div className="loginBox mainBox">
          <Login />
        </div>
      </section>
    </div>
  );
}
