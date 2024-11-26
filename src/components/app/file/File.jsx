export default function File() {
    return(
        <div className="file-content">
            <div>
              <table className="filetop">
                <tr>
                  <td><h2>경로 이름</h2></td>
                  <td className="input-group">
                    <input type="text" placeholder="이름 입력" />
                    <button className="search-button">검색</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button value="새로만들기" name="새로만들기">
                      새로만들기
                    </button>
                  </td>
                  <td><button value="=" name="=">=</button></td>
                </tr>
              </table>
            </div>
            {/* <!-- 아래 영역 시작 --> */}
            <div className="file-area">
              {/* <!-- 왼쪽 영역: 파일 리스트 --> */}
              <div className="file-list">
                <table className="file-table">
                  <thead>
                    <tr>
                      <th>종류</th>
                      <th>이름</th>
                      <th>크기</th>
                      <th>수정한 날짜</th>
                      <th>생성 날짜</th>
                      <th>작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>📄</td>
                      <td>파일1</td>
                      <td>2MB</td>
                      <td>2024-11-21</td>
                      <td>2024-11-20</td>
                      <td className="action-cell">
                        <button className="action-button">...</button>
                      </td>
                    </tr>
                    <tr>
                      <td>📁</td>
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
                <div className="trash-container">
                  <button className="trash-button" title="휴지통">🗑️</button>
                </div>
              </div>

              {/* <!-- 오른쪽 영역: 상세 정보 --> */}
              <div className="file-details">
                <h3>상세 정보</h3>
                <div className="detail-content">
                  <p>선택한 항목의 상세 정보를 보여줍니다.</p>
                  <img
                    src="https://via.placeholder.com/150"
                    alt="상세 이미지"
                  />
                  <p>크기: 2MB</p>
                  <p>경로: /경로/파일1</p>
                </div>
              </div>
            </div>
        </div>
    );
}