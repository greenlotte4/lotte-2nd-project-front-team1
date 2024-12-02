import { useState } from "react";

export default function ProjectSetting() {
  const [projectNotifications, setProjectNotifications] = useState(() => {
    const saved = localStorage.getItem("projectNotifications");
    return saved
      ? JSON.parse(saved)
      : [{ id: 1, label: "프로젝트", checked: true }];
  });
  const handleNotificationChange = (id) => {
    setProjectNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, checked: !notification.checked }
          : notification
      )
    );
    console.log("Checked state updated");
  };
  return (
    <div className="projectSetting">
      <div className="switchSection">
        <h5>프로젝트 알림</h5>
        {projectNotifications.map((notification) => (
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
    </div>
  );
}
