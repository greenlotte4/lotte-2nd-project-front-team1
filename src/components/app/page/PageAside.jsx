
import React, { useState } from 'react';

export default function PageSidebar() {
    const [isSidebarOpen] = useState(true);

    return (
        <div id="sidebar-container">
          
            <aside className={`sidebar ${isSidebarOpen ? '' : 'hidden'}`}>
                 <div className="sidebar-header">
      
        <h2>닉네임</h2>
        <a href="#" className="search-link" id="open-modal">🔍 검색</a>
    </div>
    <nav className="menu">
        <ul>
            <li>📄 개인페이지
                <ul className="submenu">
                    <li>👤 내 프로필</li>
                    <li>🔐 비밀번호 변경</li>
                    <li>📑 최근 활동</li>
                    <li>📅 일정 관리</li>
                    <li>💬 메시지</li>
                    <li>📊 통계</li>
                    <li>📅 프로젝트 일정</li>
                    <li>🗂️ 프로젝트 관리</li>
                    <li>📝 작업 내역</li>
                    <li>🛠️ 설정</li>
                    <li>🖥️ 개발 도구</li> 
                    <li>📞 고객 지원</li>
                    <li>🎨 디자인</li>
                    <li>🛍️ 쇼핑</li>
                </ul>
                <div className="more-button">더 보기</div> 
            </li>
            <li>⭐ 즐겨찾기</li>
            <li>📂 기능노트</li>
            <li>🗂️ 프로젝트 추가 요구사항</li>
            <li>📁 휴지통</li>
        </ul>
    </nav>
            </aside>
        </div>
    );
}