import { useEffect, useState } from "react";

export default function PageAside({ isVisible }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [openFolders, setOpenFolders] = useState({}); // 폴더 열림/닫힘 상태 관리

  const toggleFolder = (folderName) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    isAnimating && (
      <div id="sidebar-container">
        <aside
          className={
            isVisible ? "aside-slide-in sidebar" : "aside-slide-out sidebar"
          }
        >
          <div className="sidebar-header">
            <h2>닉네임</h2>
            <a href="#" className="search-link" id="open-modal">
              🔍 검색
            </a>
          </div>
          <nav className="menu">
            <ul className="submenu">
              <li
                className="menu-item"
                onClick={() => toggleFolder("개인페이지")}
              >
                📄 개인페이지
              </li>
              {openFolders["개인페이지"] && (
                <ul className="sub-menu scrollable">
                  <li className="menu-item">👤 내 프로필</li>
                  <li className="menu-item">🔐 비밀번호 변경</li>
                  <li className="menu-item">📑 최근 활동</li>
                  <li className="menu-item">📅 일정 관리</li>
                  <li className="menu-item">💬 메시지</li>
                  <li className="menu-item">📊 통계</li>
                  <li className="menu-item">📅 프로젝트 일정</li>
                  <li className="menu-item">🗂️ 프로젝트 관리</li>
                  <li className="menu-item">📝 작업 내역</li>
                  <li className="menu-item">🛠️ 설정</li>
                  <li className="menu-item">🖥️ 개발 도구</li>
                  <li className="menu-item">📞 고객 지원</li>
                  <li className="menu-item">🎨 디자인</li>
                  <li className="menu-item">🛍️ 쇼핑</li>
                </ul>
              )}

              {/* 다른 메뉴 */}
              <li className="menu-item">⭐ 즐겨찾기</li>
              <li className="menu-item">📂 기능노트</li>
              <li className="menu-item">🗂️ 프로젝트 추가 요구사항</li>
              <li className="menu-item">📁 휴지통</li>
            </ul>
          </nav>
        </aside>
      </div>
    )
  );
}
