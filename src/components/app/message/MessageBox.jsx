import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";

/* 
  2024-12-2
  최영진: 화면구현(스크립트)

*/
export default function MessageBox() {


  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);  // 편집 상태
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, messageIndex: null });


  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesForMatted = minutes < 10 ? '0' + minutes : minutes;
    return `${ampm} ${hours}: ${minutesForMatted}`;
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const daysOfweek = ['월', '화', '수', '목', '금', '토', '일'];
    const dayOfWeek = daysOfweek[now.getDay()];
    return `${year}. ${month < 10 ? '0' + month : month}. ${day < 10 ? '0' + day : day}. (${dayOfWeek})`;

  }

  // 메시지 전송 함수
  const handleSendMessage = () => {
    if (newMessage.trim()) {// 공백만 있는 메시지는 보내지 않음
      const time = getCurrentTime();
      const date = messages.length === 0 ? getCurrentDate() : null;
      setMessages([...messages, { text: newMessage, time, date }]);
      setNewMessage(""); // 일력 필드 초기화
    }
  };

  // ...클릭시 메뉴 처리
  const contextMenuHandle = (event, index) => {
    event.preventDefault();
  
    // 버튼의 위치 계산
    const buttonRect = event.target.getBoundingClientRect();
    
    setContextMenu({
      visible: true,
      x: buttonRect.left + window.scrollX,  // 버튼 왼쪽 기준
      y: buttonRect.left + window.scrollY,  // 버튼 왼쪽 기준
      y: buttonRect.left + window.scrollZ,  // 버튼 왼쪽 기준
      messageIndex: index,
    });
  };


  // contextMenu 상태가 업데이트 된 후에 로그 출력
  useEffect(() => {
    if (contextMenu.visible) {
      console.log('Button Rect:', contextMenu); // contextMenu 상태를 출력
    }
  }, [contextMenu]);  // contextMenu 값이 변경될 때마다 실행
  //  메뉴 닫기
  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, messageIndex: null });
  };



  //삭제
  const deleteMessageHandle = () => {
    const updatedMessages = messages.filter((_, index) => index !== contextMenu.messageIndex);
    setMessages(updatedMessages);
    closeContextMenu();
  }

  // 편집
  const editMessageHandle = () => {
    const messageToEdit = messages[contextMenu.messageIndex];
    setEditingMessage({ text: messageToEdit.text, index: contextMenu.messageIndex });
    closeContextMenu();
  }
  const keyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
      event.preventDefault();
    }
  };
  // 편집된 메시지 저장
  const saveEditHandle = () => {
    if (editingMessage.text.trim()) {
      const updatedMessages = [...messages];
      updatedMessages[editingMessage.index].text = editingMessage.text;
      setMessages(updatedMessages);
      setEditingMessage(null);
    }
  };




  const inputHandle = (event) => {
    setNewMessage(event.target.value);
  };
  const inputEditHandle = (event) => {
    setEditingMessage({ ...editingMessage, text: event.target.value });
  };

  return (
    <div className="messageDiv">
      <div className="messageInfo">
        <h2>강중원</h2>
        <span>관리자</span>
      </div>
      <div className="chatBox">
        {messages.map((message, index) => (
          <div key={index}>
            <div className="message_date">{message.date}</div>
            <div className="message_box">
              <img
                src="/images/user_Icon.png"
                alt="프로필"
                className="chatProfile"
              />
              <div className="chatContent">
                <div className="message_time">{message.time}</div>
                <div className="text_box">
                  <p>{message.text}</p>
                  <button className="menuBtn" onClick={(e) => contextMenuHandle(e, index)}>...</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="message_input-bar">
        {editingMessage ? (
          <div>
            <input
              type="text"
              value={editingMessage.text}
              onChange={inputEditHandle}
              placeholder=""
            />
            <button onClick={saveEditHandle}>저장</button>
          </div>
        ) : (
          <div className="input_box">
            <input type="text"
              placeholder="메시지를 입력해주세요."
              value={newMessage}
              onChange={inputHandle}
              onKeyDown={keyDown} />
            <button onClick={handleSendMessage}>전송</button>
          </div>
        )}
      </div>


      <ContextMenu
        contextMenu={contextMenu}
        deleteMessageHandle={deleteMessageHandle}
        editMessageHandle={editMessageHandle}
        closeContextMenu={closeContextMenu}
      />
    </div>

  );
}
