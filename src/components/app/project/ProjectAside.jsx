export default function ProjectSidebar(){
    return(
        <div id="sidebar-container">
          {/*  사이드바  */}
          <aside className="sidebar">
            <div className="sidebar-header">
              <h2>닉네임</h2>
              <a href="#" className="search-link" id="open-modal">🔍 검색</a>
            </div>
            <nav className="menu">
              <ul>
                <li>
                  프로젝트 추가
                  <ul className="submenu">
                    <li>👤 내 프로필</li>
                  </ul>
                  <div className="more-button">더 보기</div>
                  {/*  더보기 버튼  */}
                </li>
                <li>
                  프로젝트 이름
                  <ul>
                    <li>섹션추가</li>
                  </ul>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
    );
}