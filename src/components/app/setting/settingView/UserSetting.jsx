/*
    날짜 : 2024/11/25
    이름 : 최영진
    내용 : 세팅 사용자 정보

    추가내역
    -------------
    2024/12/03 이도영 사용자 정보 출력 일부
*/
import { useEffect, useState } from "react";
import ContactRow from "../../myPage/ContactRow";
import StatusMessage from "../../myPage/StatusMessage";
import EmailRow from "../../myPage/EmailRow";
import { useNavigate } from "react-router-dom";
import { getSettingUser } from "../../../../api/setting/SettingAPI";
import { useSelector } from "react-redux";

export default function UserSetting() {
  const [contact, setContact] = useState("010-1234-5678");
  const [email, setEmail] = useState("hello@hubflow.com");
  const [statusMessage, setStatusMessage] = useState("오늘 하루도 열심히! 👏");
  const changePassHandle = () => {
    navigate("/user/find/findView", { state: { method: "PassFind" } });
  };
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const user = useSelector((state) => state.userSlice);
  // 사용자 정보를 API로 가져오는 함수
  useEffect(() => {
    if (!user || !user.userid) {
      console.error("user.userid가 유효하지 않습니다:", user);
      return;
    }

    const fetchData = async () => {
      try {
        console.log("API 호출 userId:", user.userid);
        const response = await getSettingUser(user.userid);
        console.log("API 응답 데이터:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [user?.userid]);

  if (!userData) {
    return <p>사용자 정보를 불러오는 중...</p>;
  }

  return (
    <div className="userSetting">
      {/* 개인 정보 섹션 */}
      <div>
        <table className="userInfoTable">
          <tbody>
            <tr>
              <td>이름</td>
              <td>{userData.username}</td>
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
              <td>{userData.createdAt}</td>
            </tr>
            <tr>
              <td>최근 로그인</td>
              <td>{userData.updatedAt}</td>
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
