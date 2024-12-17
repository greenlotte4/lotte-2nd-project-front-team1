/*
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 파일 html 작성

    추가내역
    -------------
    2024/11/29 이도영 - 어사이드 수정
    2024/12/04 박수정 - 어사이드 수정2
    2024/12/16 최영진 - 컨포넌트화
*/
import { useEffect, useState } from "react";

export default function FileAside({ isVisible, onitemClick }) {


  const [isAnimating, setIsAnimating] = useState(false);
  const [openFolders, setOpenFolders] = useState({}); // 폴더 열림/닫힘 상태 관리
  const [activeItem, setActiveItem] = useState(null); // 활성화된 메뉴 항목 관리
  
  const menuHandle = (item) => {
    setActiveItem(item); // 클릭된 항목 활성화 처리
    onitemClick(item);
  }

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
          <nav className="menu">
            <ul className="submenu">
              {/* 내 드라이브 */}
              <li className="menu-item"
                onClick={() => menuHandle("내 드라이브")}
              > 내 드라이브
              </li>


              {/* 공유 드라이브 */}
              <li className="menu-item"
                onClick={() => menuHandle("공유 드라이브")}
              > 공유 드라이브
              </li>


              {/* 휴지통 */}
              <li className="menu-item"
                onClick={() => menuHandle("휴지통")}>휴지통</li>
            </ul>
          </nav>
        </aside>
      </div>
    )
  );
}
