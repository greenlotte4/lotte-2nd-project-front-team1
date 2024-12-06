import { useState } from "react";
import { authEmail, sendVerificationWithIdAndEmail } from "../../../api/user/userAPI";

export default function IdFind() {

  const [emailState, setEmailState] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [userId, setUserId] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 발송 상태
  const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부 상태

  const emailHandle = (e) => {
    setEmailState(e.target.value);
  }
  const authCodeHandler = (e) => {
    setAuthCode(e.target.value);
  }
  const userIdHandler = (e) => {
    setUserId(e.target.value);
  }


  const sendVerificationCode = async () => {
    if (!userId || !emailState) {
      alert("아이디와 이메일을 모두 입력해주세요");
      return;
    }

    // 이메일로 인증 번호 보내는 API 호출
    const response = await sendVerificationWithIdAndEmail(userId, emailState); // email로 인증번호를 보내기
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
      alert("인증이 완료 되었습니다.")
    } else {
      setIsVerified(false);
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
                  disabled={!userId || !emailState} // 아이디와 이메일이 입력되지 않으면 비활성화
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
