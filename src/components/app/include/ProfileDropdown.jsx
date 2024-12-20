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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../slices/UserSlice";
import {
  loginStatus,
  profileUrl,
  selectLoginStatus,
} from "../../../api/user/userAPI";
import { Avatar } from "@mui/material";

export default function ProfileDropdown({
  isOpen,
  userStatus,
  onStatusChange,
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [status, setStatus] = useState(userStatus); // 상태 관리 변수 추가

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice);

  // 상태값 변경 함수
  const statusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusChange(newStatus); // 상위 컴포넌트에 상태 변경 전달
    const response = await loginStatus(newStatus); // 서버에 상태 변경 요청
    if (response.status === 200) {
      console.log("상태 변경 완료");
    }
  };

  // userStatus 값 확인
  useEffect(() => {
    setStatus(userStatus);
    console.log("Current userStatus:", userStatus);
  }, [userStatus]);

  // 이미지 URL을 받아오는 함수
  const getImageUrl = async () => {
    const url = await profileUrl(); // 이미지 URL을 비동기적으로 가져옴

    setImageUrl(url); // 받아온 URL을 상태에 저장
  };

  // 컴포넌트가 마운트될 때 프로필 이미지 URL을 가져옴
  useEffect(() => {
    getImageUrl();
  }, []);

  if (!isOpen) return null; // 드롭다운이 닫혀있으면 아무것도 렌더링하지 않음
  // 테두리 색상 결정

  const borderColor =
    {
      online: "green",
      dnd: "red",
      away: "yellow",
      logout: "transparent", // 로그아웃 상태는 투명
    }[userStatus] || "transparent"; // 기본값은 투명

  return (
    isOpen && (
      <div className="ProfileDropdown">
        <div className="profileDetails">
          <div
            className="profileImageWrapper"
            style={{
              border: `3px solid ${borderColor}`, // 상태에 따른 테두리 색상
              borderRadius: "50%", // 동그란 프로필 이미지 유지
              position: "relative",
            }}
          >
            <Avatar src={imageUrl} className="ProfileDropdownImg">
              {user.username.charAt(0)}
            </Avatar>
          </div>
          <div className="profileInfo">
            <div className="profileHeader">
              <p className="profileName">
                {user.username || "알 수 없는 사용자"}
              </p>
              <select
                className="statusDropdown"
                value={status}
                onChange={statusChange} // 상태 변경
              >
                <option value="online">온라인</option>
                <option value="dnd">방해금지</option>
                <option value="away">자리비움</option>
              </select>
            </div>
            <p className="profileEmail">{user.email || "이메일 없음"}</p>
          </div>
        </div>
        <div className="profileButtons">
          {user.role === "ADMIN" && (
            <Link to="/admin/user" className="editProfileButton">
              관리자
            </Link>
          )}
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
    )
  );
}

ProfileDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired, // 드롭다운 열림 여부
  onClose: PropTypes.func, // 닫힘 이벤트 핸들러
};
