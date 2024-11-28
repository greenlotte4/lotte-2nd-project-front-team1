/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 마이페이지 문의내역 html 작성

    추가내역
    -------------
    00.00 이름 - 내용
*/
import { Link } from "react-router-dom";

export default function MyPageInquiry() {
  return (
    <div className="file-content">
      {/* <!-- 아래 영역 시작 --> */}
      <div className="file-area">
        {/* <!-- 왼쪽 영역: 파일 리스트 --> */}
        <div className="file-list">
          <h2>문의하기</h2>
          <table className="file-table">
            <thead>
              <tr>
                <th>종류</th>
                <th>제목</th>
                <th>작성날짜</th>
                <th>카테고리</th>
                <th>응답 여부</th>
                <th>응답일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>로그인 질문 드립니다</td>
                <td>2024-11-28</td>
                <td>회원</td>
                <td>미응답</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>데이터가 사라졌어요</td>
                <td>2024-11-28</td>
                <td>기타</td>
                <td>응답</td>
                <td>2024-11-29</td>
              </tr>
            </tbody>
          </table>
          <div className="inquiry-button-area">
            <Link to="/inquiry-form" className="inquiry-button">
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
