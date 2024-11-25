import ProjectHeader from "./ProjectHeader";
import ProjectSidebar from "./ProjectSidebar";

{/* 
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 프로젝트 html 작성

    추가내역
    -------------
    00.00 이름 - 내용
*/}
{/* <html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>노션 스타일 페이지</title>
    <link rel="stylesheet" href="/CSS/app/common.css" />
    <link rel="stylesheet" href="/CSS/app/project.css" />
  </head>
  아래 2개 스크립트 사용해야함
  <script src="/javascript/app/project/project.js"></script>
  <script src="/javascript/include/aside.js"></script>
  */}
export default function Project(){
  return(
<div id="container">
      <div className="content-container">
        <ProjectSidebar/>
        {/*  메인 콘텐츠  */}
        <main className="main-content">
          <div className="main-page">
            <div className="table-actions">
              <button className="action-btn current-page">기본 화면</button>
              <button className="action-btn other-page">타임라인</button>
              <button className="action-btn settings-page">설정</button>
            </div>
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

           {/* 다른 화면 보기  */}
          <div id="timeline-page" className="page">
            <div className="table-actions">
              <button className="action-btn current-page">기본 화면</button>
              <button className="action-btn other-page">타임라인</button>
              <button className="action-btn settings-page">설정</button>
            </div>
            <div className="timeline-content">
              <h2>Timeline</h2>
              <p>여기에 타임라인 내용을 추가하세요.</p>
            </div>
          </div>

           {/* 설정 페이지  */}
          <div id="setting-page" className="page">
            <div className="table-actions">
              <button className="action-btn current-page">기본 화면</button>
              <button className="action-btn other-page">타임라인</button>
              <button className="action-btn settings-page">설정</button>
            </div>
            <div className="setting-content">
              <h2>설정</h2>

               {/* 프로젝트 섹션  */}
              <div className="setting-section">
                <h3>프로젝트</h3>
                <input
                  type="text"
                  placeholder="프로젝트 이름 입력"
                  className="input-box"
                />
                <button className="action-btn edit-btn">수정하기</button>
              </div>

               {/* 사용자 섹션  */}
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
                  <li className="user-item">
                    <span className="user-name">사용자 2</span>
                    <select className="role-select">
                      <option value="read-only">보기전용</option>
                      <option value="view-use">보기,수정가능</option>
                    </select>
                  </li>
                  {/*  더 많은 사용자 추가 가능  */}
                </ul>
              </div>

              {/*  초대하기 섹션  */}
              <div className="setting-section">
                <h3>초대하기</h3>
                <input
                  type="email"
                  placeholder="이메일 입력"
                  className="input-box"
                />
                <button className="action-btn invite-btn">초대하기</button>
              </div>
            </div>
          </div>
          <button className="floating-action-btn">
            <span className="add-icon">-</span>
          </button>
        </main>
      </div>
    </div>
  );
}

