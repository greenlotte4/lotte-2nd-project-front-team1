import { Avatar, AvatarGroup } from "@mui/material";
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
                  <li className="chatRoom curruntChatRoom">
                    <div className="chatRoomName">업무용 대화방</div>
                    <AvatarGroup spacing="midium" max={4}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                      <Avatar
                        alt="Cindy Baker"
                        src="/static/images/avatar/3.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                      <Avatar
                        alt="Cindy Baker"
                        src="/static/images/avatar/3.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                      <Avatar
                        alt="Cindy Baker"
                        src="/static/images/avatar/3.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                    </AvatarGroup>
                  </li>
                </a>
                <a href="">
                  <li className="chatRoom">
                    <div className="chatRoomName">거래처 업무방</div>
                    <AvatarGroup spacing="midium" max={4}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                      <Avatar
                        alt="Cindy Baker"
                        src="/static/images/avatar/3.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                    </AvatarGroup>
                  </li>
                </a>
                <a href="">
                  <li className="chatRoom">
                    <div className="chatRoomName">계모임</div>
                    <AvatarGroup spacing="midium" max={4}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                        sx={{ width: 24, height: 24 }}
                      />
                    </AvatarGroup>
                  </li>
                </a>
              </ul>
              <ul>
                <button type="button" className="chatListButton">
                  메시지
                </button>
                <li className="chatRoom">이순신</li>
                <li className="chatRoom">홍길동</li>
                <li className="chatRoom">강감찬</li>
              </ul>
            </div>
          </nav>
        </aside>
      </div>
    )
  );
};

export default MessageAside;
