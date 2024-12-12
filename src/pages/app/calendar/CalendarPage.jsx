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
  const [checkedCalendars, setCheckedCalendars] = useState([]); // 선택된 캘린더 ID
  const [events, setEvents] = useState([]); // 전체 이벤트 데이터
  const [filteredEvents, setFilteredEvents] = useState([]); // 필터링된 이벤트 데이터
  const user = useSelector((state) => state.userSlice);

  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCalendarList(user.userid);
        setCalendars(data);
        console.log("data : ", data);
      } catch (error) {
        console.error("캘린더 목록 가져오기 실패:", error);
      }
    };

    fetchData();
  }, [user.userid]);
  useEffect(() => {
    if (calendars.length > 0) {
      // 모든 캘린더의 이벤트를 합침
      const allEvents = calendars.flatMap((calendar) =>
        calendar.events.map((event) => ({
          ...event,
          calendarId: calendar.calendarId, // 각 이벤트에 캘린더 ID 추가
        }))
      );
      setEvents(allEvents); // 모든 이벤트를 저장
    }
  }, [calendars]);

  useEffect(() => {
    if (checkedCalendars.length === 0 || !events.length) {
      setFilteredEvents([]);
    } else {
      const filtered = events.filter((event) =>
        checkedCalendars.includes(event.calendarId)
      );

      setFilteredEvents(filtered);
    }
  }, [checkedCalendars, events]);
  const refetchData = async () => {
    const data = await fetchCalendarList(user.userid);
    setCalendars(data);
  };

  return (
    <AppLayout onToggleSidebar={toggleSidebar} thisPage="calendar">
      {/* 캘린더 리스트를 Aside와 Calendar 컴포넌트로 전달 */}
      <CalendarAside
        isVisible={true}
        calendars={calendars} // 최신 데이터 전달
        setCalendars={setCalendars} // 상태 업데이트 함수 전달
        setSelectedCalendar={setSelectedCalendar}
        setCheckedCalendars={setCheckedCalendars}
      />
      ;
      <div
        className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
      >
        <Calendar
          events={filteredEvents}
          checkedCalendars={checkedCalendars} // 반드시 전달
          calendars={calendars}
          onRefetch={refetchData}
        />
      </div>
    </AppLayout>
  );
}
