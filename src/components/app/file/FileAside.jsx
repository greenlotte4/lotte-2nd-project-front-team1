/*
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 프로젝트 html 작성

    추가내역
    -------------
    00.00 이름 - 내용
*/
export default function FileAside() {
  return (
    <div id="sidebar-container">
      {/* 사이드바 */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>닉네임</h2>
          <a href="#" className="search-link" id="open-modal">
            🔍 검색
          </a>
        </div>
        <nav className="menu">
          <ul className="submenu">
            <li className="menu-item">
              <span>⬇ 내 드라이브</span>
            </li>
            <li className="menu-item">
              <span>🗂️ 공용 드라이브</span>
            </li>
            <li className="menu-item">
              <span>⏱️ 최근 사용 경로들</span>
            </li>
            <li className="menu-item">
              <span>⬇ 즐겨찾기</span>
            </li>
            <li className="favorites-section">
              <div className="favorites-placeholder">
                <img
                  src="https://via.placeholder.com/50"
                  alt="즐겨찾기 아이콘"
                />
                <p>즐겨 찾기 폴더를 여기에 끌어다 놓고 빠르게 찾아보세요</p>
              </div>
            </li>
            <li className="menu-item">
              <span>🗑️ 휴지통</span>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
