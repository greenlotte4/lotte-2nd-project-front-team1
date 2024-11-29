/*
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 파일 html 작성

    추가내역
    -------------
    2024/11/29 이도영 어사이드 수정
*/
import { useEffect, useState } from "react";

export default function FileAside({ isVisible }) {
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
              {/* 내 드라이브 */}
              <li className="menu-item">
                <span onClick={() => toggleFolder("내 드라이브")}>
                  ⬇ 내 드라이브
                </span>
                {openFolders["내 드라이브"] && (
                  <ul className="sub-menu">
                    <li className="menu-item">📄 문서</li>
                    <li className="menu-item">📂 프로젝트</li>
                  </ul>
                )}
              </li>

              {/* 공용 드라이브 */}
              <li className="menu-item">
                <span onClick={() => toggleFolder("공용 드라이브")}>
                  🗂️ 공용 드라이브
                </span>
                {openFolders["공용 드라이브"] && (
                  <ul className="sub-menu">
                    <li className="menu-item">📂 팀 폴더</li>
                  </ul>
                )}
              </li>

              {/* 최근 사용 경로들 */}
              <li className="menu-item">
                <span>⏱️ 최근 사용 경로들</span>
              </li>

              {/* 즐겨찾기 */}
              <li className="menu-item">
                <span onClick={() => toggleFolder("즐겨찾기")}>⬇ 즐겨찾기</span>
                {openFolders["즐겨찾기"] && (
                  <ul className="sub-menu">
                    <li className="menu-item">📄 즐겨찾은 파일</li>
                  </ul>
                )}
              </li>

              {/* 휴지통 */}
              <li className="menu-item">
                <span>🗑️ 휴지통</span>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    )
  );
}
