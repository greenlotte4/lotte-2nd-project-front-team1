import { useState } from "react";
import ContactRow from "../../myPage/ContactRow";
import StatusMessage from "../../myPage/StatusMessage";
import EmailRow from "../../myPage/EmailRow";
import { useNavigate } from "react-router-dom";

export default function UserSetting() {
  const [isEditing, setIsEditing] = useState({ contact: false, email: false });
  const [contact, setContact] = useState("010-1234-5678");
  const [email, setEmail] = useState("hello@hubflow.com");

  const [statusMessage, setStatusMessage] = useState("오늘 하루도 열심히! 👏");
  const navigate = useNavigate();

  const changePassHandle = () => {
    navigate("/user/find/findView", { state: { method: "PassFind" } });
  };

  return (
    <div className="userSetting">
      {/* 개인 정보 섹션 */}
      <div>
        <table className="userInfoTable">
          <tbody>
            <tr>
              <td>이름</td>
              <td>이순신</td>
            </tr>
            <tr>
              <td>등급/결제일</td>
              <td>일반 / 2024-11-11</td>
            </tr>
            {/* 연락처 컴포넌트 */}
            <ContactRow contact={contact} setContact={setContact} />

            {/* 이메일 컴포넌트 */}
            <EmailRow email={email} setEmail={setEmail} />
            <tr>
              <td>가입 날짜</td>
              <td>2024-01-01</td>
            </tr>
            <tr>
              <td>최근 로그인</td>
              <td>2024-11-27</td>
            </tr>
            <StatusMessage
              statusMessage={statusMessage}
              setStatusMessage={setStatusMessage}
            />
          </tbody>
        </table>
        <div className="btnBox">
          <button onClick={changePassHandle}>비밀번호 변경</button>
          <button onClick={changePassHandle}>회원 탈퇴</button>
        </div>
      </div>
      <div className="imgBox">
        <div className="userImg">
          <h3>프로필사진</h3>
          <img src="/images/ic-profile.png" alt="프로필사진" />
          <button>프로필변경</button>
        </div>
      </div>
    </div>
  );
}
