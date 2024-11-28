export default function AdminUserAside() {
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
          <ul>
            <li>📄 개인스캐쥴</li>
            <li>팀 프로젝트</li>
            <li>+ 추가</li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
