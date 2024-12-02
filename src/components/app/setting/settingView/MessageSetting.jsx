import React, { useState } from 'react';

export default function MessageSetting() {
    const [notificationMethod, setNotificationMethod] = useState('');
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [isMessageSaved, setIsMessageSaved] = useState(false);
    const [messageNotifications, setMessageNotifications] = useState(() => {
        const saved = localStorage.getItem("messageNotifications");
        return saved ? JSON.parse(saved) : [
            { id: 1, label: "메시지 알림", checked: true },
            { id: 2, label: "멘션 알림", checked: true },
        ];
    });
    const handleNotificationChange = (id) => {
        setMessageNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === id
                    ? { ...notification, checked: !notification.checked }
                    : notification
            )
        );
        console.log('Checked state updated');
    };

    const handleSoundChange = () => setIsSoundEnabled(!isSoundEnabled);
    const handleMessageSaveChange = () => setIsMessageSaved(!isMessageSaved);

    return (
        <div className="messageSetting">
            <h3>메시지 설정</h3>
            <div className="switchSection">
                <h4>메시지 알림</h4>
                {messageNotifications.map((notification) => (
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
