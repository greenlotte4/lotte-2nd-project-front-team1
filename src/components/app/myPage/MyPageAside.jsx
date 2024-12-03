/*
   날짜 : 2024/11/28
   이름 : 이도영
   내용 : 마이페이지 사이드바 구현

   추가내역
   -------------
   
 */
import { Link } from "react-router-dom";

export default function MyPageAside() {
  return (
    <div id="sidebar-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>닉네임</h2>
        </div>
        <nav className="menu">
          <ul className="submenu">
            <li>
              <Link to="/user/myPage">나의정보</Link>
            </li>
            <li>
              <Link to="/user/mypage/membership">구매하기</Link>
            </li>
            <li>
              <Link to="/user/mypage/inquiry">문의내역</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
