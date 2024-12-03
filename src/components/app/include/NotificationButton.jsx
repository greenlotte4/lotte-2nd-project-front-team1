/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 사용자 헤더 알람 

    추가내역
    -------------
*/

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 5,
    padding: "0 4px",
    backgroundColor: "#D8232A",
    color: "white",
  },
}));

export default function NotificationButton({ isOpen, onToggle }) {
  return (
    <div className="notificationWrapper">
      {/* 알림 버튼 */}
      <div className="headerIcon" onClick={onToggle}>
        <StyledBadge badgeContent={4}>
          <NotificationsNoneOutlinedIcon className="header_icons" />
        </StyledBadge>
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
