import { useState } from "react";
import AddCalendarModal from "./AddCalendarModal";
import Modal from "../../modal/Modal";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  createCalendar,
  deleteCalendar,
  fetchCalendarList,
  joinCalendarByInviteCode,
  leaveCalendar,
} from "../../../api/calendar/CalendarAPI";

export default function CalendarAside({
  isVisible,
  calendars,
  setCalendars,
  setSelectedCalendar,
  setCheckedCalendars,
}) {
  const [isModalOpen, setModalOpen] = useState(false); // 추가 모달 상태
  const [isConfigModalOpen, setConfigModalOpen] = useState(false); // 설정 모달 상태
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 설정 대상
  const [checkedCalendars, updateCheckedCalendars] = useState([]);
  const user = useSelector((state) => state.userSlice);
  // 선택된 체크박스 확인
  const handleCheckboxChange = (calendarId) => {
    const isChecked = checkedCalendars.includes(calendarId);
    const updatedCheckedCalendars = isChecked
      ? checkedCalendars.filter((id) => id !== calendarId)
      : [...checkedCalendars, calendarId];
    updateCheckedCalendars(updatedCheckedCalendars);
    setCheckedCalendars(updatedCheckedCalendars); // 부모 컴포넌트에 업데이트
  };
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
    try {
      // 초대 코드로 캘린더 가입 API 호출
      await joinCalendarByInviteCode(inviteCode, user.userid);
      // 최신 캘린더 목록 갱신
      const updatedCalendars = await fetchCalendarList(user.userid);
      setCalendars(updatedCalendars);
    } catch (error) {
      console.error("초대 코드 처리 실패:", error);
      alert("초대 코드로 캘린더 가입에 실패했습니다.");
    }
  };
  //팀 삭제
  const handleDeleteCalendar = async (calendarId) => {
    if (!window.confirm("정말로 팀 달력을 삭제하시겠습니까?")) {
      return;
    }
    try {
      // 캘린더 삭제 API 호출
      await deleteCalendar(calendarId); // deleteCalendar는 API 호출 함수로 가정
      // 삭제 후 최신 캘린더 목록 갱신
      const updatedCalendars = await fetchCalendarList(user.userid);
      setCalendars(updatedCalendars);
      setConfigModalOpen(false);
      alert("팀이 삭제되었습니다.");
    } catch (error) {
      console.error("캘린더 삭제 실패:", error);
      alert("팀 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  //팀 나가기
  const handleLeaveCalendar = async (calendarId) => {
    if (!window.confirm("정말로 팀 달력에서 나가시겠습니까?")) {
      return;
    }
    try {
      // 팀 나가기 API 호출
      await leaveCalendar(calendarId, user.userid); // 인자 전달
      // 나간 후 최신 캘린더 목록 갱신
      const updatedCalendars = await fetchCalendarList(user.userid);
      setCalendars(updatedCalendars);
      setConfigModalOpen(false);
      alert("팀에서 나갔습니다.");
    } catch (error) {
      console.error("팀 나가기 실패:", error);
      alert("팀 나가기에 실패했습니다. 다시 시도해주세요.");
    }
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
  return (
    <div id="sidebar-container" className={isVisible ? "" : "hidden"}>
      <aside className="sidebar">
        <nav className="menu">
          <ul>
            {calendars.map((item) => (
              <li key={item.calendarId}>
                <input
                  type="checkbox"
                  checked={checkedCalendars.includes(item.calendarId)}
                  onChange={() => handleCheckboxChange(item.calendarId)}
                />
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
            <div>
              {/* 제목 수정 필드 */}
              <label>방이름 : </label>
              <input
                type="text"
                defaultValue={selectedItem.name}
                readOnly={selectedItem.user.userId !== user.userid} // 소유자만 수정 가능
                onBlur={(e) =>
                  selectedItem.user.userId === user.userid &&
                  handleTitleUpdate(e.target.value)
                }
              />
              {selectedItem.isTeam && (
                <div className="invite-code-section">
                  <label>초대 코드:</label>
                  <input
                    type="text"
                    value={selectedItem.calendarCode || "코드 없음"}
                    readOnly
                  />
                </div>
              )}
            </div>
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
                    onClick={() =>
                      handleDeleteCalendar(selectedItem.calendarId)
                    }
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
