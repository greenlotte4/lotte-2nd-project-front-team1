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
import { useState } from "react";

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
  const [alerts, setAlerts] = useState([]); // 알림 상태 관리

  // 알림 수신 시 처리하는 함수
  const handleAlertReceived = (newAlert) => {
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]); // 새로운 알림 추가
  };
  const unreadCount = alerts.filter(
    (alert) => alert.status === "unread"
  ).length; // 읽지 않은 알림 수

  return (
    <div className="notificationWrapper">
      {/* 알림 버튼 */}
      <div className="headerIcon" onClick={onToggle}>
        <StyledBadge badgeContent={unreadCount}>
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
              {alerts
                .filter((alert) => alert.status === "unread")
                .map((alert, index) => (
                  <li className="notificationItem unread">
                    <span className="redDot"></span>
                    {alert.message}
                  </li>
                ))}
            </ul>
          </div>
          {/* 읽은 알림 */}
          <div className="readNotifications">
            <h4 className="unreadTitle">읽은 알람</h4>
            <ul className="notificationList">
              {alerts
                .filter((alert) => alert.status === "read")
                .map((alert, index) => (
                  <li key={index} className="notificationItem">
                    {alert.message}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
