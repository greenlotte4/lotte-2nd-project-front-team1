export default function ProjectMainPage() {
    return (
        <div className="projectmainpage-page">
            
            <table className="task-table">
              <tr>
                <th>해야 할 일</th>
              </tr>
              <tr>
                <td colSpan="3" className="task-cell">
                  <div className="task-group">
                    <p>
                      작업 내용
                      <span className="profile-image">
                        <img
                          src="https://via.placeholder.com/30"
                          alt="프로필 이미지"
                        />
                      </span>
                    </p>
                    <p>그룹</p>
                  </div>
                  <div className="task-group">
                    <p>
                      작업 내용
                      <span className="profile-image">
                        <img
                          src="https://via.placeholder.com/30"
                          alt="프로필 이미지"
                        />
                      </span>
                    </p>
                    <p>그룹</p>
                  </div>
                  <button className="action-button">
                    <span className="add-icon">+</span>
                  </button>
                </td>
              </tr>
            </table>
            <table className="task-table">
              <tr>
                <th>작업중</th>
              </tr>
              <tr>
                <td colSpan="3" className="task-cell">
                  <div className="task-group">
                    <p>
                      작업 내용
                      <span className="profile-image">
                        <img
                          src="https://via.placeholder.com/30"
                          alt="프로필 이미지"
                        />
                      </span>
                    </p>
                    <p>그룹</p>
                  </div>
                  <div className="task-group">
                    <p>
                      작업 내용
                      <span className="profile-image">
                        <img
                          src="https://via.placeholder.com/30"
                          alt="프로필 이미지"
                        />
                      </span>
                    </p>
                    <p>그룹</p>
                  </div>
                  <button className="action-button">
                    <span className="add-icon">+</span>
                  </button>
                </td>
              </tr>
            </table>
            <button className="action-button">
              <span className="add-icon">+</span>
            </button>
        </div>
    );
}