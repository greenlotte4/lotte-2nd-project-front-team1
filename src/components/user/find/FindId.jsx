import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HpFind from "./HpFind";
import EmailFind from "./EmailFind";
import { findByEmail } from "../../../api/user/userAPI";

export default function FindId() {
  const [method, setMethod] = useState("hpFind");
  const [activeButton, setActiveButton] = useState("hpFind");
  const [isVerified, setIsVerified] = useState(false); // 인증 여부 상태
  const [email, setEmail] = useState(""); // email 상태 추가

  const navigate = useNavigate();

  const findHandle = (methodType) => {
    setMethod(methodType);
    setActiveButton(methodType); // 클릭된 버튼 상태 업데이트
  };
  useEffect(() => {
    console.log("isVerified 상태가 변경되었습니다:", isVerified);
  }, [isVerified]); // isVerified 값이 바뀔 때마다 실행
  useEffect(() => {
    console.log("현재 이메일 값:", email);
  }, [email]); // email 상태가 변경될 때마다 실행
  const handleFind = async (e) => {
    e.preventDefault();
    if (isVerified) {
      const response = await findByEmail(email);
      console.log("전달된 이메일 값:", email); // 이메일 값 확인

      if (response.status === 200) {
        navigate("/user/find/findView", {
          state: { method: "IdFind", findMethod: method , userId: response.data.userId},
        });
      } else {
        alert("이메일로 가입한 아이디가 없습니다..");
      }
    } else {
      alert("인증이 완료되어야 아이디를 찾을 수 있습니다.")
    }

  };


  return (
    <div>
      <form accept="">
        <div>
          <div className="findHeader">
            <img src="/images/logo.png" alt="로그인 화면 이미지" />
            <h3>아이디찾기 수단을 선택해주세요</h3>
          </div>
          <div className="searchBtn">
            <button
              className={`hpFind ${activeButton === "hpFind" ? "active" : ""}`}
              type="button"
              onClick={() => findHandle("hpFind")}
            >
              휴대폰 번호로 찾기
            </button>
            <button
              className={`emailFind  ${activeButton === "emailFind" ? "active" : ""
                }`}
              type="button"
              onClick={() => findHandle("emailFind")}
            >
              개인 이메일로 찾기
            </button>
          </div>
          <div
            className={`methodContent ${activeButton === "hpFind" ? "active" : ""
              }`}
          >
            {method === "hpFind" && <HpFind />}
          </div>

          <div
            className={`methodContent ${activeButton === "emailFind" ? "active" : ""
              }`}
          >
            {method === "emailFind" && <EmailFind setIsVerified={setIsVerified} setEmail={setEmail} />}
          </div>
        </div>
        <div className="findBtnBox">
          <Link to="/user/login" className="btnCancle">
            취소
          </Link>
          <button className="blueButton"
            onClick={handleFind}
            disabled={!isVerified} // 인증이 완료된 후에만 활성화
          >
            찾기
          </button>
        </div>
      </form>
    </div>
  );
}
