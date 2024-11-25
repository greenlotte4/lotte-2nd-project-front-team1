import { Link } from "react-router-dom";

export default function () {
    return (
        <div class="loginBox mainBox">
            <div class="loginImg">
                <img src="/images/logo.png" alt="로그인 화면 이미지" />
            </div>
            <form action="#">
                <div>
                    <table>
                        <tr>
                            <td>
                                <img src="/images/user_Icon.png" alt="아이디" />
                            </td>
                            <td>
                                <input type="text" name="uid" placeholder="아이디 입력" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="/images/avatar_9435200.png" alt="비밀번호" />
                            </td>
                            <td>
                                <input
                                    type="password"
                                    name="pass"
                                    placeholder="비밀번호 입력"
                                />
                            </td>
                        </tr>
                    </table>
                    <div class="loginDiv">
                        <input type="checkbox" value="기억하기" />기억하기
                        <div class="userFind">
                            <Link to="/user/findId" className="findId">아이디찾기</Link>
                            <Link to="/user/findPass" className="findPass">비밀번호찾기</Link>
                            <div className="findPass"><Link to="/user/terms">회원가입</Link></div>
                        </div>
                        <button class="loginBtn blueButton">로그인</button>
                    </div>
                </div>
            </form>
        </div>

    );
}