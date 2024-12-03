/*

    날짜 : 2024/11/25
    이름 : 최영진
    내용 : 회원가입 

    추가내역
    2024-12-03 최영진 유효성 추가, 우편검색

*/
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authEmail, checkUserId, postUser, sandEmail } from "../../../api/user/userAPI";
import DaumPostModal from './DaumPostModal'; // DaumPostModal 컴포넌트 임포트

const initState = {
    userId: "",
    pass: "",
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
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [authCode, setAuthCode] = useState("");
    const [pass2, setPass2] = useState("");
    const [userId, setUserId] = useState(false);
    const [emailAutn, setEmailAuth] = useState(false)
    const [modalState, setModalState] = useState(false);

    const onAddressSelect = (data) => {
        setUser({
            ...user,
            zip: data.zonecode,
            addr1: data.address,
            addr2: ''
        });
        toggleModal();
    }

    // 모달 상태 토글 함수
    const toggleModal = () => {

        setModalState(prevState => !prevState);
    };

    const checkUserIdHandler = async () => {
        const response = await checkUserId(user.userId);
        if (!response.data.isAvailable) {
            setUserId(false); // 중복
            alert("이미 사용중인 아이디입니다")
        } else {
            setUserId(true) // 사용가능
            alert("사용가능 한 아이디입니다")
        }
    }
    const sandEmailHandler = async () => {
        const response = await sandEmail(user.email)
        if (response.status === 200) {
            setEmailAuth(true);
            alert("인증번호가 발송되었습니다.")
        } else {
            setEmailAuth(false);
            alert("인증 번호 발송중 문제 발생.")
        }
    }
    const authEmailHandler = async () => {
        const response = await authEmail(user.email, authCode)
        if (response.status === 200) {
            alert("인증이 완료 되었습니다.")
        } else {
            alert("인증 번호가 다릅니다.")
        }
    }
    const changeHandler = (e) => {
        const { name, value } = e.target;
        const updatedUser = { ...user, [name]: value };
        setUser(updatedUser);
        // pass과 pass2 비교
        if (name === "pass2") {
            setPass2(value);
            // pass과 pass2 비교
            if (user.pass !== value) {
                setPasswordMatch(false); // 일치하지 않으면 false
            } else {
                setPasswordMatch(true);  // 일치하면 true
            }
        } else {
            const updatedUser = { ...user, [name]: value };
            setUser(updatedUser);
        }

        if (name === "auth") {
            setAuthCode(value);  // 인증번호 상태 업데이트
        }
    }

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
        <div className="register">
            <form onSubmit={submitHandler}>
                <h2>사이트 이용정보 입력</h2>
                <table border="0">
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td className="input-with-button">
                                <input type="text"
                                    name="userId"
                                    placeholder="아이디 입력"
                                    value={user.userId}
                                    onChange={changeHandler} />
                                <button type="button" onClick={checkUserIdHandler}>
                                    <img src="/images/check.svg" alt="중복확인" />
                                </button>
                                <span className="uidResult"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td className="input-with-button">
                                <input type="password"
                                    name="pass"
                                    placeholder="비밀번호 특수문자/영문 대소문자 구별없이 8글자 이상 입력"
                                    value={user.pass}
                                    onChange={changeHandler} />
                                <span
                                    style={{
                                        color: passwordMatch ? "green" : "red",
                                        fontSize: "12px",
                                    }}
                                >
                                    {passwordMatch
                                        ? " 일치합니다."
                                        : " 일치하지 않습니다."}
                                </span>
                            </td>

                        </tr>
                        <tr>
                            <td>비밀번호확인</td>
                            <td className="input-with-button">
                                <input type="password"
                                    name="pass2"
                                    placeholder="비밀번호 특수문자/영문 대소문자 구별없이 8글자 이상 재입력"
                                    value={pass2}
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                        <tr>

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
                                    onChange={changeHandler} />
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td className="input-with-button">
                                <input type="email"
                                    name="email"
                                    placeholder="이메일 입력"
                                    value={user.email}
                                    onChange={changeHandler} />
                                <button type="button" onClick={sandEmailHandler}>
                                    <img src="/images/check.svg" alt="인증번호 받기" />
                                </button>
                                <div className="auth">
                                    <input type="text"
                                        name="auth"
                                        placeholder="인증번호 입력"
                                        value={authCode}
                                        onChange={changeHandler} />
                                    <button type="button" onClick={authEmailHandler}>
                                        <img src="/images/check.svg" alt="확인" />
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
                                    onChange={changeHandler} />
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
                                    onChange={changeHandler}
                                />
                                <button type="button" onClick={toggleModal}>
                                    <img src="/images/search.svg" alt="우편번호찾기" />
                                </button>
                                <input
                                    type="text"
                                    name="addr1"
                                    className="long-input"
                                    placeholder="주소 검색"
                                    value={user.addr1}
                                    onChange={changeHandler}
                                />
                                <input
                                    type="text"
                                    name="addr2"
                                    className="long-input"
                                    placeholder="상세주소 입력"
                                    value={user.addr2}
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="regiBtn">
                    <Link to="/user/login" className="btnCancle">
                        취소
                    </Link>
                    <input type="submit" value="회원가입" className="blueButton" disabled={!emailAutn || !passwordMatch || !userId} />
                </div>
            </form>
            {/* 모달을 modalState가 true일 때만 보이도록 렌더링 */}
            {modalState && <DaumPostModal toggleModal={toggleModal} onAddressSelect={onAddressSelect} />}
        </div>
    );
}