/*
   날짜 : 2024/11/25
   이름 : 이도영
   내용 : 프로젝트 사이드바 

   추가내역
   -------------
   2024/11/29 이도영 어사이드 수정
 */
import { useEffect, useState } from "react";
export default function ProjectSidebar({ isVisible }) {
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
          <nav className="menu">
            <ul>
              <li className="menu-item">
                프로젝트 1<button className="delete-button">-</button>
              </li>
              <li className="menu-item">
                팀 프로젝트
                <button className="delete-button">-</button>
              </li>
            </ul>
            <button className="addButton">+ 프로젝트 추가</button>
          </nav>
        </aside>
      </div>
    )
  );
}
