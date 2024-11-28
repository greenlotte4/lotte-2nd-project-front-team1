import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IdFind from "./IdFind";

export default function FindPass() {
  const [method, setMethod] = useState(""); // method state 추가

  const navigate = useNavigate();

  const changePassHandle = () => {
    navigate("/user/find/findView", { state: { method: "PassFind" } });
  }
  return (
    <div className="findPassBox">
      <form accept="">
        <div>
          <div className="findHeader">
            <img src="/images/logo.png" alt="로그인 화면 이미지" />
            <h3>비밀번호를 잊으셨나요?</h3>
          </div>
          <IdFind />
        </div>
        <div className="findBtnBox">
          <Link to="/user/login" className="btnCancle">
            취소
          </Link>
          <button className="blueButton" onClick={changePassHandle}>
            찾기
          </button>
        </div>
      </form>
    </div>
  );
}
