import { useState } from "react";
import AddCalendarModal from "./AddCalendarModal";
import Modal from "../../modal/Modal";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  createCalendar,
  fetchCalendarList,
} from "../../../api/calendar/CalendarAPI";

export default function CalendarAside({
  isVisible,
  calendars,
  setCalendars,
  setSelectedCalendar,
}) {
  const [isModalOpen, setModalOpen] = useState(false); // 추가 모달 상태
  const [isConfigModalOpen, setConfigModalOpen] = useState(false); // 설정 모달 상태
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 설정 대상
  const user = useSelector((state) => state.userSlice);
  //달력 추가 기능
  const handleAddCalendar = async (data) => {
    try {
      const requestData = {
        name: data.title,
        isTeam: data.isGroup,
        user: { userId: user.userid },
      };

      await createCalendar(requestData);

      // 최신 데이터 가져오기
      const updatedCalendars = await fetchCalendarList(user.userid);

      // CalendarPage의 상태 업데이트
      setCalendars(updatedCalendars); // 부모 상태 업데이트
    } catch (error) {
      console.error("캘린더 추가 실패:", error);
    }
  };
  //초대 코드로 입장
  const handleJoinByInviteCode = async (inviteCode) => {
    // try {
    //   // 초대 코드를 서버로 전송하는 API 호출
    //   const response = await joinCalendarByInviteCode(inviteCode);
    //   setMenuItems((prevItems) => [...prevItems, response]); // 새로운 캘린더 추가
    // } catch (error) {
    //   console.error("초대 코드로 가입 실패:", error);
    //   alert("초대 코드로 가입에 실패했습니다. 다시 시도해주세요.");
    // }
  };
  // 설정 버튼 클릭 핸들러
  const handleConfigClick = (item) => {
    setSelectedItem(item);
    setSelectedCalendar(item);
    setConfigModalOpen(true);
  };

  // 제목 수정
  const handleTitleUpdate = (newTitle) => {
    setSelectedCalendar((prev) =>
      prev.calendarId === selectedItem.calendarId
        ? { ...prev, name: newTitle }
        : prev
    );
    setConfigModalOpen(false);
  };

  // 삭제 기능
  const handleDeleteCalendar = () => {
    // 삭제 로직 구현 가능
    setConfigModalOpen(false);
  };

  return (
    <div id="sidebar-container" className={isVisible ? "" : "hidden"}>
      <aside className="sidebar">
        <nav className="menu">
          <ul>
            {calendars.map((item) => (
              <li key={item.calendarId}>
                <strong>{item.name}</strong>
                {item.isTeam && <span> (그룹)</span>}
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
        onAddCalendar={handleAddCalendar} // handleAddCalendar를 전달
        onJoinByInviteCode={handleJoinByInviteCode} // 초대 코드 관련 처리
      />

      {/* 설정 모달 */}
      {isConfigModalOpen && selectedItem && (
        <Modal
          isOpen={isConfigModalOpen}
          onClose={() => setConfigModalOpen(false)}
          title="캘린더 설정"
        >
          <div className="config-section">
            {/* 제목 수정 필드 */}
            <label>제목 수정:</label>
            <input
              type="text"
              defaultValue={selectedItem.name}
              readOnly={selectedItem.user.userId !== user.userid} // 소유자만 수정 가능
              onBlur={(e) =>
                selectedItem.user.userId === user.userid &&
                handleTitleUpdate(e.target.value)
              }
            />
            <div className="buttonspace">
              {/* 소유자 조건에 따른 버튼 표시 */}
              {selectedItem.user.userId === user.userid ? (
                <>
                  <button
                    className="config-btn"
                    onClick={() => handleConfigClick(selectedItem)}
                  >
                    수정
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleLeaveCalendar(selectedItem.calendarId)}
                  >
                    팀 삭제
                  </button>
                </>
              ) : (
                <button
                  className="delete-btn"
                  onClick={() => handleLeaveCalendar(selectedItem.calendarId)}
                >
                  팀 나가기
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

CalendarAside.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  calendars: PropTypes.array.isRequired,
  setCalendars: PropTypes.func.isRequired,
  setSelectedCalendar: PropTypes.func.isRequired,
};
