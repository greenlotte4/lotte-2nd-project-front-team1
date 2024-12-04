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
import PostSearchPopup from "./PostSearchPopup";
import { Password } from "@mui/icons-material";


const initState = {
    userId: "",
    pass: "",
    username: "",
    email: "",
    hp: "",
    role:"USER",
    status:"NORMAL",
    zipcode: null,
    addr1: null,
    addr2: null,
}
export default function Register() {

    const navigate = useNavigate();
    const [user, setUser] = useState({ ...initState });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [authCode, setAuthCode] = useState("");
    const [pass2, setPass2] = useState("");
    const [pass, setPass] = useState("");

    const [userId, setUserId] = useState(false);
    const [emailAutn, setEmailAuth] = useState(false)
    const [isPostcodePopupOpen, setIsPostcodePopupOpen] = useState(false);  // 우편번호 팝업 상태 관리
    const [passValid, setPassValid] = useState(false);

    const validatePass = (Password) => {
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passRegex.test(Password);
    }


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
        if (name === "pass") {
            setPass(value);
            setPassValid(validatePass(value)); // 비밀번호 유효성 체크
            // 비밀번호가 일치하는지 확인
            if (value === pass2) {
                setPasswordMatch(true); // 일치하면 true
            } else if (pass2) {
                setPasswordMatch(false); // 일치하지 않으면 false
            }
        } else if (name === "pass2") {
            setPass2(value);
            // 비밀번호가 일치하는지 확인
            if (pass === value) {
                setPasswordMatch(true); // 일치하면 true
            } else if (value) {
                setPasswordMatch(false); // 일치하지 않으면 false
            }
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
    // 우편번호 팝업 열기
    const openPostcodePopup = () => {
        setIsPostcodePopupOpen(true);
        console.log("레지스터에서 요청");
    };

    // 우편번호 검색 후 부모 컴포넌트로 데이터 전달
    const handlePostcodeSearchComplete = ({ zonecode, address }) => {
        setUser({
            ...user,
            zipcode: zonecode,
            addr1: address,
        });
        setIsPostcodePopupOpen(false);  // 팝업 닫기
    };
    // 팝업 닫기
    const closePostcodePopup = () => {
        console.log("우편번호 팝업 닫기");
        setIsPostcodePopupOpen(false);  // 팝업 닫기
    };
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
                                        display:"block",
                                        color: passwordMatch ? "green" : "red",
                                        fontSize: "12px",
                                    }}
                                >
                                    {passValid && passwordMatch
                                        ? "비밀번호가 일치합니다."
                                        : passValid
                                            ? "비밀번호는 유효하나 일치하지 않습니다."
                                            : "비밀번호 특수문자/영문 대소문자 구별없이 8글자 이상 입력."}
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
                    </tbody>
                </table>
                <table border="0">
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td className="input-without-button">
                                <input type="text"
                                    name="username"
                                    placeholder="이름 입력"
                                    value={user.username}
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
                                {emailAutn && (
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
                                )}
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
                                    name="zipcode"
                                    className="short-input"
                                    placeholder="우편번호"
                                    value={user.zipcode}
                                    onChange={changeHandler}
                                />
                                <button type="button" onClick={openPostcodePopup}>
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
                    <input type="submit"
                        value="회원가입"
                        className="blueButton"
                        onClick={(e) => {
                            if (!emailAutn || !passwordMatch || !userId) {
                                e.preventDefault(); // 기본 동작을 막기
                                alert("아이디 중복체크, 이메일 인증을 완료 해주세요!");
                            }
                        }}
                    />
                </div>
            </form>
            {isPostcodePopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <PostSearchPopup
                            onSearchComplete={handlePostcodeSearchComplete}
                            onClose={closePostcodePopup}  // 부모에서 전달한 onClose 호출
                        />
                    </div>
                </div>
            )}
        </div>
    );
}