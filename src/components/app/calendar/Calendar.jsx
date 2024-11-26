/*
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 프로젝트 html 작성

    추가내역
    -------------
    00.00 이름 - 내용
*/
import React from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendar React component
import dayGridPlugin from "@fullcalendar/daygrid"; // 플러그인

export default function Calendar() {
  return (
    <div className="calendar-page">
      <FullCalendar
        plugins={[dayGridPlugin]} // 필요한 플러그인 추가
        initialView="dayGridMonth" // 초기 화면 설정
        events={[
          // 이벤트 추가
          { title: "Event 1", date: "2024-11-26" },
          { title: "Event 2", date: "2024-11-27" },
        ]}
      />
    </div>
  );
}

  
