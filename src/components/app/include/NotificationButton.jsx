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
          {/* 읽지 않은 알림 */}
          <div className="unreadNotifications">
            <h4 className="unreadTitle">읽지 않은 알람</h4>
            <ul className="notificationList">
              <li className="notificationItem unread">
                <span className="redDot"></span>알림 내용 1
              </li>
              <li className="notificationItem unread">
                <span className="redDot"></span>알림 내용 2
              </li>
              <li className="notificationItem unread">
                <span className="redDot"></span>알림 내용 3
              </li>
              <li className="notificationItem unread">
                <span className="redDot"></span>알림 내용 3
              </li>
              <li className="notificationItem unread">
                <span className="redDot"></span>알림 내용 3
              </li>
              <li className="notificationItem unread">
                <span className="redDot"></span>알림 내용 3
              </li>
            </ul>
          </div>
          {/* 읽은 알림 */}
          <div className="readNotifications">
            <h4 className="unreadTitle">읽은 알람</h4>
            <ul className="notificationList">
              <li className="notificationItem">읽은 알림 내용 1</li>
              <li className="notificationItem">읽은 알림 내용 2</li>
              <li className="notificationItem">읽은 알림 내용 3</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
