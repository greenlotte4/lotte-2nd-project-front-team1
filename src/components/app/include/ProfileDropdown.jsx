/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 사용자 헤더 프로필 출력

    추가내역
    -------------
*/
import PropTypes from "prop-types";

export default function ProfileDropdown({ isOpen, onClose }) {
  if (!isOpen) return null; // 드롭다운이 닫혀있으면 아무것도 렌더링하지 않음

  return (
    <div className="ProfileDropdown">
      <div className="profileDetails">
        <div className="profileImageWrapper">
          <img
            src="/images/user_Icon.png"
            alt="프로필 이미지"
            className="ProfileDropdownImg"
          />
        </div>
        <div className="profileInfo">
          <p className="profileName">이순신</p>
          <p className="profileDept">관리 부서</p>
          <p className="profileEmail">lee@example.com</p>
        </div>
      </div>
      <div className="profileButtons">
        <button className="editProfileButton">프로필 편집</button>
        <button className="logoutButton" onClick={onClose}>
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
