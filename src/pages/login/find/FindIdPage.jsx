/* 
    날짜 : 2024/11/26
    이름 : 최영진
    내용 : 아이디찾기 페이지 생성

    추가내역
    -------------
    11.27 박수정 - 헤더추가
*/
import "../../../styles/Login.scss";
import FindId from "../../../components/user/find/FindId";
import Header from "../../../components/main/Header";

export default function FindIdPage() {
  return (
    <div className="LoginPage">
      <Header />
      <section className="loginBody">
        <div className="findBox mainBox">
          <FindId />
        </div>
      </section>
    </div>
  );
}
