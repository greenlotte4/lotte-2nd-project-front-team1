/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 관리자 문의하기 작성

    추가내역
    -------------
    00.00 이름 - 내용
*/

export default function AdminCs() {
  return (
    <div className="adminuser-content">
      <div>
        <table className="adminusertop">
          <tr>
            <td className="input-group">
              <input type="text" placeholder="이름 입력" />
              <button className="search-button">검색</button>
            </td>
          </tr>
          <tr></tr>
        </table>
      </div>
      {/* <!-- 아래 영역 시작 --> */}
      <div className="adminuser-area">
        {/* <!-- 왼쪽 영역: 파일 리스트 --> */}
        <div className="adminuser-list">
          <table className="adminuser-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>이름</th>
                <th>아이디</th>
                <th>제목</th>
                <th>작성날짜</th>
                <th>카테고리</th>
                <th>응답여부</th>
                <th>응답날짜</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>이도영</td>
                <td>qwer1234</td>
                <td>결제했어요</td>
                <td>2024-11-28</td>
                <td>결제</td>
                <td>미응답</td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>카리나</td>
                <td>karina1234</td>
                <td>로그인이 안됩니다</td>
                <td>2024-11-28</td>
                <td>회원</td>
                <td>응답</td>
                <td>2024-11-29</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
