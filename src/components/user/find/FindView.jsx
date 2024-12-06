import { Link, useLocation } from "react-router-dom";
import IdView from "./IdView";
import PassView from "./NewPass";

export default function FindView() {
  const location = useLocation();
  console.log("메서드" + location.state);
  const { method, findMethod } = location.state || {}; // state에서 method와 findMethod를 추출
  return (
    <div>
      <div className="idViewBox">
        <div className="findHeader">
          <img src="/images/logo.png" alt="로그인 화면 이미지" />
          <h3>{method === "IdFind" ? "아이디 찾기 결과" : "비밀번호 변경"}</h3>
        </div>
        {method === "IdFind" && <IdView />}
        {method === "PassFind" && <PassView />}
      </div>
    </div>
  );
}
