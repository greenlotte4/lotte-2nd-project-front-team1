import React, { useState } from "react";
import "../../../styles/Header.scss";

export default function ProjectHeader() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // 사이드바 가시성 상태

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState); // 상태 반전
  };
    return (
        <header className="header">
        <div className="headerTitle">
          <button
            className="headerButton"
            id="toggle-sidebar"
            onClick={toggleSidebar}
          >
            <img src="/images/hamburger.png" alt="Toggle Sidebar" />
          </button>
          <img src="/images/speech-bubble.png" alt="💬" />
          <a href="" className="headerTitleName">
            <img src="/images/logo-2.png" alt="" />
          </a>
        </div>
        <div className="headerArticle">
          <a href="" className="headerIcon">
            <img src="/images/calendar.png" alt="🗂️" />
          </a>
          <a href="" className="headerIcon">
            <img src="/images/speech-bubble.png" alt="💬" />
          </a>
          <a href="" className="headerIcon">
            <img src="/images/calendar.png" alt="📅" />
          </a>
          <img src="/images/user_Icon.png" alt="👤" />
          <p className="ProfileName">billie Joel</p>
        </div>
      </header>
    );
}