/*
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 프로젝트 html 작성

    추가내역
    -------------
    12.02 박수정 - 드라이브 레이아웃 수정
*/
export default function File() {
  return (
    <div className="file-content">
      {/* 상단 정보 영역 */}
      <div className="storage-info">
        <h2>
          <span className="total-usage">2MB </span>
          <span className="current-usage">/ 1GB 사용 중</span>
        </h2>
        <div className="storage-bar">
          <div className="drive-usage"></div>
          <div className="chat-usage"></div>
        </div>
        <div className="usage-legend">
          <span className="legend-item">
            <span className="drive-dot"></span> File
          </span>
          <span className="legend-item">
            <span className="chat-dot"></span> Chat
          </span>
        </div>
      </div>

      <div>
        <table className="filetop">
          <tr>
            <td>
              <h2>경로 이름</h2>
            </td>
          </tr>
          <tr>
            <td>
              <button value="새로만들기" name="새로만들기">
                새폴더
              </button>
              <button value="upload" name="file-upload">
                업로드
              </button>
              <button value="download" name="file-download">
                다운로드
              </button>
              <button value="rename" name="file-rename">
                이름변경
              </button>
              <button value="delete" name="file-delete">
                삭제
              </button>
            </td>
            <td className="input-group">
              <input type="text" placeholder="드라이브에서 검색" />
              <button className="search-button">검색</button>
            </td>
          </tr>
        </table>
      </div>
      {/* 파일 영역 */}
      {/* <!-- 아래 영역 시작 --> */}
      <div className="file-area">
        {/* <!-- 왼쪽 영역: 파일 리스트 --> */}
        <div className="file-list">
          <table className="file-table">
            <thead>
              <tr>
                <th></th>
                <th>이름</th>
                <th>크기</th>
                <th>수정한 날짜</th>
                <th>생성 날짜</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>파일1</td>
                <td>2MB</td>
                <td>2024-11-21</td>
                <td>2024-11-20</td>
                <td className="action-cell">
                  <button className="action-button">...</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>폴더1</td>
                <td>-</td>
                <td>2024-11-20</td>
                <td>2024-11-19</td>
                <td className="action-cell">
                  <button className="action-button">...</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
