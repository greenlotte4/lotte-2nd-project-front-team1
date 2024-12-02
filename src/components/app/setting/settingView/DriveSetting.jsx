import { useState } from "react";

export default function DriveSetting() {
  const [driveNotifications, setDriveNotifications] = useState(() => {
    const saved = localStorage.getItem("driveNotifications");
    return saved
      ? JSON.parse(saved)
      : [{ id: 2, label: "경고 알림", checked: true }];
  });
  const handleNotificationChange = (id) => {
    setDriveNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, checked: !notification.checked }
          : notification
      )
    );
    console.log("Checked state updated");
  };

  return (
    <div className="driveSetting">
      <div className="switchSection">
        <h5>사용량 경고 알림</h5>

        {driveNotifications.map((notification) => (
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
            <span>60% 이상시 경고 알림</span>
          </div>
        ))}
      </div>
    </div>
  );
}
