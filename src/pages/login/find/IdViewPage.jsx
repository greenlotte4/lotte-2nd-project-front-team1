/* 
    날짜 : 2024/11/26
    이름 : 최영진
    내용 : 아이디찾기 결과페이지 생성

    추가내역
    -------------
    11.27 박수정 - 헤더추가
*/
import Header from "../../../components/main/Header";
import IdView from "../../../components/user/find/IdView";
import "../../../styles/Login.scss";

export default function IdViewPage() {
  return (
    <div className="LoginPage">
      <Header />
      <section className="loginBody">
        <div className="findBox">
          <IdView />
        </div>
      </section>
    </div>
  );
}
