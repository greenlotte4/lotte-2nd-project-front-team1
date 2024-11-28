/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 관리자 문의하기 사이드바

    추가내역
    -------------
    00.00 이름 - 내용
*/
import { Link } from "react-router-dom";

export default function AdminCSAside() {
  return (
    <div id="sidebar-container">
      {/* 사이드바 */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>관리자 메뉴</h2>
        </div>
        <nav className="menu">
          <ul>
            {/* 전체 문의내용 */}
            <li>
              <Link to="/admin/cs/all" className="menu-link">
                전체 문의내용
              </Link>
            </li>

            {/* 카테고리별 문의내용 */}
            <li>
              <Link to="#" className="menu-link">
                카테고리별 문의내용
              </Link>
              <ul className="submenu">
                <li>
                  <Link to="/admin/cs/category/member" className="submenu-link">
                    회원
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/cs/category/payment"
                    className="submenu-link"
                  >
                    결제
                  </Link>
                </li>
              </ul>
            </li>

            {/* 미응답 내용 */}
            <li>
              <Link to="/admin/cs/unanswered" className="menu-link">
                미응답 내용
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
