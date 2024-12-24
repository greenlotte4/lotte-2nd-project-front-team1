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
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCalendarList } from "../../../api/calendar/CalendarAPI";
import { connectStomp, subscribe } from "../../../WebSocket/STOMP";
import { SERVER_HOST } from "../../../api/URI";

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
        console.log("Fetched Calendars:", data); // 캘린더 데이터 확인
        setCalendars(data || []); // 기본값 설정
      } catch (error) {
        console.error("캘린더 데이터 가져오기 실패:", error);
        setCalendars([]); // 에러 시 기본값 설정
      }
    };
  
    fetchData();
  }, [user.userid]);

  // 이벤트 데이터 정리
  useEffect(() => {
    if (calendars.length > 0) {
      const allEvents = calendars.flatMap((calendar) =>
        (calendar.events || []).map((event) => ({
          ...event,
          calendarId: calendar.calendarId,
        }))
      );
      setEvents(allEvents); // 모든 이벤트를 저장
    }
  }, [calendars]);
  const subscriptionRef = useRef(null);
  useEffect(() => {
    if (!checkedCalendars || checkedCalendars.length === 0) return;
    const subscriptions = [];

    connectStomp(
      SERVER_HOST + "/socket",
      () => {
        checkedCalendars.forEach((calendarId) => {
          const subscription = subscribe(
            `/sub/calendar/${calendarId}`,
            (message) => {
              console.log("실시간 메시지 수신:", message);

              const newEvents = message;

              // newEvents가 배열일 수도 있고, 단일 객체일 수도 있으므로 상황에 맞게 처리
              // 서버에서 이벤트 리스트 전체를 보내는 경우:
              setEvents((prevEvents) => {
                // prevEvents에 중복된 이벤트가 있는지 확인하고, 중복 처리 로직 필요할 수 있음
                // 일단 단순히 덮어쓰거나 concat하는 예:
                const updatedCalendarId =
                  newEvents.length > 0 ? newEvents[0].calendarId : null;
                const filteredEvents = prevEvents.filter(
                  (event) => event.calendarId !== updatedCalendarId
                );
                return [
                  ...filteredEvents,
                  ...newEvents.map((event) => ({
                    ...event,
                    calendarId: Number(event.calendarId),
                  })),
                ];
              });
            }
          );

          subscriptions.push(subscription);
        });

        subscriptionRef.current = subscriptions;
      },
      (error) => {
        console.error("WebSocket 연결 실패:", error);
      }
    );

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.forEach((sub) => sub.unsubscribe());
        subscriptionRef.current = null;
      }
    };
  }, [events, checkedCalendars, calendars]); // checkedCalendars에 따라 재구독

  // events 또는 checkedCalendars 변경 시 filteredEvents 업데이트
  useEffect(() => {
    const filtered = (events || []).filter((event) =>
      (checkedCalendars || []).includes(event.calendarId)
    );
    setFilteredEvents(filtered);
    console.log("allEvents :", filtered);
  }, [events, checkedCalendars]);

  // 캘린더 데이터 다시 로드
  const refetchData = async () => {
    try {
      const data = await fetchCalendarList(user.userid);
      setCalendars(data);
    } catch (error) {
      console.error("캘린더 데이터 다시 로드 실패:", error);
    }
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
