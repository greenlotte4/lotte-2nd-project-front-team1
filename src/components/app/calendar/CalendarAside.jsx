/*
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 프로젝트 html 작성

    추가내역
    -------------
    2024/11/29 이도영 어사이드 수정
*/
import { useState } from "react";
import AddCalendarModal from "./AddCalendarModal";
import Modal from "../../modal/Modal";

export default function CalendarAside() {
  const [isModalOpen, setModalOpen] = useState(false); // 추가 모달 상태
  const [isConfigModalOpen, setConfigModalOpen] = useState(false); // 설정 모달 상태
  const [menuItems, setMenuItems] = useState([
    { id: 1, title: "개인 스케쥴", isGroup: false, inviteCode: "ABC123" },
    { id: 2, title: "팀 프로젝트", isGroup: true, inviteCode: "XYZ456" },
  ]); // 초기 메뉴 아이템
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 설정 대상
  function generateInviteCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 알파벳 대문자
    const numbers = "0123456789"; // 숫자

    // 5글자 단어 생성
    const randomLetters = Array.from({ length: 5 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join("");

    // 3글자 숫자 생성
    const randomNumbers = Array.from({ length: 3 }, () =>
      numbers.charAt(Math.floor(Math.random() * numbers.length))
    ).join("");

    return randomLetters + randomNumbers; // 5글자 단어 + 3글자 숫자 결합
  }
  // 캘린더 추가
  const handleAddCalendar = (data) => {
    const newCalendar = {
      id: Date.now(),
      title: data.title,
      isGroup: data.isGroup,
      inviteCode: data.isGroup ? generateInviteCode() : null, // 그룹일 경우에만 인증 코드 생성
    };

    setMenuItems((prevItems) => [...prevItems, newCalendar]);
    setModalOpen(false);
  };

  // 설정 버튼 클릭 핸들러
  const handleConfigClick = (item) => {
    setSelectedItem(item);
    setConfigModalOpen(true);
  };

  // 제목 수정
  const handleTitleUpdate = (newTitle) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedItem.id ? { ...item, title: newTitle } : item
      )
    );
    setConfigModalOpen(false);
  };

  // 삭제 기능
  const handleDeleteCalendar = () => {
    setMenuItems((prevItems) =>
      prevItems.filter((item) => item.id !== selectedItem.id)
    );
    setConfigModalOpen(false);
  };

  return (
    <div id="sidebar-container">
      <aside className="sidebar">
        <nav className="menu">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.title}
                {item.isGroup && <span> (그룹)</span>}
                <button
                  className="configButton"
                  onClick={() => handleConfigClick(item)}
                >
                  설정
                </button>
              </li>
            ))}
          </ul>
          <button className="addButton" onClick={() => setModalOpen(true)}>
            + 추가
          </button>
        </nav>
      </aside>

      {/* 추가 모달 */}
      <AddCalendarModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddCalendar={handleAddCalendar}
      />

      {/* 설정 모달 */}
      {isConfigModalOpen && selectedItem && (
        <Modal
          isOpen={isConfigModalOpen}
          onClose={() => setConfigModalOpen(false)}
          title="캘린더 설정"
        >
          <div className="config-section">
            <label>제목 수정:</label>
            <input
              type="text"
              defaultValue={selectedItem.title}
              onBlur={(e) => handleTitleUpdate(e.target.value)}
            />
            {selectedItem.isGroup && (
              <p>인증 코드: {selectedItem.inviteCode}</p>
            )}
            <button onClick={handleDeleteCalendar} className="delete-btn">
              삭제
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
