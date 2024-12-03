/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 사용자 헤더 프로필 출력

    추가내역
    -------------
    2024/11/29 이도영 경로 추가 , 상태변경 셀렉트박스 추가
    2024/12/03 이도영 로그인 정보 추가
*/
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../slices/UserSlice";

export default function ProfileDropdown({ isOpen }) {
  const [status, setStatus] = useState("online"); // 상태값 저장
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice);
  console.log("user" + user);
  if (!isOpen) return null; // 드롭다운이 닫혀있으면 아무것도 렌더링하지 않음

  // 테두리 색상 결정
  const borderColor =
    {
      online: "green",
      dnd: "red",
      away: "yellow",
    }[status] || "transparent"; // 기본값은 투명

  return (
    <div className="ProfileDropdown">
      <div className="profileDetails">
        <div
          className="profileImageWrapper"
          style={{
            border: `3px solid ${borderColor}`, // 상태에 따른 테두리 색상
            borderRadius: "50%", // 동그란 프로필 이미지 유지
          }}
        >
          <img
            src="/images/user_Icon.png"
            alt="프로필 이미지"
            className="ProfileDropdownImg"
          />
        </div>
        <div className="profileInfo">
          <div className="profileHeader">
            <p className="profileName">
              {user.username || "알 수 없는 사용자"}
            </p>
            <select
              className="statusDropdown"
              value={status}
              onChange={(e) => setStatus(e.target.value)} // 상태 변경
            >
              <option value="online">온라인</option>
              <option value="dnd">방해금지</option>
              <option value="away">자리비움</option>
            </select>
          </div>
          <p className="profileDept">관리 부서</p>
          <p className="profileEmail">{user.email || "이메일 없음"}</p>
        </div>
      </div>
      <div className="profileButtons">
        <Link to="/app/setting" className="editProfileButton">
          프로필 편집
        </Link>
        <button
          className="logoutButton"
          onClick={() => {
            dispatch(logout()); // Redux 상태 초기화
            window.location.href = "/user/login"; // 로그인 페이지로 이동
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

ProfileDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired, // 드롭다운 열림 여부
  onClose: PropTypes.func, // 닫힘 이벤트 핸들러
};
