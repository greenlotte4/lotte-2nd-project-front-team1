import { useState } from "react";

export default function CalendarSetting() {
  const [view, setView] = useState("dayGridMonth");
  const [locale, setLocale] = useState("ko");
  const [eventColor, setEventColor] = useState("#ff0000");
  const [editable, setEditable] = useState(true);

  const [calenderNotifications, setCalenderNotifications] = useState(() => {
    const saved = localStorage.getItem("calenderNotifications");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, label: "캘린더 알림", checked: true },
          { id: 2, label: "일정 알림", checked: true },
        ];
  });

  const handleNotificationChange = (id) => {
    setCalenderNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, checked: !notification.checked }
          : notification
      )
    );
    console.log("Checked state updated");
  };

  const handleViewChange = (e) => {
    setView(e.target.value);
  };

  const handleLocaleChange = (e) => {
    setLocale(e.target.value);
  };

  const handleEventColorChange = (e) => {
    setEventColor(e.target.value);
  };

  const handleEditableChange = (e) => {
    setEditable(e.target.checked);
  };
  return (
    <div className="calendarSetting">
      <div className="switchSection">
        <h5>캘린더 알림</h5>
        {calenderNotifications.map((notification) => (
          <div key={notification.id} className="switch">
            <label className="switchLabel">
              <span className="notiName">{notification.label}</span>
              <input
                type="checkbox"
                checked={notification.checked}
                onChange={() => handleNotificationChange(notification.id)}
              />
              <span className="sliderBox round"></span>
            </label>
          </div>
        ))}
      </div>
      {/* 뷰 설정 카드 */}
      <div className="setting-card">
        <h4>기본 뷰</h4>
        <select value={view} onChange={handleViewChange}>
          <option value="dayGridMonth">월</option>
          <option value="timeGridWeek">주</option>
          <option value="timeGridDay">일</option>
        </select>
        <button>적용</button>
      </div>

      {/* 언어 설정 카드 */}
      <div className="setting-card">
        <h4>언어 설정</h4>
        <select value={locale} onChange={handleLocaleChange}>
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>
        <button>적용</button>
      </div>

      {/* 이벤트 색상 카드 */}
      <div className="setting-card">
        <h4>이벤트 색상</h4>
        <input
          type="color"
          value={eventColor}
          onChange={handleEventColorChange}
        />
        <button>적용</button>
      </div>

      {/* 편집 가능 여부 카드 */}
      <div className="setting-card">
        <h4>편집 가능 여부</h4>
        <input
          type="checkbox"
          checked={editable}
          onChange={handleEditableChange}
        />
      </div>
    </div>
  );
}
