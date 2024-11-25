import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HpFind from "./hpFind";
import EmailFind from "./EmailFind";

export default function FindId() {
    const [method, setMethod] = useState("hpFind");
    const [activeButton, setActiveButton] = useState("hpFind");
    const navigate = useNavigate();

    const findHandle = (methodType) => {
        setMethod(methodType);
        setActiveButton(methodType); // 클릭된 버튼 상태 업데이트
    }

    const handleFind = (e) => {
        e.preventDefault();
        navigate("/user/find/findView", { state: { method: "IdFind", findMethod: method } });
    };
    return (
        <div>
            <form accept="">
                <div>
                    <div className="findHeader">
                        <img src="/images/logo.png" alt="로그인 화면 이미지" />
                        <h3>ID찾기 수단을 선택해주세요</h3>
                    </div>
                    <div className="searchBtn">
                        <button className={`hpFind ${activeButton === "hpFind" ? "active" : ""}`}
                            type="button"
                            onClick={() => findHandle("hpFind")}>휴대폰 번호로 찾기</button>
                        <button className={`emailFind  ${activeButton === "emailFind" ? "active" : ""}`}
                            type="button"
                            onClick={() => findHandle("emailFind")}>개인 이메일로 찾기</button>
                    </div>
                    <div className={`methodContent ${activeButton === "hpFind" ? "active" : ""}`}>
                        {method === "hpFind" && <HpFind />}
                    </div>

                    <div className={`methodContent ${activeButton === "emailFind" ? "active" : ""}`}>
                        {method === "emailFind" && <EmailFind />}
                    </div>
                </div>
                <div className="findBtnBox">
                    <Link to="/user/login" className="btnCancle">취소</Link>
                    <button className="blueButton" onClick={handleFind}>찾기</button>                </div>
            </form>
        </div>
    );
}
