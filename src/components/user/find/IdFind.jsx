import { useState } from "react";
import { authEmail, checkUserId, sendVerificationWithIdAndEmail } from "../../../api/user/userAPI";

export default function IdFind({ setIsFormValid, setEmail, setUserId }) {

  const [email, setEmailState] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [userId, setUserIdState] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 발송 상태
  const emailHandle = (e) => {
    setEmailState(e.target.value);
  }
  const authCodeHandler = (e) => {
    setAuthCode(e.target.value);
  }
  const userIdHandler = (e) => {
    setUserIdState(e.target.value);
  }

  const checkUserIdHandler = async () => {
    const response = await checkUserId(userId);
    if (!response.data.isAvailable) {
      setIsFormValid((prev) => ({ ...prev, userIdVerified: true })); // 아이디 인증 완료
      setUserId(userId)
      console.log("아이디 :" + userId)
      alert("아이디 인증 완료")
    } else {
      setIsFormValid((prev) => ({ ...prev, userIdVerified: false }));
      alert("가입하신 아이디가 없습니다.")
    }
  }

  const sendVerificationCode = async () => {
    if (!userId || !email) {
      alert("아이디와 이메일을 모두 입력해주세요");
      return;
    }
    try {
      // 이메일로 인증 번호 보내는 API 호출
      const response = await sendVerificationWithIdAndEmail(userId, email); // email로 인증번호를 보내기
      console.log("서버 응답 상태:", response.status); // 응답 상태 확인

      if (response.status === 200) {
        setIsCodeSent(true); // 인증번호 발송 완료
        console.log(authCode);
        alert("인증번호가 발송되었습니다.");
        
      } else {
        alert("인증번호 발송 중 문제가 발생했습니다.");
      }
    } catch {
      alert("가입한 아이디와 이메일이 일치하지 않습니다.")
    }
  };

  const verifyCode = async () => {
    const response = await authEmail(email, authCode, userId)
    if (response.status === 200) {
      setIsFormValid((prev) => ({ ...prev, emailVerified: true })); // 이메일 인증 완료
      setEmail(email)
      alert("인증이 완료 되었습니다.")
    } else {
      setIsFormValid((prev) => ({ ...prev, emailVerified: false }));
      alert("인증 번호가 다릅니다.")
    }
  }

  return (
    <div className="findPassBox">
      <table>
        <tbody>
          <span>아이디</span>
          <tr>
            <td className="form-row">
              <input type="text"
                placeholder="아이디입력"
                onChange={userIdHandler}
              />
              <button type="button" onClick={checkUserIdHandler}>
                <img src="/images/check.svg" alt="중복확인" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <span>이메일</span>
          <tr>
            <td>
              <div className="form-row">
                <input type="text"
                  placeholder="이메일입력"
                  onChange={emailHandle}
                />
                <button
                  className="authBtn"
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={!userId || !email} // 아이디와 이메일이 입력되지 않으면 비활성화
                >
                  인증번호 받기
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="form-row">
                <input type="text"
                  placeholder="인증번호"
                  onChange={authCodeHandler}
                />
                <button
                  className="authBtn"
                  type="button"
                  onClick={verifyCode}
                  disabled={!authCode} // 인증번호가 입력되지 않으면 비활성화
                >
                  인증
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
