/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 사용자 헤더 알람 

    추가내역
    -------------
*/
export default function NotificationButton({ isOpen, onToggle }) {
  return (
    <div className="notificationWrapper">
      {/* 알림 버튼 */}
      <div className="headerIcon" onClick={onToggle}>
        <img src="/images/bell.png" alt="Notifications" />
        <span className="notificationDot"></span>
      </div>
      {/* 알림 드롭다운 */}
      {isOpen && (
        <div className="notificationDropdown">
          <div className="notificationButtons">
            <button className="notificationTabButton">전체</button>
            <button className="notificationTabButton">캘린더</button>
            <button className="notificationTabButton">메시지</button>
            <button className="notificationTabButton">초대</button>
          </div>
          <div className="unreadNotifications">
            <h4 className="unreadTitle">읽지 않은 알람</h4>
            <ul className="notificationList">
              <li className="notificationItem">알림 내용 1</li>
              <li className="notificationItem">알림 내용 2</li>
              <li className="notificationItem">알림 내용 3</li>
              <li className="notificationItem">알림 내용 4</li>
              <li className="notificationItem">알림 내용 5</li>
              <li className="notificationItem">알림 내용 6</li>
              <li className="notificationItem">알림 내용 7</li>
              <li className="notificationItem">알림 내용 8</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
