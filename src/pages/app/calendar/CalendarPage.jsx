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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCalendarList } from "../../../api/calendar/CalendarAPI";

export default function CalendarPage() {
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용
  const [calendars, setCalendars] = useState([]); // 캘린더와 이벤트 데이터
  const [selectedCalendar, setSelectedCalendar] = useState(null); // 선택된 캘린더
  const user = useSelector((state) => state.userSlice);

  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCalendarList(user.userid);
        setCalendars(data);
        console.log(data);
      } catch (error) {
        console.error("캘린더 목록 가져오기 실패:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <AppLayout onToggleSidebar={toggleSidebar} thisPage="calendar">
      {/* 캘린더 리스트를 Aside와 Calendar 컴포넌트로 전달 */}
      <CalendarAside
        isVisible={true}
        calendars={calendars} // 최신 데이터 전달
        setCalendars={setCalendars} // 상태 업데이트 함수 전달
        setSelectedCalendar={setSelectedCalendar}
      />
      ;
      <div
        className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
      >
        <Calendar selectedCalendar={selectedCalendar} />
      </div>
    </AppLayout>
  );
}
