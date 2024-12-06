/*

    날짜 : 2024/11/25
    이름 : 최영진
    내용 : 회원가입 

    추가내역
    2024-12-03 최영진 유효성 추가, 우편검색

*/
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authEmail, checkEmail, checkPhoneNumber, checkUserId, postUser, sandEmail } from "../../../api/user/userAPI";
import PostSearchPopup from "./PostSearchPopup";
import { Password } from "@mui/icons-material";


const initState = {
    userId: "",
    pass: "",
    username: "",
    email: "",
    hp1: "",
    hp2: "",
    hp3: "",
    role: "USER",
    status: "NORMAL",
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
    const [isPhoneValid, setIsPhoneValid] = useState(true)
    const [isPhoneAvailable, setIsPhoneAvailable] = useState(true)
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
        const isEmailAvailable = await checkEmail(user.email);
        if (isEmailAvailable) {
            const response = await sandEmail(user.email)
            if (response.status === 200) {
                setEmailAuth(true);
                alert("인증번호가 발송되었습니다.")
            } else {
                setEmailAuth(false);

                alert("인증 번호 발송중 문제 발생.")
            }
        } else {
            setEmailAuth(false);
            alert("이미 사용 중인 이메일 입니다.")
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
        let updatedValue = value;

        // 숫자만 입력되도록 처리
        if (name === "hp1" || name === "hp2" || name === "hp3") {
            updatedValue = value.replace(/\D/g, ''); // 숫자 이외의 문자는 제거
        }
        const updatedUser = { ...user, [name]: updatedValue };

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

        // 휴대폰 번호 입력 시, 숫자만 입력되도록 하고 길이에 맞춰 포커스를 이동
        if (name === "hp1" && updatedValue.length === 3) {
            document.querySelector('[name="hp2"]').focus();
        } else if (name === "hp2" && updatedValue.length === 4) {
            document.querySelector('[name="hp3"]').focus();
        }

        if (name === "hp1" || name === "hp2" || name === "hp3") {
            const fullPhoneNumber = `${updatedUser.hp1}-${updatedUser.hp2}-${updatedUser.hp3}`;
            updatedUser.hp = fullPhoneNumber;
        }
    }
    const handlePhoneBlur = async (e) => {
        const { hp1, hp2, hp3 } = user;
        if (e.target.name === "hp3") {
            // 휴대폰 번호가 모두 입력되었을 때만 중복 체크
            if (hp1 && hp2 && hp3) {
                const fullPhoneNumber = `${hp1}-${hp2}-${hp3}`;
                const response = await checkPhoneNumber(fullPhoneNumber);

                if (!response.isAvailable) {
                    setIsPhoneAvailable(true); // 번호가 사용 가능하면 true
                    setIsPhoneValid(true);  // 번호가 유효하면 true
                } else {
                    setIsPhoneAvailable(false);
                    setIsPhoneValid(false);
                }
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
    };


    // 팝업 닫기
    const closePostcodePopup = () => {
        console.log("우편번호 팝업 닫기");
        setIsPostcodePopupOpen(false);  // 팝업 닫기
    };
    const isAnyInputFilled = user.hp1 || user.hp2 || user.hp3;  // 전화번호 입력란에 값이 있으면 true


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
                                    placeholder="비밀번호 입력"
                                    value={user.pass}
                                    onChange={changeHandler} />
                                <span
                                    style={{
                                        display: "block",
                                        color: !passValid || !passwordMatch ? "red" : "green",  // 기본 빨간색, 조건 맞으면 초록색
                                        fontSize: "12px",
                                    }}
                                >
                                    {passValid
                                        ? passwordMatch
                                            ? "비밀번호가 일치합니다."
                                            : "비밀번호는 유효하나 일치하지 않습니다."
                                        : "비밀번호 특수문자/영문 대소문자 구별없이 8글자 이상 입력."}
                                </span>
                            </td>

                        </tr>
                        <tr>
                            <td>비밀번호확인</td>
                            <td className="input-with-button">
                                <input type="password"
                                    name="pass2"
                                    placeholder="비밀번호 입력"
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
                                <div className="ponnum">
                                    <input type="text"
                                        name="hp1"
                                        placeholder="010"
                                        value={user.hp1}
                                        onChange={changeHandler}
                                        maxLength={3} />
                                    <span>-</span>
                                    <input type="text"
                                        name="hp2"
                                        placeholder="0000"
                                        value={user.hp2}
                                        onChange={changeHandler}
                                        maxLength={4} />
                                    <span>-</span>
                                    <input type="text"
                                        name="hp3"
                                        placeholder="0000"
                                        value={user.hp3}
                                        onChange={changeHandler}
                                        maxLength={4}
                                        onBlur={handlePhoneBlur} />
                                </div>
                                {/* 조건에 따라 span을 보여주기 */}
                                {isAnyInputFilled && !isPhoneValid && (
                                    <span style={{ color: "red" }}>이미 사용중인 번호입니다.</span>
                                )}
                                {isAnyInputFilled && isPhoneValid && isPhoneAvailable && (
                                    <span style={{ color: "green" }}>사용 가능한 번호입니다.</span>
                                )}
                            </td>

                        </tr>
                        <tr>
                            <td>주소</td>
                            <td className="">
                                <input readOnly
                                    type="text"
                                    name="zipcode"
                                    className="short-input"
                                    placeholder="우편번호"
                                    value={user.zipcode}
                                />
                                <button type="button" onClick={openPostcodePopup}>
                                    <img src="/images/search.svg" alt="우편번호찾기" />
                                </button>

                                <input readOnly
                                    type="text"
                                    name="addr1"
                                    className="long-input"
                                    placeholder="주소 검색"
                                    value={user.addr1}
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
                            if (!emailAutn || !passwordMatch || !userId || !isPhoneValid) {
                                e.preventDefault(); // 기본 동작을 막기
                                alert("모든 필드입력 /아이디 중복체크, 이메일 인증을 완료 해주세요!");
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
                            onClose={closePostcodePopup}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}