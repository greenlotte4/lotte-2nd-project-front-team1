/*
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 프로젝트 html 작성

    추가내역
    -------------
    2024/11/29 이도영 어사이드 수정
*/
import { useEffect, useState } from "react";
export default function CalendarAside({ isVisible }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true); // 보이기 시작하면 애니메이션 추가
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500); // 애니메이션 종료 후 숨기기
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
            <ul>
              <li>개인스캐쥴</li>
              <li className="menu-item">
                팀 프로젝트
                <button className="delete-button">-</button>
              </li>
            </ul>
            <button className="addButton">+ 추가</button>
          </nav>
        </aside>
      </div>
    )
  );
}
