import { Link } from "react-router-dom";

export default function () {
    return (
        <div class="tarmsBox mainBox">
            <div class="tarmsText1">
                <h3>사이트 이용약관</h3>
                <textarea name="" id="" readonly>
                    대충 약관 내용
                </textarea>
                <div class="agreement">
                    <input type="checkbox" id="agree1" />
                    <label for="agree1">동의하기</label>
                </div>
            </div>
            <div class="tarmsText2">
                <h3>개인정보 취급방침</h3>
                <textarea name="" id="" readonly>
                    대충 약관 내용
                </textarea>
                <div class="agreement">
                    <input type="checkbox" id="agree2" />
                    <label for="agree2">동의하기</label>
                </div>
            </div>
            <div class="regiBtn">
                <Link to="/user/login" class="btnCancle">취소</Link>
                <Link to="/user/register" class="btnNext">확인</Link>
            </div>
        </div>
    );
}