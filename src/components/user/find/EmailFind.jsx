import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { authEmail, sandEmail } from "../../../api/user/userAPI";

export default function EmailFind({ setIsVerified, setEmail }) {

  const [email, setEmailState] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 발송 여부 상태

  const emailHandle = (e) => {
    setEmailState(e.target.value);
  }
  const authCodeHandler = (e) => {
    setAuthCode(e.target.value);
  }

  const sendVerificationCode = async () => {
    // 이메일로 인증 번호 보내는 API 호출
    const response = await sandEmail(email); // email로 인증번호를 보내기
    console.log("서버 응답 상태:", response.status); // 응답 상태 확인

    if (response.status === 200) {
      setIsCodeSent(true); // 인증번호 발송 완료
      alert("인증번호가 발송되었습니다.");
    } else {
      alert("인증번호 발송 중 문제가 발생했습니다.");
    }
  };

  const verifyCode = async () => {
    const response = await authEmail(email, authCode)
    if (response.status === 200) {
      setIsVerified(true); // 인증 성공 시 부모 상태 업데이트
      setEmail(email)
      alert("인증이 완료 되었습니다.")
    } else {
      setIsVerified(false);
      alert("인증 번호가 다릅니다.")
    }
  }
  return (
    <div className="emailFindBox">
      <table>
        <tbody>
          <span>이메일</span>
          <tr>
            <td>
              <div className="form-row">
                <input type="email"
                  name="email"
                  placeholder="이메일입력"
                  value={email}
                  onChange={emailHandle}
                />
                <button
                  className="authBtn"
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={isCodeSent} // 번호가 발생되면 비활성화
                >인증번호 받기</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="form-row">
                <input type="text"
                  name="authCode"
                  placeholder="인증번호"
                  value={authCode} // 인증번호 상태 연결
                  onChange={authCodeHandler}
                />
                <button
                  className="authBtn"
                  type="button"
                  onClick={verifyCode}
                  disabled={!isCodeSent} // 인증번호 발송 후에만 인증 버튼 활성화
                >인증</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
