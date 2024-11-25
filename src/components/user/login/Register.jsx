import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postUser } from "../../../api/user/userAPI";

const initState = {
    uid: "",
    pass1: "",
    pass2: "",
    name: "",
    email: "",
    hp: "",
    zip: null,
    addr1: null,
    addr2: null,
}
export default function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ ...initState });

    const chabgeHandler = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
        // pass1과 pass2 비교
        if (name === "pass1" || name === "pass2") {
            if (user.pass1 !== user.pass2) {
                setError("비밀번호가 일치하지 않습니다.");
            } else {
                setError(""); // 일치하면 오류 메시지 제거
            }
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const savedUser = postUser(user);

        if (savedUser) {
            alert("회원가입이 완료되었습니다.")
            navigate("/user/login");
        } else {
            alert("회원가입이 실패 했습니다.")
        }
    }

    return (
        <div classNameName="register">
            <form onSubmit={submitHandler}>
                <h2>사이트 이용정보 입력</h2>
                <table border="0">
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td className="input-with-button">
                                <input type="text"
                                    name="uid"
                                    placeholder="아이디 입력"
                                    value={user.uid}
                                    onChange={chabgeHandler} />
                                <button type="button">
                                    <img src="./images/chk_id.gif" alt="중복확인" />
                                </button>
                                <span className="uidResult"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td className="input-without-button">
                                <input type="pass"
                                    name="pass1"
                                    placeholder="비밀번호 입력"
                                    value={user.pass1}
                                    onChange={chabgeHandler} />
                            </td>
                            <span style={{ color: passwordMatch ? 'green' : 'red' }}>
                                {passwordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                            </span>
                        </tr>
                        <tr>
                            <td>비밀번호확인</td>
                            <td className="input-without-button">
                                <input type="pass"
                                    name="pass2"
                                    placeholder="비밀번호 확인"
                                    value={user.pass2}
                                    onChange={chabgeHandler}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table border="0">
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td className="input-without-button">
                                <input type="text"
                                    name="name"
                                    placeholder="이름 입력"
                                    value={user.name}
                                    onChange={chabgeHandler} />
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td className="input-with-button">
                                <input type="email"
                                    name="email"
                                    placeholder="이메일 입력"
                                    value={user.email}
                                    onChange={chabgeHandler} />
                                <button type="button">
                                    <img src="./images/chk_auth.gif" alt="인증번호 받기" />
                                </button>
                                <div className="auth">
                                    <input type="text"
                                        name="auth"
                                        placeholder="인증번호 입력"
                                        value={user.uid}
                                        onChange={chabgeHandler} />
                                    <button type="button">
                                        <img src="./images/chk_confirm.gif" alt="확인" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>휴대폰</td>
                            <td className="input-without-button">
                                <input type="text"
                                    name="hp"
                                    placeholder="전화번호 입력"
                                    value={user.hp}
                                    onChange={chabgeHandler} />
                            </td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td className="">
                                <input
                                    type="text"
                                    name="zip"
                                    className="short-input"
                                    placeholder="우편번호"
                                    value={user.zip}
                                    onChange={chabgeHandler}
                                />
                                <button type="button">
                                    <img src="./images/chk_post.gif" alt="우편번호찾기" />
                                </button>
                                <input
                                    type="text"
                                    name="addr1"
                                    className="long-input"
                                    placeholder="주소 검색"
                                    value={user.addr1}
                                    onChange={chabgeHandler}
                                />
                                <input
                                    type="text"
                                    name="addr2"
                                    className="long-input"
                                    placeholder="상세주소 입력"
                                    value={user.addr2}
                                    onChange={chabgeHandler}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="regiBtn">
                    <Link to="/user/login" className="btnCancle">
                        취소
                    </Link>
                    <input type="submit" value="회원가입" className="blueButton" />
                </div>
            </form>
        </div>
    );
}