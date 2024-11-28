/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 관리자 회원관리 

    추가내역
    -------------
    00.00 이름 - 내용
*/
import { Link } from "react-router-dom";

export default function AdminUser() {
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
                <th>등급</th>
                <th>가입날짜</th>
                <th>최근 로그인</th>
                <th>상태</th>
                <th>더보기</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>이도영</td>
                <td>qwer1234</td>
                <td>
                  <select name="grade" defaultValue="free">
                    <option value="free">free</option>
                    <option value="premium">premium</option>
                    <option value="enterprise">enterprise</option>
                  </select>
                </td>
                <td>2024-11-27</td>
                <td>2024-11-28</td>
                <td>
                  <select name="status" defaultValue="정상">
                    <option value="정상">정상</option>
                    <option value="정지">정지</option>
                    <option value="탈퇴">탈퇴</option>
                    <option value="휴먼">휴먼</option>
                  </select>
                </td>
                <td>
                  <Link
                    to={`/user-details/qwer1234`}
                    className="details-button"
                  >
                    자세히
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>카리나</td>
                <td>karina1234</td>
                <td>
                  <select name="grade" defaultValue="enterprise">
                    <option value="free">free</option>
                    <option value="premium">premium</option>
                    <option value="enterprise">enterprise</option>
                  </select>
                </td>
                <td>2024-12-27</td>
                <td>2024-12-28</td>
                <td>
                  <select name="status" defaultValue="정지">
                    <option value="정상">정상</option>
                    <option value="정지">정지</option>
                    <option value="탈퇴">탈퇴</option>
                    <option value="휴먼">휴먼</option>
                  </select>
                </td>
                <td>
                  <Link
                    to={`/user-details/karina1234`}
                    className="details-button"
                  >
                    자세히
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="inquiry-button-area">삭제</div>
        </div>
      </div>
    </div>
  );
}
