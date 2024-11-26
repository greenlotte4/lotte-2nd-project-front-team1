import React from 'react';

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
                <img src="/images/speech-bubble.png" alt="💬" />
                <a href="" className="headerTitleName">
                    <img src="/images/logo-2.png" alt="Logo" />
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
