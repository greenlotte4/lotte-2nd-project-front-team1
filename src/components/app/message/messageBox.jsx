

export default function MessageBox() {
  return (
    <main className="main-content">
      <div className="messageDiv">
        <div className="messageInfo">
          <h2>강중원</h2>
          <span>관리자</span>
        </div>
        <div className="chatBox">
          <div>
            <div className="message_date">2024. 11. 21. (목)</div>
            <div className="message_box">
              <img
                src="/images/user_Icon.png"
                alt="프로필"
                className="chatProfile"
              />
              <div className="chatContent">
                <div className="message_time">오후 5:16</div>
                <p>나에게만 보이는 메시지입니다.</p>
              </div>
            </div>
            <div className="message_box">
              <img
                src="/images/user_Icon.png"
                alt="프로필"
                className="chatProfile"
              />
              <div className="chatContent">
                <div className="message_time">오후 5:16</div>
                <p>나에게만 보이는 메시지입니다.</p>
              </div>
            </div>
            <div className="message_box">
              <img
                src="/images/user_Icon.png"
                alt="프로필"
                className="chatProfile"
              />
              <div className="chatContent">
                <div className="message_time">오후 5:16</div>
                <p>나에게만 보이는 메시지입니다.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="message_input-bar">
          <input type="text" placeholder="메시지를 입력해주세요." />
          <button>전송</button>
        </div>
      </div>
    </main>
  );
}
