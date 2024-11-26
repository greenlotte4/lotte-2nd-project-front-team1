import React from "react";

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
        <a href="" className="headerTitleName">
          <img src="/images/logo-2.png" alt="Logo" />
        </a>
      </div>
      <div className="headerArticle">
        <a href="" className="headerIcon">
          <img src="/images/book.png" alt="page" />
        </a>
        <a href="" className="headerIcon">
          <img src="/images/calendar.png" alt="calendar" />
        </a>
        <a href="" className="headerIcon">
          <img src="/images/messages.png" alt="message" />
        </a>
        <a href="" className="headerIcon">
          <img src="/images/form.png" alt="article" />
        </a>
        <a href="" className="headerIcon">
          <img src="/images/master-plan.png" alt="project" />
        </a>
        <a href="" className="headerIcon">
          <img src="/images/folder-open.png" alt="drive" />
        </a>
        <a href="" className="headerIcon">
          <img src="/images/settings.png" alt="drive" />
        </a>

        <img src="/images/user_Icon.png" alt="👤" className="profileImg" />
        <p className="ProfileName">billie Joel</p>
      </div>
    </header>
  );
}
