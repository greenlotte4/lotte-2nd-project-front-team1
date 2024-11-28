/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 관리자 문의하기 사이드바

    추가내역
    -------------
    00.00 이름 - 내용
*/
import { Link } from "react-router-dom";

export default function AdminUserAside() {
  return (
    <div id="sidebar-container">
      {/* 사이드바 */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>관리자 메뉴</h2>
        </div>
        <nav className="menu">
          <ul>
            {/* 대분류: 전체 사용자 */}
            <li>
              <Link to="/admin/users/all" className="menu-link">
                전체 사용자
              </Link>
            </li>

            {/* 대분류: 등급별 사용자 */}
            <li>
              <Link to="#" className="menu-link">
                등급별 사용자
              </Link>
              <ul className="submenu">
                <li>
                  <Link to="/admin/users/grade/free" className="submenu-link">
                    Free
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users/grade/premium"
                    className="submenu-link"
                  >
                    Premium
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users/grade/enterprise"
                    className="submenu-link"
                  >
                    Enterprise
                  </Link>
                </li>
              </ul>
            </li>

            {/* 대분류: 상태별 사용자 */}
            <li>
              <Link to="#" className="menu-link">
                상태별 사용자
              </Link>
              <ul className="submenu">
                <li>
                  <Link
                    to="/admin/users/status/active"
                    className="submenu-link"
                  >
                    정상
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users/status/suspended"
                    className="submenu-link"
                  >
                    정지
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users/status/withdrawn"
                    className="submenu-link"
                  >
                    탈퇴
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users/status/dormant"
                    className="submenu-link"
                  >
                    휴먼
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
