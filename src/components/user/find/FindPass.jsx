import { useState } from "react";
import { Link } from "react-router-dom";
import IdFind from "./IdFind";

export default function FindPass() {
    const handleSignup = () => {
        navigate("/user/find/idView"); // "회원가입" 버튼 클릭 시 "/user/signup"으로 이동
    };
    const [method, setMethod] = useState("hpFind");
    const findHandle = (methodType) => {
        setMethod(methodType);
    }
    return (
        <div class="findIdBox mainBox">
            <form accept="">
                <div>
                    <div class="findHeader">
                        <img src="/images/logo.png" alt="로그인 화면 이미지" />
                        <h3>비밀번호 찾기</h3>
                    </div>
                    <IdFind/> 
                </div>
                <div class="findBtnBox">
                    <Link to="/user/login" className="btnCancle">취소</Link>
                    <button class="blueButton">찾기</button>
                </div>
            </form>
        </div>
    );
}
