/*
    날짜 : 2024/11/25
    이름 : 강중원
    내용 : 사용자 헤더

    추가내역
    -------------
    2024/11/28 이도영 알람,프로필 출력 기능 추가
    2024.11.19 강중원 noneAside를 통해 어사이드 버튼 비/활성화
*/
import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";

export default function AppHeader({ onToggleSidebar, noneAside }) {
  const [openDropdown, setOpenDropdown] = useState(null); // "notification" | "profile" | null
  const [status, setStatus] = useState(null);
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
          <img src="/images/hamburger.png" alt="Toggle Sidebar" />
        </button>
        <Link to="/app/home" className="headerTitleName">
          <img src="/images/logo-2.png" alt="Logo" />
        </Link>
      </div>
      <div className="headerArticle">
        <Link to="/app/page" className="headerIcon">
          <img src="/images/book.png" alt="page" />
        </Link>
        <Link to="/app/calendar" className="headerIcon">
          <img src="/images/calendar.png" alt="calendar" />
        </Link>
        <Link to="/app/message" className="headerIcon">
          <img src="/images/messages.png" alt="message" />
        </Link>
        <Link to="/app/mainboard" className="headerIcon">
          <img src="/images/form.png" alt="article" />
        </Link>
        <Link to="/app/project" className="headerIcon">
          <img src="/images/master-plan.png" alt="project" />
        </Link>
        <Link to="/app/file" className="headerIcon">
          <img src="/images/folder-open.png" alt="drive" />
        </Link>
        <Link to="/app/setting" className="headerIcon">
          <img src="/images/settings.png" alt="drive" />
        </Link>
        {/* 알림 버튼 */}
        <NotificationButton
          isOpen={openDropdown === "notification"}
          onToggle={() => toggleDropdown("notification")}
        />
        {/* 프로필 버튼 */}
        <div className="ProfileDiv" onClick={() => toggleDropdown("profile")}>
          <img src="/images/user_Icon.png" alt="👤" className="profileImg" />
          <p className="ProfileName">이순신</p>
        </div>
        <ProfileDropdown
          isOpen={openDropdown === "profile"}
          onClose={() => setOpenDropdown(null)}
        />
      </div>
    </header>
  );
}
