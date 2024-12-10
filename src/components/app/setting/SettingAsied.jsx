/*
    날짜 : 2024/11-28
    이름 : 최영진
    내용 : 프로젝트 html 작성

    추가내역
    -------------
    00.00 이름 - 내용
*/
export default function SettingAsied({ onitemClick }) {
  const menuHandle = (item) => {
    onitemClick(item);
  };
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
            <li onClick={() => menuHandle("사용자 설정")}>사용자 설정</li>
            <li onClick={() => menuHandle("페이지 설정")}>페이지 설정</li>
            <li onClick={() => menuHandle("캘린더 설정")}>캘린더 설정</li>
            <li onClick={() => menuHandle("메시지 설정")}>메시지 설정</li>
            <li onClick={() => menuHandle("게시판 설정")}>게시판 설정</li>
            <li onClick={() => menuHandle("프로젝트 설정")}>프로젝트 설정</li>
            <li onClick={() => menuHandle("드라이브 설정")}>드라이브 설정</li>
            <li onClick={() => menuHandle("팀생성/팀참가/참여중인방")}>
              팀생성/팀참가/참여중인방
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
