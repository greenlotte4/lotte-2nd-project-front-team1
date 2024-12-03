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
import { useState } from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

export default function AppHeader({ onToggleSidebar, noneAside, thisPage }) {
  const [openDropdown, setOpenDropdown] = useState(null); // "notification" | "profile" | null
  const [status, setStatus] = useState(null);
  const user = useSelector((state) => state.userSlice);
  const toggleDropdown = (type) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };
  // 상태별 테두리 색상
  const borderColor =
    {
      online: "green",
      dnd: "red",
      away: "yellow",
    }[status] || "transparent"; // 기본값은 투명

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
            <img src="/images/user_Icon.png" alt="👤" className="profileImg" />
            <p className="ProfileName">
              {user.username || "알 수 없는 사용자"}
            </p>
          </div>
          <ProfileDropdown
            isOpen={openDropdown === "profile"}
            onClose={() => setOpenDropdown(null)}
          />
        </div>
      </div>
    </header>
  );
}
