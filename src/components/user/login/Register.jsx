import { Link } from "react-router-dom";

export default function () {

    
    return (
        <div>
            <form action="">
                <h2>사이트 이용정보 입력</h2>
                <table border="0">
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td class="input-with-button">
                                <input type="text" name="uid" placeholder="아이디 입력" />
                                <button type="button">
                                    <img src="./images/chk_id.gif" alt="중복확인" />
                                </button>
                                <span class="uidResult"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td class="input-without-button">
                                <input type="text" name="uid" placeholder="비밀번호 입력" />
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호확인</td>
                            <td class="input-without-button">
                                <input type="text" name="uid" placeholder="비밀번호 확인" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table border="0">
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td class="input-without-button">
                                <input type="text" name="uid" placeholder="이름 입력" />
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td class="input-with-button">
                                <input type="text" name="uid" placeholder="이메일 입력" />
                                <button type="button">
                                    <img src="./images/chk_auth.gif" alt="인증번호 받기" />
                                </button>
                                <div class="auth">
                                    <input type="text" name="auth" placeholder="인증번호 입력" />
                                    <button type="button">
                                        <img src="./images/chk_confirm.gif" alt="확인" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>휴대폰</td>
                            <td class="input-without-button">
                                <input type="text" name="uid" placeholder="전화번호 입력" />
                            </td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td class="">
                                <input
                                    type="text"
                                    name="zip"
                                    class="short-input"
                                    placeholder="우편번호"
                                />
                                <button type="button">
                                    <img src="./images/chk_post.gif" alt="우편번호찾기" />
                                </button>
                                <input
                                    type="text"
                                    name="addr1"
                                    class="long-input"
                                    placeholder="주소 검색"
                                />
                                <input
                                    type="text"
                                    name="addr2"
                                    class="long-input"
                                    placeholder="상세주소 입력"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="regiBtn">
                    <Link to="/user/login" class="btnCancle">
                        취소
                    </Link>
                    <input type="submit" value="회원가입" class="blueButton" />
                </div>
            </form>
        </div>
    );
}