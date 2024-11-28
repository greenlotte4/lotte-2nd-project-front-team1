/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 관리자 헤더


    추가내역
    -------------
    00.00 이름 - 내용
*/
import React from "react";
import { Link } from "react-router-dom";

export default function AdminHeader({ onToggleSidebar }) {
  return (
    <header className="AdminHeader">
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
        <Link to="/admin/user" className="headerIcon">
          <img src="/images/book.png" alt="page" />
        </Link>
        <Link to="/admin/cs" className="headerIcon">
          <img src="/images/calendar.png" alt="calendar" />
        </Link>

        <Link to="" className="ProfileDiv">
          <img src="/images/user_Icon.png" alt="👤" className="profileImg" />
          <p className="ProfileName">이순신</p>
        </Link>
      </div>
    </header>
  );
}
