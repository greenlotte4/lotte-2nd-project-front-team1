import { useEffect, useState } from "react";

const MessageAside = ({ isVisible }) => {
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
    )
  );
};

export default MessageAside;
