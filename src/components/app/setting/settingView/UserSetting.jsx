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
import { deleteuser, uploadProfile } from "../../../../api/user/userAPI";
import { SERVER_HOST } from "../../../../api/URI";
import axios from "axios";

export default function UserSetting() {
  const changePassHandle = () => {
    const confirmChange = window.confirm("비밀번호 변경을 하시겠습니까?");

    if (confirmChange) {
      navigate("/user/find/findView", { state: { method: "PassFind" } });
    }
  };
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const user = useSelector((state) => state.userSlice);
  const [hp, setHp] = useState("");
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false); // 업로드 상태 관리

  const [imageUrl, setImageUrl] = useState(""); // 기본 프로필 이미지 URL


  // 사용자 정보를 API로 가져오는 함수
  useEffect(() => {
    if (!user || !user.userid) {
      console.error("user.userid가 유효하지 않습니다:", user);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await getSettingUser(user.userid);
        console.log("API 응답 데이터:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchData();
  }, [user?.userid]);


  useEffect(() => {
    if (userData) {
      console.log("userData 변경됨", userData);
      setHp(userData.hp || "");
      setEmail(userData.email || "");
      setStatusMessage(userData.statusMessage || "");
      setImageUrl(userData.imageUrl || userData.profile);

      console.log("userData profile : ", userData.profile);
    }

  }, [userData]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // 사용자가 선택한 파일
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("profileImage", file); // 서버로 파일 전송

      try {
        const imageUrl = await uploadProfile(formData);  // 업로드된 이미지 URL을 받아옴
        if (imageUrl) {
          console.log('파일 업로드 성공:', imageUrl);
          setImageUrl(imageUrl);  // imageUrl 상태 업데이트
          setUserData((prevData) => ({
            ...prevData,
            imageUrl: imageUrl, // userData에 새로 업로드된 이미지 URL 반영
          }));
          console.log(setUserData)
          localStorage.setItem("userProfileImage", imageUrl);  // 로컬 스토리지에 저장
          alert("프로필 사진이 변경되었습니다.");
          window.location.reload()
        } else {
          alert("프로필 사진 변경에 실패했습니다.");
        }
      } catch (error) {
        console.error("업로드 중 오류 " + error);
        alert("프로필 사진 업로드 중 오류가 발생했습니다.");
      } finally {
        setIsUploading(false);  // 업로드 완료 후 상태 종료
      }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0]; // "2024-12-03T08:45:26.000+00:00" → "2024-12-03"
  };
  if (!userData) {
    return <p>사용자 정보를 불러오는 중...</p>;
  }
  const deleteHandle = async (e) => {
    const confirmDelete = window.confirm("회원을 탈퇴 하시겠습니까?"); // 사용자에게 삭제 확인을 묻기
    if (confirmDelete) {
      const confirmReDelete = window.confirm("정말로 회원을 탈퇴 하시겠습니까? 탈퇴후에는 복구가 불가능 합니다."); // 사용자에게 삭제 확인을 묻기

      if (confirmReDelete) {
        const response = await deleteuser(user.userId);

        if (response.status === 200) {
          alert("회원을 탈퇴하였습니다.")
          navigate("/user/login");

        } else {
          alert("회원탈퇴중 오류가 발생했습니다..")
        }
      } else {
        alert("회원 탈퇴를 취소 하였습니다.")
      }
    }
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
            <ContactRow contact={hp} setContact={setHp} />

            {/* 이메일 컴포넌트 */}
            <EmailRow email={email} setEmail={setEmail} />
            <tr>
              <td>가입 날짜</td>
              <td>{formatDate(userData.createdAt)}</td>
            </tr>
            <tr>
              <td>최근 로그인</td>
              <td>{formatDate(userData.updatedAt)}</td>
            </tr>
            <StatusMessage
              statusMessage={statusMessage}
              setStatusMessage={setStatusMessage}
            />
          </tbody>
        </table>
        <div className="btnBox">
          <button onClick={changePassHandle}>비밀번호 변경</button>
          <button onClick={deleteHandle}>회원 탈퇴</button>
        </div>
      </div>
      <div className="imgBox">
        <div className="userImg">
          <h3>프로필사진</h3>
          <img
            // src={`${SERVER_HOST}${userData.profile}` || "/images/ic-profile.png"}   // imageUrl이 없으면 기본 이미지 사용            
            src={imageUrl || "/images/ic-profile.png"}   // imageUrl이 없으면 기본 이미지 사용            
            alt="프로필사진"
          />
          <div>
            {/* 파일 입력 창은 숨기고 버튼을 눌렀을 때 열리도록 */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}  // 기본적으로 숨김
              id="fileInput"
            />
            <button
              onClick={() => document.getElementById("fileInput").click()}  // 버튼 클릭 시 파일 입력 열기
            >
              프로필 변경
            </button>
            {isUploading && <p>업로드 중...</p>}
          </div>
        </div>
      </div>
      
    </div>
  );
}
