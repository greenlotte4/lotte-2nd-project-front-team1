export default function MessageAside() {
  return (
    <div id="sidebar-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>닉네임</h2>
          <a href="#" className="search-link" id="open-modal">
            🔍 검색
          </a>
        </div>
        <nav className="menu">
          <button type="button" className="newChat">
            새로운 채팅
          </button>
          <div className="chatList">
            <ul>
              <button type="button" className="chatListButton">
                대화방
              </button>
              <a href="">
                <li>대화방1</li>
              </a>
              <a href="">
                <li>대화방2</li>
              </a>
              <a href="">
                <li>대화방3</li>
              </a>
              <a href="">
                <li>대화방4</li>
              </a>
              <a href="">
                <li>대화방5</li>
              </a>
            </ul>
            <ul>
              <button type="button" className="chatListButton">
                메시지
              </button>
              <li>이순신</li>
              <li>홍길동</li>
              <li>강감찬</li>
            </ul>
          </div>
        </nav>
      </aside>
    </div>
    
  );
}
