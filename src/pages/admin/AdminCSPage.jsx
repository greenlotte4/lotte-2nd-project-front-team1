/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 관리자 문의하기

    추가내역
    -------------
    00.00 이름 - 내용
*/
import AdminLayout from "../../layouts/admin/AdminLayout";
import { useSidebar } from "../../hooks/app/UseSidebar"; // 커스텀 훅 사용
import AdminCSAside from "../../components/admin/AdminCSAside";
import AdminCS from "../../components/admin/AdminCS";
export default function AdminCSPage() {
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용

  return (
    <AdminLayout onToggleSidebar={toggleSidebar}>
      {isSidebarVisible && <AdminCSAside />}
      <div
        className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
      >
        <AdminCS />
      </div>
    </AdminLayout>
  );
}
