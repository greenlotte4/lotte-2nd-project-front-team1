import React from "react";
import { Link } from "react-router-dom";

export default function AppHeader({ onToggleSidebar }) {
  return (
    <header className="AppHeader">
      <div className="headerTitle">
        <button
          className="headerButton"
          id="toggle-sidebar"
          onClick={onToggleSidebar} // 햄버거 버튼 클릭 시 전달된 함수 호출
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
        <Link to="/app/article" className="headerIcon">
          <img src="/images/form.png" alt="article" />
        </Link>
        <Link to="/app/project" className="headerIcon">
          <img src="/images/master-plan.png" alt="project" />
        </Link>
        <Link to="/app/drive" className="headerIcon">
          <img src="/images/folder-open.png" alt="drive" />
        </Link>
        <Link to="/app/setting" className="headerIcon">
          <img src="/images/settings.png" alt="drive" />
        </Link>

        <img src="/images/user_Icon.png" alt="👤" className="profileImg" />
        <p className="ProfileName">billie Joel</p>
      </div>
    </header>
  );
}
