import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IdFind from "./IdFind";

export default function FindPass() {
  const [method, setMethod] = useState(""); // method state 추가
  const [isFormValid, setIsFormValid] = useState({ userIdVerified: false, emailVerified: false }); // 하나의 상태로 인증 관리

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isFormValid 상태가 변경되었습니다:", isFormValid);
  }, [isFormValid]); // isFormValid 값이 바뀔 때마다 실행
  useEffect(() => {
    console.log("userId 값:", userId); // userId 값이 제대로 업데이트되는지 확인
  }, [userId]); // userId 상태가 바뀔 때마다 실행
  const changePassHandle = async (e) => {
    e.preventDefault();
    console.log("클릭됨")
    if (isFormValid.userIdVerified && isFormValid.emailVerified) {
      console.log("보낼꺼 : " + email + userId)
      navigate("/user/find/findView", { state: { method: "PassFind", email, userId } });


    } else {
      alert("인증이 완료되어야 비밀번호를 찾을 수 있습니다.")
    }
  }


  return (
    <div className="findPassBox">
      <form>
        <div>
          <div className="findHeader">
            <img src="/images/logo.png" alt="로그인 화면 이미지" />
            <h3>비밀번호를 잊으셨나요?</h3>
          </div>
          <IdFind
            setIsFormValid={setIsFormValid}
            setEmail={setEmail}
            setUserId={setUserId}
          />
        </div>
        <div className="findBtnBox">
          <Link to="/user/login" className="btnCancle">
            취소
          </Link>
          <button
            type="submit"
            className="blueButton"
            onClick={changePassHandle}
          >
            찾기
          </button>
        </div>
      </form>
    </div>
  );
}
