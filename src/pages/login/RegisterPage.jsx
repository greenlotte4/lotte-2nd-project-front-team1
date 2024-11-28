/* 
    날짜 : 2024/11/26
    이름 : 최영진
    내용 : 회원가입 페이지 생성

    추가내역
    -------------
    11.27 박수정 - 헤더추가
*/
import Header from "../../components/main/Header";
import Register from "../../components/user/login/Register";
import "../../styles/Login.scss";

export default function RegisterPage() {
  return (
    <div className="LoginPage">
      <Header />
      <section className="loginBody">
        <div className="registerBox mainBox">
          <Register />
        </div>
      </section>
    </div>
  );
}
