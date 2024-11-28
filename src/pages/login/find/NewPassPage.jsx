/* 
    날짜 : 2024/11/26
    이름 : 최영진
    내용 : 비밀번호 변경페이지 생성

    추가내역
    -------------
    11.27 박수정 - 헤더추가
*/
import Header from "../../../components/main/Header";
import "../../../styles/Login.scss";

export default function NewPassPage() {
  return (
    <div className="LoginPage">
      <Header />
      <section className="loginBody">
        <div className="findBox mainBox">
          <NewPass />
        </div>
      </section>
    </div>
  );
}
