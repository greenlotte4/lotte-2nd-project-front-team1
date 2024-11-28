/* 
    날짜 : 2024/11/26
    이름 : 최영진
    내용 : 찾기결과 페이지 생성

    추가내역
    -------------
    11.27 박수정 - 헤더추가
*/
import Header from "../../../components/main/Header";
import IdView from "../../../components/user/find/FindView";
import "../../../styles/Login.scss";

export default function FindViewPage() {
  return (
    <div className="LoginPage">
      <Header />
      <section className="loginBody">
        <div className="findBox mainBox">
          <IdView />
        </div>
      </section>
    </div>
  );
}
