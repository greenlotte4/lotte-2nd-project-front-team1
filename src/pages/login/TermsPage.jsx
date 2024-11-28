/* 
    날짜 : 2024/11/26
    이름 : 최영진
    내용 : 이용약관 페이지 생성

    추가내역
    -------------
    11.27 박수정 - 헤더추가
*/
import Header from "../../components/main/Header";
import Terms from "../../components/user/login/Terms";
import "../../styles/Login.scss";

export default function TermsPage() {
  return (
    <div className="LoginPage">
      <Header />
      <section className="loginBody">
        <div className="termsBox mainBox">
          <Terms />
        </div>
      </section>
    </div>
  );
}
