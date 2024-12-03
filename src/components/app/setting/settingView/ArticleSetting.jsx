import { useState } from "react";

export default function ArticleSetting() {
  const [articleNotifications, setArticleNotifications] = useState(() => {
    const saved = localStorage.getItem("articleNotifications");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, label: "게시판 알림", checked: true },
          { id: 2, label: "댓글 알림", checked: true },
        ];
  });
  const handleNotificationChange = (id) => {
    setArticleNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, checked: !notification.checked }
          : notification
      )
    );
    console.log("Checked state updated");
  };
  return (
    <div className="articleSetting">
      <div className="switchSection">
        <h5>게시판 알림</h5>
        {articleNotifications.map((notification) => (
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
