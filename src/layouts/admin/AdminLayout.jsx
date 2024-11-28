/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 관리자

    추가내역
    -------------
    00.00 이름 - 내용
*/
import React from "react";
import AppHeader from "../../components/app/include/AppHeader";
import "../../styles/app/AppCommon.scss";
import "../../styles/admin/AdminHeader.scss";
import AdminHeader from "../../components/admin/include/AdminHeader";
// eslint-disable-next-line react/prop-types
export default function AdminLayout({ children, onToggleSidebar }) {
  return (
    <div id="container" className="Appcontainer">
      {/* AppHeader에 사이드바 토글 함수를 prop으로 전달 */}
      <AdminHeader onToggleSidebar={onToggleSidebar} />
      <div className="content-container">{children}</div>
    </div>
  );
}
