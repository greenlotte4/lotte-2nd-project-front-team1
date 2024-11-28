/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 관리자페이지

    추가내역
    -------------
    00.00 이름 - 내용
*/
import AdminUser from "../../components/admin/AdminUser";
import AdminUserAside from "../../components/admin/AdminUserAside";
import AdminLayout from "../../layouts/admin/AdminLayout";
import { useSidebar } from "../../hooks/app/UseSidebar"; // 커스텀 훅 사용

export default function AdminUserPage() {
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용

  return (
    <AdminLayout onToggleSidebar={toggleSidebar}>
      {isSidebarVisible && <AdminUserAside />}
      <div
        className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
      >
        <AdminUser />
      </div>
    </AdminLayout>
  );
}
