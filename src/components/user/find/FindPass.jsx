import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IdFind from "./IdFind";

export default function FindPass() {
    const [method, setMethod] = useState(""); // method state 추가

    const navigate = useNavigate();
    const handleFind = (e) => {
        e.preventDefault();
        navigate("/user/find/findView", { state: { method: "PassFind", findMethod: method } });
    };
    return (
        <div className="findPassBox">
            <form accept="">
                <div>
                    <div class="findHeader">
                        <img src="/images/logo.png" alt="로그인 화면 이미지" />
                        <h3>비밀번호 찾기</h3>
                    </div>
                    <IdFind/> 
                </div>
                <div className="findBtnBox">
                    <Link to="/user/login" className="btnCancle">취소</Link>
                    <button class="blueButton" onClick={handleFind}>찾기</button>
                </div>
            </form>
        </div>
    );
}
