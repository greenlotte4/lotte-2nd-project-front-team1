export default function ProjectSettingPage() {
    return (
        <div className="setting-page">
            <h1>설정</h1>
            <div className="setting-section">
                <h3>프로젝트</h3>
                <input
                    type="text"
                    placeholder="프로젝트 이름 입력"
                    className="input-box"
                />
                <button className="action-btn edit-btn">수정하기</button>
            </div>

            <div className="setting-section">
                <h3>사용자</h3>
                <ul className="user-list">
                    <li className="user-item">
                        <span className="user-name">사용자 1</span>
                        <select className="role-select">
                            <option value="read-only">보기전용</option>
                            <option value="view-use">보기,수정가능</option>
                        </select>
                    </li>
                </ul>
            </div>
        </div>
    );
}