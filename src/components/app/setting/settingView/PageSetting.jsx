export default function PageSetting() {
    return (
        <div className="PageSetting">
            {/* 배경 설정 */}
            <div className="background-settings">
                <h4>배경 설정</h4>
                <div className="background-options">
                    <table className="background-image-table">
                        <thead>
                            <tr>
                                <th>배경 이미지</th>
                                <th>선택</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>이미지 1</td>
                                <td><input type="radio" name="background" value="image1" /></td>
                            </tr>
                            <tr>
                                <td>이미지 2</td>
                                <td><input type="radio" name="background" value="image2" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="color-selector">
                        <label>배경 색상:</label>
                        <input type="color" name="backgroundColor" />
                    </div>
                </div>
            </div>

            {/* 편집 권한 설정 */}
            <div className="permission-settings">
                <h4>편집 권한 설정</h4>
                <table className="permissions-table">
                    <thead>
                        <tr>
                            <th>사용자</th>
                            <th>권한 설정</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>사용자 1</td>
                            <td>
                                <select>
                                    <option value="edit">편집</option>
                                    <option value="view">보기</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>사용자 2</td>
                            <td>
                                <select>
                                    <option value="edit">편집</option>
                                    <option value="view">보기</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* 페이지 숨기기/공개 설정 */}
            <div className="visibility-settings">
                <h4>페이지 숨기기/공개 설정</h4>
                <table className="visibility-table">
                    <thead>
                        <tr>
                            <th>페이지</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>페이지 1</td>
                            <td><input type="checkbox" name="visibility1" checked /></td>
                        </tr>
                        <tr>
                            <td>페이지 2</td>
                            <td><input type="checkbox" name="visibility2" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
