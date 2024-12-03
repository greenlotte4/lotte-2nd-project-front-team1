import React, { useState } from "react";
import PropTypes from "prop-types";

export default function AddCalendarModal({
  isOpen,
  onClose,
  onAddCalendar,
  onJoinByInviteCode,
}) {
  const [title, setTitle] = useState("");
  const [isGroup, setIsGroup] = useState(false); // 그룹 여부 상태
  const [inviteCode, setInviteCode] = useState(""); // 초대 코드 상태

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    // 새로운 캘린더 추가
    onAddCalendar({ title, isGroup });
    setTitle(""); // 입력 초기화
    setIsGroup(false); // 상태 초기화
    onClose(); // 모달 닫기
  };

  const handleJoinByInviteCode = () => {
    if (!inviteCode.trim()) {
      alert("초대 코드를 입력해주세요.");
      return;
    }

    // 초대 코드로 가입 처리
    onJoinByInviteCode(inviteCode.trim());
    setInviteCode(""); // 입력 초기화
    onClose(); // 모달 닫기
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <header className="modal-header">
            <h2>캘린더 추가</h2>
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
          </header>
          <main className="modal-body">
            <div className="addschedule">
              <label>제목:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>
                그룹으로 설정
                <input
                  type="checkbox"
                  checked={isGroup}
                  onChange={(e) => setIsGroup(e.target.checked)}
                  placeholder="그룹으로 설정"
                />
              </label>
              {isGroup && (
                <p className="group-info">
                  그룹으로 설정된 캘린더는 인증 코드가 생성됩니다.
                </p>
              )}
              <button onClick={handleSubmit} className="add-calendar-btn">
                캘린더 추가
              </button>

              <h3>초대 코드로 캘린더 가입</h3>
              <label>초대 코드:</label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />

              <button onClick={handleJoinByInviteCode} className="join-btn">
                초대 코드로 가입
              </button>
            </div>
          </main>
          <footer className="modal-footer">
            <button className="modal-footer-btn cancel-btn" onClick={onClose}>
              닫기
            </button>
          </footer>
        </div>
      </div>
    )
  );
}

AddCalendarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddCalendar: PropTypes.func.isRequired,
  onJoinByInviteCode: PropTypes.func.isRequired,
};
