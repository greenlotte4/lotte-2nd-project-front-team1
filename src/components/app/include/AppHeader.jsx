/*
    날짜 : 2024/11/25
    이름 : 강중원
    내용 : 사용자 헤더

    추가내역
    -------------
    2024/11/28 이도영 알람,프로필 출력 기능 추가
    2024/11/19 강중원 noneAside를 통해 어사이드 버튼 비/활성화
    2024/12/03 이도영 로그인 정보 출력
*/
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";
// 아이콘
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { profileUrl, selectLoginStatus } from "../../../api/user/userAPI";

export default function AppHeader({ onToggleSidebar, noneAside, thisPage }) {
  const [openDropdown, setOpenDropdown] = useState(null); // "notification" | "profile" | null
  const [imageUrl, setImageUrl] = useState(null);
  const [userStatus, setUserStatus] = useState("");
  const user = useSelector((state) => state.userSlice);
  const toggleDropdown = (type) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };
  // 이미지 URL을 받아오는 함수
  const getImageUrl = async () => {
    const url = await profileUrl(); // 이미지 URL을 비동기적으로 가져옴
    /* const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    const url1 = user ? user.profile : null; // user가 없거나 profile이 없으면 null
    console.log("받은 이미지 URL: ", url);
    console.log("받은 이미지 URL11: ", url1); */
    setImageUrl(url); // 받아온 URL을 상태에 저장
  };

  // 컴포넌트가 마운트될 때 프로필 이미지 URL을 가져옴
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getLoginStatus(), getImageUrl()]);
    };
    fetchData(); // 비동기 데이터 가져오기 실행
  }, []); // 빈 배열을 넣어 첫 렌더링 시 실행되도록 설정

  const getLoginStatus = async () => {
    try {
      const response = await selectLoginStatus(); // 서버에서 상태값 가져오기
      if (response) {
        setUserStatus(response.data); // 상태 업데이트
      } else {
        console.warn("서버에서 상태값을 가져오지 못했습니다.");
      }
    } catch (error) {
      console.error("상태값 가져오기 실패:", error);
    }
  };

  const statusColor =
    {
      online: "green",
      dnd: "red",
      away: "yellow",
      logout: "red", // 로그아웃 상태는 빨간색
    }[userStatus] || "transparent";
  // userStatus가 변경될 때마다 AppHeader에서 상태 반영
  const handleStatusUpdate = (newStatus) => {
    setUserStatus(newStatus); // ProfileDropdown에서 변경된 상태값을 AppHeader로 전달
  };

  return (
    <header className="AppHeader">
      <div className="headerTitle">
        <button
          className="headerButton"
          id="toggle-sidebar"
          onClick={onToggleSidebar} // 햄버거 버튼 클릭 시 전달된 함수 호출
          style={{ visibility: noneAside ? "hidden" : "" }}
        >
          <MenuIcon className="hamburgerButtonIcon" />
        </button>
        <Link to="/app/home" className="headerTitleName">
          <img src="/images/logo-2.png" alt="Logo" />
        </Link>
      </div>
      <div className="headerArticle">
        <Tooltip title="페이지">
          <Link
            to="/app/page"
            className={
              thisPage == "page" ? "headerIcon currentIcon" : "headerIcon "
            }
          >
            <DescriptionOutlinedIcon className="header_icons" />
          </Link>
        </Tooltip>

        <Tooltip title="캘린더">
          <Link
            to="/app/calendar"
            className={
              thisPage == "calendar" ? "headerIcon currentIcon" : "headerIcon "
            }
          >
            <CalendarMonthOutlinedIcon className="header_icons" />
          </Link>
        </Tooltip>

        <Tooltip title="메세지">
          <Link
            to="/app/message"
            className={
              thisPage == "message" ? "headerIcon currentIcon" : "headerIcon "
            }
          >
            <ChatBubbleOutlineOutlinedIcon className="header_icons" />
          </Link>
        </Tooltip>

        <Tooltip title="게시판">
          <Link
            to="/app/mainboard"
            className={
              thisPage == "mainboard" ? "headerIcon currentIcon" : "headerIcon "
            }
          >
            <AssignmentOutlinedIcon className="header_icons" />
          </Link>
        </Tooltip>
        <Tooltip title="프로젝트">
          <Link
            to="/app/project"
            className={
              thisPage == "project" ? "headerIcon currentIcon" : "headerIcon "
            }
          >
            <AccountTreeOutlinedIcon className="header_icons" />
          </Link>
        </Tooltip>
        <Tooltip title="드라이브">
          <Link
            to="/app/file"
            className={
              thisPage == "file" ? "headerIcon currentIcon" : "headerIcon "
            }
          >
            <DnsOutlinedIcon className="header_icons" />
          </Link>
        </Tooltip>
        <Tooltip title="문의하기">
          <Link
            to="/user/mypage/inquiry"
            className={
              thisPage == "inquiry" ? "headerIcon currentIcon" : "headerIcon "
            }
          >
            <HelpOutlineIcon className="header_icons" />
          </Link>
        </Tooltip>
        <div className="headerSettings">
          {/* 알림 버튼 */}
          <NotificationButton
            isOpen={openDropdown === "notification"}
            onToggle={() => toggleDropdown("notification")}
          />

          <Link to="/app/setting" className="headerIcon">
            <SettingsOutlinedIcon className="header_icons" />
          </Link>
        </div>

        <div className="headerProfile">
          {/* 프로필 버튼 */}
          <div className="ProfileDiv" onClick={() => toggleDropdown("profile")}>
            <Avatar className="profileImg" src={imageUrl}>
              {user.username.charAt(0)}
            </Avatar>
            <div
              className="userStatus"
              style={{
                position: "absolute", // 부모를 기준으로 위치
                bottom: "5px", // 프로필 이미지 아래쪽
                right: "70px", // 프로필 이미지 오른쪽
                width: "8px", // 크기
                height: "8px", // 크기
                backgroundColor: `${statusColor}`, // 상태 색상
                borderRadius: "50%", // 원형
                // border: "2px solid white", // 테두리
              }}
            ></div>
            <p className="ProfileName">
              {user.username || "알 수 없는 사용자"}
            </p>
          </div>
          <ProfileDropdown
            isOpen={openDropdown === "profile"}
            onClose={() => setOpenDropdown(null)}
          />
        </div>
        <ProfileDropdown
          isOpen={openDropdown === "profile"}
          onClose={() => setOpenDropdown(null)}
          userStatus={userStatus}
          onStatusChange={handleStatusUpdate} // 상태 변경 함수 전달
        />
      </div>
    </header>
  );
}
