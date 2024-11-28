import { useState } from "react";

export default function UserSetting() {
    const [name, setName] = useState("김아무개");
    const [email, setEmail] = useState("123@123.com");
    const [notification, setNotification] = useState(true);
    const [theme, setTheme] = useState("light");


    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleNotification = (e) => setNotification(e.target.checked);
    const handleThene = (e) => setTheme(e.target.value);

    const handleDelete = () => {
        if (window.confirm("정말로 계정을 삭제하시겠습니까?")) {
            alert("계정이 삭제되었습니다.")
        }
    }
    const handleSave = () => {
        alert("변경사항이 저장되었습니다.");
    };
    return (
        <div className="userSetting">
            {/* 개인 정보 섹션 */}
            <div className="section">
                <h4>개인 정보</h4>
                <label>이름</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleName}
                    placeholder="이름을 입력하세요"
                />
                <label>이메일</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="이메일을 입력하세요"
                />
                <button onClick={handleSave}>저장</button>
            </div>

            {/* 알림 설정 섹션 */}
            <div className="section">
                <h4>알림 설정</h4>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={notification}
                        onChange={handleNotification}
                    />
                    알림 받기
                </label>
                <button onClick={handleSave}>저장</button>
            </div>

            {/* 계정 삭제 섹션 */}
            <div className="section">
                <h4>계정 삭제</h4>
                <button onClick={handleDelete}>계정 삭제</button>
            </div>

            {/* 기타 사용자 설정 섹션 */}
            <div className="section">
                <h4>기타 사용자 설정</h4>

                {/* 테마 설정 */}
                <div>
                    <label>테마</label>
                    <select value={theme} onChange={handleThene}>
                        <option value="light">라이트 모드</option>
                        <option value="dark">다크 모드</option>
                    </select>
                </div>

                {/* 추가적으로 다른 설정들 넣을 수 있음 */}
                <button onClick={handleSave}>저장</button>
            </div>
        </div>
    )
}