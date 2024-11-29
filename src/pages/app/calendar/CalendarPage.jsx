/*
   날짜 : 2024/11/25
   이름 : 이도영
   내용 : 달력 페이지

   추가내역
   -------------
 */
import AppLayout from "../../../layouts/app/AppLayout";
import "../../../styles/app/calendar/Calendar.scss";
import "../../../styles/app/AppAside.scss";
import CalendarAside from "../../../components/app/calendar/CalendarAside";
import Calendar from "../../../components/app/calendar/Calendar";
import { useSidebar } from "../../../hooks/app/UseSidebar";

export default function CalendarPage() {
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용

  return (
    <AppLayout onToggleSidebar={toggleSidebar}>
      <CalendarAside isVisible={isSidebarVisible} />
      <div
        className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
      >
        <Calendar />
      </div>
    </AppLayout>
  );
}
