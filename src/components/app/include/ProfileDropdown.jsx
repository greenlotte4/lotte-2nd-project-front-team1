/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 사용자 헤더 프로필 출력

    추가내역
    -------------
    2024/11/29 이도영 경로 추가 , 상태변경 셀렉트박스 추가
*/
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProfileDropdown({ isOpen }) {
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
          <div className="profileHeader">
            <p className="profileName">이순신</p>
            <select className="statusDropdown">
              <option value="online">온라인</option>
              <option value="dnd">방해금지</option>
              <option value="away">자리비움</option>
            </select>
          </div>
          <p className="profileDept">관리 부서</p>
          <p className="profileEmail">lee@example.com</p>
        </div>
      </div>
      <div className="profileButtons">
        <Link to="/user/myPage" className="editProfileButton">
          프로필 편집
        </Link>
        <Link to="/" className="logoutButton">
          로그아웃
        </Link>
      </div>
    </div>
  );
}

ProfileDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired, // 드롭다운 열림 여부
  onClose: PropTypes.func, // 닫힘 이벤트 핸들러
};
