import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HpFind from "./hpFind";
import EmailFind from "./EmailFind";

export default function FindId() {
    const [method, setMethod] = useState("hpFind");
    const navigate = useNavigate();
    const findHandle = (methodType) => {
        setMethod(methodType);
    }

    const handleFind = (e) => {
        e.preventDefault();
        navigate("/user/find/idView"); // "회원가입" 버튼 클릭 시 "/user/signup"으로 이동
    };
    return (
        <div class="findIdBox mainBox">
            <form accept="">
                <div>
                    <div className="findHeader">
                        <img src="/images/logo.png" alt="로그인 화면 이미지" />
                        <h3>ID찾기 수단을 선택해주세요</h3>
                    </div>
                    <div className="searchBtn">
                        <button className="hpFind"
                            type="button"
                            onClick={() => findHandle("hpFind")}>휴대폰 번호로 찾기</button>
                        <button className="emailFind"
                            type="button"
                            onClick={() => findHandle("EmailFind")}>개인 이메일로 찾기</button>
                    </div>
                    {method === "hpFind" && <HpFind />}
                    {method === "EmailFind" && <EmailFind />}
                </div>
                <div className="findBtnBox">
                    <Link to="/user/login" className="btnCancle">취소</Link>
                    <button className="blueButton" onClick={handleFind}>찾기</button>                </div>
            </form>
        </div>
    );
}
