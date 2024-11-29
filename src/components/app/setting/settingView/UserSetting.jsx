import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSetting() {

    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem("notifications");
        return saved ? JSON.parse(saved) : [
            { id: 1, label: "전체 알림", checked: true },
            { id: 2, label: "메시지 알림", checked: true },
            { id: 3, label: "댓글 알림", checked: true },
            { id: 4, label: "게시판 알림", checked: true },
            { id: 5, label: "캘린더 알림", checked: true },
        ];
    });

    useEffect(() => {
        console.log("Saving notifications to localStorage", notifications);  // 디버깅용 로그
        localStorage.setItem("notifications", JSON.stringify(notifications));
    }, [notifications])

    const handleNotificationChange = (id) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === id
                    ? { ...notification, checked: !notification.checked }
                    : notification
            )
        );
        console.log('Checked state updated');
    };
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : "light";
    });

    const handleSave = () => {
        localStorage.setItem("theme", theme);

        // 테마 클래스를 <body>에 적용하여 실제 화면에 반영
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
        } else {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode");
        }

        alert("변경사항이 저장되었습니다.");
    };

    const goHandle = () => {
        navigate("/user/myPage")
    }
    return (
        <div className="userSetting">
            {/* 알림 설정 섹션 */}
            <div className="switchSection">
                <h4>알림 설정</h4>
                {notifications.map((notification) => (
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

            {/* 계정 삭제 섹션 */}
            <div className="userSection">
                <h4>프로필 편집</h4>
                <button onClick={goHandle} className="myPage">프로필 편집 이동</button>
            </div>

            {/* 기타 사용자 설정 섹션 */}
            <div className="temaSection">
                <h4>기타 사용자 설정</h4>

                {/* 테마 설정 */}
                <div>
                    <label className="tema">테마</label>
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="light">라이트 모드</option>
                        <option value="dark">다크 모드</option>
                    </select>
                </div>

                {/* 추가적으로 다른 설정들 넣을 수 있음 */}
                <button onClick={handleSave} className="svaeBtn">저장</button>
            </div>
        </div>
    )
}